# Build-your-own-adventure project

This is a small project I worked on to learn React and other modern development tools.

The goal is to create a website where people can contribute to an ever-expanding story.
My vision is that it works like reading a choose-your-own-adventure, where at each point in the story you have a number of options, and each one branches off into a slightly different variation of the story.
Expanding on that idea, users should be able to not only navigate through existing branching storylines, but also contribute to new ones.

## Architecture

The frontend (under frontend/) is built using React. I plan on deploying to GitHub pages soon.
The backend is a relatively simple api written in python using FastAPI, using SQLAlchemy and alembic to talk to the database.
Dependancies are visible in backend/pyproject.toml.
