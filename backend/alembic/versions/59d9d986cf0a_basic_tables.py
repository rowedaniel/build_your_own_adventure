"""Basic Tables

Revision ID: 59d9d986cf0a
Revises:
Create Date: 2023-05-09 14:36:20.129829

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '59d9d986cf0a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('parts',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('text', sa.String(length=4000), nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('options',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('parent_part', sa.Integer(), sa.ForeignKey("parts.id"), nullable=False),
                    sa.Column('child_part', sa.Integer(), sa.ForeignKey("parts.id"), nullable=True),
                    sa.Column('text', sa.String(length=4000), nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )


def downgrade() -> None:
    op.drop_table('options')
    op.drop_table('parts')
