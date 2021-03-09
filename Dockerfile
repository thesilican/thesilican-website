FROM node:lts as frontend-homepage
WORKDIR /frontend/homepage
COPY frontend/homepage/package*.json /frontend/homepage/
RUN npm ci
COPY frontend/homepage/ /frontend/homepage/
RUN npm run build

FROM node:lts as frontend-latex
WORKDIR /frontend/latex
COPY frontend/latex/package*.json /frontend/latex/
RUN npm ci
COPY frontend/latex/ /frontend/latex/
RUN npm run build-workers
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY package*.json /app/
RUN npm ci
COPY . /app/
RUN npm run build

COPY --from=frontend-homepage /frontend/homepage/build/ /app/frontend/homepage/build/
COPY --from=frontend-latex /frontend/latex/build/ /app/frontend/latex/build/

EXPOSE 8080
CMD ["node", "dist/index.js"];
