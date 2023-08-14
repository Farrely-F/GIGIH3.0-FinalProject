# Use an official Node.js runtime as the base image for building both frontend and backend
FROM node:14 AS builder

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy the frontend package.json and package-lock.json
COPY frontend/package*.json ./

# Install frontend app dependencies
RUN npm install

# Copy the rest of the frontend application files
COPY frontend .

# Build the frontend
RUN npm run build

# Move to the backend directory
WORKDIR /app/backend

# Copy the backend package.json and package-lock.json
COPY backend/package*.json ./

# Install backend app dependencies
RUN npm install

# Copy the rest of the backend application files
COPY backend .

# Expose the port your app runs on (assuming your app runs on port 8080)
EXPOSE 8080

# Specify the command to run the backend using nodemon
CMD ["npm", "start"]
