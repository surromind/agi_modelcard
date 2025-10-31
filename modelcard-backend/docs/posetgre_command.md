# Setting Database

- tested in bash, powershell
- run in `app` directory (where `postgre.Dockerfile` exists)

## Build docker image
```
docker build . -f postgre.Dockerfile -t {image_name:tag_name}
```

## Run docker container

```
docker run (--name {container_name}) -d -e POSTGRES_USER={user_name} -e POSTGRES_PASSWORD={password} -e PGDATA=/var/lib/postgresql/data/pgdata (-p {host_port}:5432) (-e POSTGRES_DB={database_name}) -v {host_path}:/var/lib/postgresql/data {image_name:tag_name} postgres
```

- change values between brackets properly
- () : removable
    - `POSTGRES_DB` : default value is equal to `POSTGRES_USER`
