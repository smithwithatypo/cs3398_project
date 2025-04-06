FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json files first to leverage Docker caching
COPY backend/package*.json ./backend/
COPY recipe_vite/package*.json ./recipe_vite/

# Install dependencies for both applications
RUN cd backend && npm install
RUN cd recipe_vite && npm install

# Copy application code
COPY backend ./backend
COPY recipe_vite ./recipe_vite

# Install supervisor to manage multiple processes
RUN npm install -g supervisor

# Create a startup script
RUN echo '#!/bin/bash\n\
cd /app/backend && npm run start &\n\
cd /app/recipe_vite && npm run dev -- --host 0.0.0.0 &\n\
wait' > /app/start.sh && chmod +x /app/start.sh

# Expose ports (adjust these based on your actual application ports)
# Backend typically uses 3000, Vite default is 5173
EXPOSE 3000 5173

# Run the startup script
CMD ["/app/start.sh"]
