import os
import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
import kagglehub
import csv

# load .env info
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("Database URL not set in .env")


# get the dataset
def get_dataset_path():
    # fra_cleaned.csv is the proper .csv file
    path = kagglehub.dataset_download("olgagmiufana1/fragrantica-com-fragrance-dataset")
    return path

# Helper function called to establish connection to DB
def get_connection():
    # returns a connection object (conn) that can be called to run queries
    return psycopg2.connect(DATABASE_URL)

# Helper to auto-generate next id number
def fix_id_sequence(conn):
    """Sync the id sequence with the current max(id) in fragrances."""
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT setval(
              pg_get_serial_sequence('fragrances', 'id'),
              COALESCE((SELECT MAX(id) FROM fragrances), 1),
              true
            );
            """
        )

def insert_fragrance(conn, name, url, top_notes=None, middle_notes=None, base_notes=None):
    # inserts a single fragrance into the DB
    with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
        cur.execute(
            """
            INSERT INTO fragrances(name, url, "topNotes", "middleNotes", "baseNotes")
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (url) DO UPDATE
            SET name = EXCLUDED.name,
                "topNotes" = EXCLUDED."topNotes",
                "middleNotes" = EXCLUDED."middleNotes",
                "baseNotes" = EXCLUDED."baseNotes";
            """,
            (name, url, top_notes, middle_notes, base_notes),
        )

def main():
    # get connection to DB
    conn = get_connection()
    try:   
        fix_id_sequence(conn)

        # get path to dataset csv
        dataset_path = get_dataset_path()

        # build path to csv file
        csv_path = os.path.join(dataset_path, "fra_cleaned.csv")

        # open csv and read one row
        with open(csv_path, newline="", encoding="cp1252") as f:
            reader = csv.DictReader(f, delimiter=";")
            count = 0
            for row in reader:
                name = row["Perfume"]
                url = row["url"]
                top_notes = row.get("Top")
                middle_notes = row.get("Middle")
                base_notes = row.get("Base")

                if not name or not url:
                    continue
                
                insert_fragrance(conn, name, url, top_notes, middle_notes, base_notes)
                count += 1
                if count % 100 == 0:
                    print("Added ", count, " fragrances")
        print("Done. Inserted: ", count, " fragrances")
        conn.commit()

    finally:
        conn.close()

if __name__ == "__main__":
    main()