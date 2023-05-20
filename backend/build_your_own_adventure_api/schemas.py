from pydantic import BaseModel, constr


class OptionBase(BaseModel):
    text: str


class OptionCreate(OptionBase):
    pass


class Option(OptionBase):
    id: int
    parent_part: int
    child_part: int | None

    class Config:
        orm_mode = True


class PartBase(BaseModel):
    text: constr(max_length=4000)


class PartCreate(PartBase):
    parent: int
    options: list[OptionCreate]


class Part(PartBase):
    id: int
    options: list[Option]

    class Config:
        orm_mode = True
