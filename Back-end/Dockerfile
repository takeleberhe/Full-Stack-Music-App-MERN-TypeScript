# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Install TypeScript and Nodemon globally
RUN npm install -g typescript nodemon

# Copy the rest of the application code to the working directory
COPY . .

# Compile TypeScript to JavaScript
RUN tsc

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the app with nodemon
CMD ["nodemon", "dist/src/server.js"]
