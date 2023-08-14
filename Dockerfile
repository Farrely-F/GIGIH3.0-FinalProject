# Use the official Node.js image for the frontend build
FROM node:18 AS frontend-builder

# Set the working directory for the frontend build
WORKDIR /app/frontend

# Copy frontend package.json and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source code and build the frontend
COPY frontend ./
RUN npm run build

# Use a minimal Node.js image for the backend
FROM node:14 AS backend

# Set the working directory for the backend
WORKDIR /app/backend

# Copy backend package.json and install production dependencies
COPY backend/package*.json ./
RUN npm install --only=production

# Copy backend source code
COPY backend ./

# Copy the frontend build from the frontend-builder stage
COPY --from=frontend-builder /app/frontend/build ./public

# Expose the backend port
EXPOSE 8080

# Set environment variables for the backend from build arguments
ARG MONGODB_URL
ARG NODE_ENV
ENV MONGODB_URL=${MONGODB_URL}
ENV NODE_ENV=${NODE_ENV}

# Start the backend server
CMD ["node", "index.js"]

# Run this in your terminal (optimized for powershell)
# docker build `
#   --build-arg MONGODB_URL="your_mongodb_url_here" `
#   --build-arg NODE_ENV="production" `
#   -t your_image_name .
