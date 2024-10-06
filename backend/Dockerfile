# Use Node.js image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the backend port
EXPOSE 5003

# Run the app
CMD ["npm", "start"]
