
FROM python:3.10


WORKDIR /app


RUN apt-get update && apt-get install -y gcc


COPY ./requirements.txt /app/requirements.txt


RUN pip install --no-cache-dir --upgrade pip && pip install --no-cache-dir -r /app/requirements.txt


COPY . .

EXPOSE 8000


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
