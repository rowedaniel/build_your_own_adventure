from sqlalchemy import Column, Date, ForeignKey, Integer, String

from .database import Base


class Part(Base):
    __tablename__ = "parts"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String(length=4000))


class Option(Base):
    __tablename__ = "options"
    id = Column(Integer, primary_key=True, index=True)
    parent_part = Column(Integer, ForeignKey("parts.id"))
    child_part = Column(Integer, ForeignKey("parts.id"))
    text = Column(String(length=4000))
