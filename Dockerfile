FROM node:lts as frontend-homepage
WORKDIR /frontend/homepage
COPY frontend/homepage/package*.json /frontend/homepage/
RUN npm ci
COPY frontend/homepage/ /frontend/homepage/
RUN npm run build

FROM rust:alpine as backend-builder
WORKDIR /app
# Sketchy build caching
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() { println!(\"Temp\"); }" > src/main.rs && cargo build --release && rm src/main.rs
COPY src/ ./src
RUN touch src/main.rs && cargo build --release

COPY --from=frontend-homepage /frontend/homepage/build/ /app/frontend/homepage/build/

EXPOSE 8080
CMD ["./target/release/thesilican-website"];
