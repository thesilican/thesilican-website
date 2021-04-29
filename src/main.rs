use actix_files as fs;
use actix_web::{web, App, HttpServer, Responder};

fn static_dir(path: &str, dir: &str) -> fs::Files {
    fs::Files::new(path, dir).index_file("index.html")
}

async fn api_ping() -> impl Responder {
    String::from("{\"data\":\"pong\"}")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let port = std::env::var("PORT")
        .unwrap_or(String::from("8080"))
        .parse()
        .expect("Invalid PORT env: Not an integer");
    println!("Starting server on port {}", port);
    HttpServer::new(|| {
        App::new()
            .route("/api/ping", web::get().to(api_ping))
            .service(static_dir("/", "frontend/homepage/build"))
    })
    .bind(("127.0.0.1", port))?
    .run()
    .await
}
