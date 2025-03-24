FROM node:18

WORKDIR /app

# Copy package.json files first for better caching
COPY backend/package*.json ./backend/
COPY recipe_vite/package*.json ./recipe_vite/

# Install dependencies
RUN cd backend && npm install
RUN cd recipe_vite && npm install

# Copy the rest of the application
COPY backend ./backend
COPY recipe_vite ./recipe_vite

# Expose the ports
EXPOSE 3000:3000
EXPOSE 5173:5173

# Create a start script
RUN echo '#!/bin/bash\ncd /app/backend && npm run start & \ncd /app/recipe_vite && npm run dev' > /app/start.sh
RUN chmod +x /app/start.sh

# Start both services
CMD ["/app/start.sh"]
