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

COPY --from=frontend-latex /frontend/latex/build/ /app/frontend/latex/build/

EXPOSE 8080
CMD ["node", "dist/index.js"];
