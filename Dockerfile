FROM node:lts as frontend-homepage
WORKDIR /app/frontend/homepage
COPY frontend/homepage/ ./

FROM node:lts as frontend-math-practice
WORKDIR /app/frontend/math-practice
COPY frontend/math-practice/package*.json /app/frontend/math-practice/
RUN npm ci
COPY frontend/math-practice/ /app/frontend/math-practice/
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
COPY --from=frontend-homepage /app/frontend/homepage/ ./frontend/homepage/
COPY --from=frontend-math-practice /app/frontend/math-practice/public ./frontend/math-practice/public
COPY --from=backend /app/target/release/thesilican-website ./thesilican-website

EXPOSE 8080
CMD ["./thesilican-website"];
