FROM node:lts-alpine

WORKDIR /app

COPY package*.json /app/
RUN npm ci

COPY . /app/
RUN npm run build

EXPOSE 8080
CMD ["node", "dist/index.js"];
