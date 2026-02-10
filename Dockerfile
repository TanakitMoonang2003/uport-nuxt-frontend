FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Expose port (Nuxt will use default or assigned port)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]


