# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

ENV APP_PORT=4000
ENV DB_URI=${DB_URI}
ENV JWT_SECRET=${JWT_SECRET}
ENV JWT_EXPIRES=${JWT_EXPIRES}

# Expose the port your Nest.js application is listening on
EXPOSE ${APP_PORT}

# Command to start your Nest.js application
CMD [ "npm", "run", "start:prod" ]