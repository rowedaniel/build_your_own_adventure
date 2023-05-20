sudo systemctl start docker
poetry run uvicorn build_your_own_adventure_api.main:app --reload --host=0.0.0.0
