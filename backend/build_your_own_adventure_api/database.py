import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# for database url
url_environ = os.environ['DATABASE_URL']
# url has wrong stuff at beginning, so replace
url = 'postgresql://' + url_environ.split('//')[1]

engine = create_engine(
    url,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
