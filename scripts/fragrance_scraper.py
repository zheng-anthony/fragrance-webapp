import os
from dotenv import load_dotenv

import kagglehub
import pandas as pd

from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.dialects.postgresql import insert as pg_insert

# db connections
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("Database URL not set in .env")

# fra_cleaned.csv is the proper .csv file
DATASET_SLUG = "olgagmiufana1/fragrantica-com-fragrance-dataset"
CSV_NAME = "fra_cleaned.csv"

# gets dataset path
def get_dataset_path() -> str:
    return kagglehub.dataset_download(DATASET_SLUG)

# function to clean up entry names via pandas
def clean(value):
    if pd.isna(value):
        return None
    s = str(value).strip()
    s = s.replace("-", " ")
    s = " ".join(s.split())
    s = s.title()
    return s

# function to insert fragrance profiles
def upsert_fragrance(engine, df, table_name="fragrances", chunk_size=2000):
    meta = MetaData()
    fragrances = Table(table_name, meta, autoload_with=engine)

    # converts dataframe into json format
    rows = df.to_dict(orient="records")

    # safety check
    if not rows:
        print("No rows to insert.")
        return
    
    total = len(rows)

    with engine.begin() as conn:
        for batch_idx, start in enumerate(range(0, total, chunk_size), start=1):
            batch = rows[start : start + chunk_size]

            stmt = pg_insert(fragrances).values(batch)

            stmt = stmt.on_conflict_do_update(
                index_elements=["url"],
                set_={
                    "name": stmt.excluded["name"],
                    "topNotes": stmt.excluded["topNotes"],
                    "middleNotes": stmt.excluded["middleNotes"],
                    "baseNotes": stmt.excluded["baseNotes"],
                },
            )

            conn.execute(stmt)

            # checks progress
            if batch_idx % 1 == 0:
                done = min(start + len(batch), total)
                pct = (done / total) * 100
                print(f"Upserted {done:,}/{total:,} ({pct:.1f}%)")

    print(f"Done. Upsert complete for {total:,} rows.")


def main():
    # create engine
    engine = create_engine(DATABASE_URL, future=True)

    # download dataset and path
    dataset_path = get_dataset_path()
    csv_path = os.path.join(dataset_path, CSV_NAME)

    # read csv and turn into dataframe
    df = pd.read_csv(csv_path, sep=";", encoding="cp1252", dtype=str)

    # rename csv cols to match schema
    df = df.rename(
        columns={
            "Perfume": "name",
            "Top": "topNotes",
            "Middle": "middleNotes",
            "Base": "baseNotes"
        }
    )

    ALLOWED_COLS = ["url", "name", "topNotes", "middleNotes", "baseNotes"]
    df = df[[c for c in ALLOWED_COLS if c in df.columns]]

    # uses clean function to clean up entries
    df["name"] = df["name"].map(clean)
    df["url"] = df["url"].str.strip()

    for col in ["topNotes", "middleNotes", "baseNotes"]:
        df[col] = df[col].map(clean)

    upsert_fragrance(engine, df)

if __name__ == "__main__":
    main()

