alembic revision --autogenerate -m "메시지"
alembic upgrade head
python alembic/insert_default_rows.py