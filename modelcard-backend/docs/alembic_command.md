## DB migration

- tested in bash, powershell
- run in the project root directory (where `alembic.ini` exists, ex. `modelcard-backend`)

### Create a script file

```
alembic revision --autogenerate -m "메시지"
```

This command generates a `{해쉬된 문자열}_{메시지}.py` file in  `alembic/versions` directory

you can't create new script file if there are existing migration scripts that have not yet been migrated.

### Migrate

```
alembic upgrade head
```

### Add ORM

If you want to add tables using SQLAlchemy ORM, ensure that your table class inherits from the `app.db_models.base.Base` class for migration.

- e.g. `Base` -> `BaseModel` -> `BaseFile` ->  `InferencePreviewFile`

Then, add import line in `app.db_models.__init__.py`

Finally, execute the commands in the "Create a script file" and "Migrate" sections once again.

```
alembic revision --autogenerate -m "메시지"
```

```
alembic upgrade head
```
