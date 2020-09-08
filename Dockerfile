FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm ci

COPY . /usr/src/app/

RUN npm run build
EXPOSE 8080

CMD ["npm", "run", "start", "--", "-p", "8080"];