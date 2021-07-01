use actix_files as fs;
use actix_web::{web, App, HttpRequest, HttpResponse, HttpServer, Responder};

fn static_dir(path: &str, dir: &str) -> fs::Files {
    fs::Files::new(path, dir).index_file("index.html")
}

async fn api_ping() -> impl Responder {
    HttpResponse::Ok().body("Pong!")
}

async fn api_ip(req: HttpRequest) -> impl Responder {
    match req.peer_addr() {
        Some(addr) => {
            let text = addr.ip().to_string();
            HttpResponse::Ok().body(text)
        }
        None => HttpResponse::BadRequest().body("Unknown IP Address"),
    }
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
            .route("/api/ip", web::get().to(api_ip))
            .service(static_dir("/", "frontend/homepage"))
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
