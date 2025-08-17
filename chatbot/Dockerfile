# chatbot/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# install system deps if needed
RUN apt-get update && apt-get install -y build-essential gcc && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

ENV PORT=8080
EXPOSE 8080

CMD ["uvicorn", "chatbot:app", "--host", "0.0.0.0", "--port", "8080"]
