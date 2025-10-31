# AI Studio Models

Welcome to **AI Studio Models** - your centralized hub for managing and leveraging SURROMIND's AI model outputs for ML processes, B2B sales promotion, and more. Our platform brings together scattered AI models to enhance reuse, management, and external presentation, aiming to improve customer trust, simplify managerial oversight, and accelerate model integration into ML processes.

## Challenges

- **Reproducibility Issues:** Difficulty in reproducing existing projects due to lost or hard-to-find datasets and models.
- **Accessibility:** Scattered and untraceable usage of datasets and models across internal projects.

## Purpose

To collect and organize SURROMIND's AI model outputs scattered across various projects, making them reusable for ML processes and valuable for B2B sales promotions.

## Objectives

- **Why & Who:** Enable ML developers to accumulate KPIs, allow management and executives to oversee and utilize models effortlessly, support business development with solid external evidence, and generate continuous revenue or direct customer engagement through B2B customizations.
- **How:** By developing a platform in the form of model cards, we aim to productize SURROMIND's AI model outputs.
- **What:** Facilitate the reuse of AI models in ML processes, allowing external parties to quickly find the models they need and demonstrate simple tests.

## Expected Benefits

- **Enhanced Trust with Clients:** By providing a systematic approach to model management.
- **Ease of Management:** Simplifying oversight for managers and executives.
- **Rapid Search and Understanding:** Accelerating the reuse of models in ML processes through efficient search capabilities.

### Key Features

- **Systematic Management:** Organize and manage AI models produced through various channels with model cards.
- **Rapid Discovery and Testing:** Enable fast search capabilities for SURROMIND's pre-trained AI models and provide a platform for immediate testing.

Let's embark on a journey towards enhanced model manageability, increased trust, and streamlined processes with **AI Studio Models**.


## For Developer
## Tech Stack
### Programming Language
- Python 3.9 🐍 ![Python Version](https://img.shields.io/badge/python-3.9-blue)

### Web Framework
- FastAPI 0.109.0 🚀 ![FastAPI Version](https://img.shields.io/badge/fastapi-0.109.0-brightgreen)

### Task Queue
- Celery 5.3.6 🥬 ![Celery Version](https://img.shields.io/badge/celery-5.3.6-red)

### ORM, Migration Tool
- SQLAlchemy 2.0.25 🗃️ ![SQLAlchemy Version](https://img.shields.io/badge/sqlalchemy-2.0.25-orange)
- Alembic 1.13.1 🏗️ ![Alembic Version](https://img.shields.io/badge/alembic-1.13.1-lightgrey)

### Database
- PostgreSQL 16.1 🐘 ![PostgreSQL Version](https://img.shields.io/badge/postgresql-16.1-blue)

## Configuration Guide
### Setting Up Your Development Environment
To configure your development environment, you need to create a .env file in the app/config directory of the project. This file contains environment variables that are critical for running and developing the application.

#### Creating the `.env` File
- path: app/config/.env
- Example
    ```shell
    # Project Settings
   PROJECT_NAME=YourProjectName

   # Database Configuration
   DB_TYPE=PostgreSQL
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_PORT=your_db_port

   # Harbor Registry Configuration
   HARBOR_URL=your_harbor_url
   HARBOR_USER_NAME=your_harbor_username
   HARBOR_PASSWORD=your_harbor_password

   S3_ACCESS_KEY=you_s3_key
   S3_SECRET_ACCESS_KEY=your_s3_access_key
   S3_DEFAULT_REGION=your_s3_region

   CELERY_BROKER_URL=your_broker_url
   CELERY_RESULT_BACKEND_URL=your_result_backend_url

   # Debug Mode
   DEBUG=True

    ```

### Using pre-commit-hook
#### Motivation
1. **Code Quality and Consistency**: Automatically enforces Python code style and error detection with `flake8`, while `black` ensures consistent code formatting across the entire codebase.
2. **Automated Testing**: Runs `pytest` as a local hook to validate code changes against existing tests, catching errors and potential issues before they make it into the repository.
3. **Clean Code Practices**: Cleans up trailing whitespaces, ensures files end with a newline, and organizes imports using `isort`, improving readability and maintainability.


#### How to Use
1. Install pre-commit (at project root)
    ```shell
    pip install pre-commit
    ```

2. Install Git Hooks (at project root)
    ```shell
    pre-commit install
    ```


### Using Celery
Long-running tasks such as Docker image build and push can be managed through the Python distributed asynchronous system known as Celery.

>**Warning**
>Redis must be set up as both the Celery Broker and the Celery Result Backend.

#### Run Celery, Flower
    celery -A app.celery_app worker --loglevel=info
    # monitoring
    celery -A app.celery_app flower --port=8888

#### Redis Docker
    docker run --name redis -p 6379:6379 -d redis


## Environment

- docker
- python 3.9
- pipenv==2023.11.17

### Why pipenv?

#### Without Pipenv

- We have to manage the Python version, imported third-party modules and their versions, and the project's virtual environment separately.
- If something goes wrong during the package installation process, it's challenging to identify the issue immediately.

#### With Pipenv

- The `Pipfile` manages the Python version and the list of installed modules with version specifications.
- The `Pipfile.lock` ensures the security of the package installation process.
- All of these tasks are accomplished with a single command.

## Install requirements

With these commands, we set up Python modules.

1. Installing pipenv

   ```shell
   pip install pipenv
   ```

2. Installing python packages using pipenv

   ```shell
   pipenv install
   ```
