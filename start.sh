#!/bin/bash

# Start backend
cd /app/backend
npm run start &

# Start frontend
cd /app/recipe_vite
npm run dev

# Keep container running
wait
