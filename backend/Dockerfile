FROM python:3.9

WORKDIR /app

# to install StarVector 
COPY ../star-vector /app/star-vector
RUN pip install /app/star-vector

# backend files
COPY . /app

RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
