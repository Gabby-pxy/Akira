# Use the official Node.js image as a base
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to install dependencies
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 4000
EXPOSE 4000

# Start the Node.js server
CMD ["node", "index.js"]
