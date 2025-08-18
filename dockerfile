# Base image
FROM node:18

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Set work directory
WORKDIR /app

# Copy package.json and install Node.js deps
COPY package*.json ./
RUN npm install

# Copy requirements.txt and install Python deps
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copy all project files
COPY . .

# Expose ports
EXPOSE 3000 5000

# Start both Node.js + Python
CMD ["sh", "-c", "node server.js & python3 chatbot/chatbot.py & npm run dev"]
