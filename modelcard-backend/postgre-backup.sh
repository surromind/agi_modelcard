#!/bin/bash

# Check if the script has execute permissions; if not, set them
SCRIPT_PATH="/usr/local/bin/$(basename "$0")"
if [ ! -x "$SCRIPT_PATH" ]; then
    chmod +x "$SCRIPT_PATH"
fi

# PostgreSQL credentials
PGUSER=${POSTGRES_USER}
PGPASSWORD=${POSTGRES_PASSWORD}
PGDATABASE=${POSTGRES_DB}
PGHOST=${POSTGRES_HOST:-localhost}

# Backup file path
BACKUP_DIR=/var/lib/postgresql/data
BACKUP_FILE_NAME=dump_$(date +"%Y-%m-%d_%H%M%S").sql

pg_dump -h $PGHOST -U $PGUSER $PGDATABASE > $BACKUP_DIR/$BACKUP_FILE_NAME
