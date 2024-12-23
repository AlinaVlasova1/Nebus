# Dockerfile
FROM node:18.14.2

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./
COPY nuxt.config.ts ./
# Copy local directories to the current local directory of our docker image (/app)
COPY ./components ./components
COPY ./public ./public
COPY ./models ./models
COPY ./pages ./pages
COPY ./store ./store

RUN npm install
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST='http://localhost'

CMD [ "npm", "run", "dev" ]