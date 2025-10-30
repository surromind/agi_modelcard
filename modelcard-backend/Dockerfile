FROM python:3.9

WORKDIR /src

COPY . /src

RUN pip install pipenv

RUN pipenv lock

RUN pipenv install --dev --system --deploy

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
