# Use an official Node.js image to build the frontend
FROM node:14-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the code and build the app
COPY . ./
RUN npm run build

# Use an NGINX image to serve the frontend
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port NGINX will run on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
