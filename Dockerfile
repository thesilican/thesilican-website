FROM node:lts as frontend-homepage
WORKDIR /app/frontend/homepage
COPY frontend/homepage/package*.json ./
RUN npm ci
COPY frontend/homepage/ ./
RUN npm run build

FROM rust as backend
WORKDIR /app
# Sketchy build caching
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() { println!(\"Temp\"); }" > src/main.rs && cargo build --release && rm src/main.rs
COPY src/ ./src/
RUN touch src/main.rs && cargo build --release

FROM debian
WORKDIR /app
COPY --from=frontend-homepage /app/frontend/homepage/build/ ./frontend/homepage/build/
COPY --from=backend /app/target/release/thesilican-website ./thesilican-website

EXPOSE 8080
CMD ["./thesilican-website"];
