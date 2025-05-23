FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json from the surface folder
COPY package*.json ./
COPY podcastino/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend app
COPY podcastino/ .

# Expose the port used by your dev server
EXPOSE 3000

# Start the app
CMD ["npm", "start"]