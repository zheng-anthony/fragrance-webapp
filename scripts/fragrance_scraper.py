import os
import psycopg2
import psycopg2.extras
from dotenv import load_dotenv

# load .env info
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("Database URL not set in .env")

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
    conn.commit()
    print("Sequence for fragrances.id synced to current MAX(id).")

def insert_fragrance(conn, name, url, top_notes=None, middle_notes=None, base_notes=None):
    # inserts a single fragrance into the DB
    with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
        cur.execute(
            """
            INSERT INTO fragrances(name, url, "topNotes", "middleNotes", "baseNotes")
            VALUES (%s, %s, %s, %s, %s)
            """,
            (name, url, top_notes, middle_notes, base_notes),
        )
    conn.commit()


def main():
    # get connection to DB
    conn = get_connection()

    try:   
        fix_id_sequence(conn)
        insert_fragrance(
            conn,
            name="Test Fragrance Python Insert",
            url="https://example.com/test-fragrance",
            top_notes="Bergamot, Lemon",
            middle_notes="Lavender, Geranium",
            base_notes="Cedarwood, Musk",
        )
        print("Inserted test fragrance.")
        # open cursor (how to send commands in SQL)
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
            cur.execute(
                """
                SELECT id, name, url
                FROM fragrances
                LIMIT 5
                """
            )

            # fetch all rows
            rows = cur.fetchall()
            print("Sample fragrances from DB:")
            for row in rows:
                # row behaves like a dict because we used DictCursor
                print(f"- [{row['id']}] {row['name']} -> {row['url']}")
    finally:
        conn.close()

if __name__ == "__main__":
    main()