#!/bin/bash

# Navigate to the server folder and start the server
cd server
npm start &

# Navigate to the client folder and build the frontend
cd ../client
npm run build