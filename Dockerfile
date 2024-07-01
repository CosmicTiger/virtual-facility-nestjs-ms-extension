# Base image
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Define variables
ARG APP_NAME

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND pnpm-lock.yaml are copied
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install app dependencies
RUN pnpm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN pnpm run build -- ${APP_NAME}

# Start the server using the production build
CMD [ "node", "dist/apps/${APP_NAME}/main.js" ]
