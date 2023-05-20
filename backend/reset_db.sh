# this should clobber any previous things in the database

docker-compose -f docker-compose.yml down -v
docker-compose -f docker-compose.yml up -d -V

# do this after a bit:
# poetry run alembic upgrade head
