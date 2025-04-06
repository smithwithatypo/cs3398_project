FROM caddy:2-alpine

WORKDIR /app

# Install Node.js for building and running the backend
RUN apk add --no-cache nodejs npm

# Copy application files
COPY backend ./backend
COPY recipe_vite ./recipe_vite

# Install dependencies and build frontend
RUN cd backend && npm install
RUN cd recipe_vite && npm install
RUN cd recipe_vite && npm run build

# Copy built frontend assets to Caddy's serve directory
RUN cp -r /app/recipe_vite/dist/* /usr/share/caddy/

# Configure Caddy
COPY Caddyfile /etc/caddy/Caddyfile

# Expose ports
EXPOSE 80
EXPOSE 3000

# Remove the script creation and use CMD directly
CMD sh -c "cd /app/backend && npm run start & caddy run --config /etc/caddy/Caddyfile"

