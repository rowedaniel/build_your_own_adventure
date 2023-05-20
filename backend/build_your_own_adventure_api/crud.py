from sqlalchemy import ForeignKey
from sqlalchemy.orm import Session

from . import models, schemas


def get_part_or_none(db: Session, item_id: int) -> schemas.Part | None:
    part = db.query(models.Part).filter(models.Part.id == item_id).one_or_none()
    options = db.query(models.Option).filter(models.Option.parent_part == item_id).all()

    if part is None:
        return None

    options_out = [
        schemas.Option(
            id=option.id,
            parent_part=option.parent_part,
            child_part=option.child_part,
            text=option.text,
        )
        for option in options
    ]

    part_out = schemas.Part(id=part.id, text=part.text, options=options_out)

    return part_out


def create_root(db: Session) -> schemas.Part | None:
    root_id = 1

    # first check to see if the root exists
    existing_root = (
        db.query(models.Part).filter(models.Part.id == root_id).one_or_none()
    )
    if existing_root is not None:
        return None

    root = models.Part(id=root_id, text="Press 'start' to begin.")
    db.add(root)
    db.commit()
    db.refresh(root)

    root_option = models.Option(parent_part=root.id, text="start")
    db.add(root_option)
    db.commit()

    part_out = schemas.Part(id=root.id, text=root.text, options=[root_option])
    return part_out


def create_part(db: Session, new_part: schemas.PartCreate) -> schemas.Part | None:
    # get parent option
    option = (
        db.query(models.Option)
        .filter(models.Option.id == new_part.parent)
        .one_or_none()
    )
    if option is None or option.child_part is not None:
        return None

    # add the item itself
    part = models.Part(text=new_part.text)
    db.add(part)
    db.commit()
    db.refresh(part)

    # connect parent option to new part
    db.query(models.Option).filter(models.Option.id == new_part.parent).update(
        {"child_part": part.id}
    )
    db.commit()
    db.refresh(option)

    # add all of the new options
    options = [
        models.Option(parent_part=part.id, text=new_option.text)
        for new_option in new_part.options
    ]
    for option in options:
        db.add(option)

    db.commit()

    part_out = schemas.Part(id=part.id, text=part.text, options=options)
    return part_out
