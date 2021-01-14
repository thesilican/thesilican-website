import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: parseInt(process.env.PORT ?? "8080", 10),
  LATEX_SVG_CACHE_MAX_SIZE: parseInt(
    process.env.LATEX_CACHE_MAX_SIZE ?? "10",
    10
  ),
  SVG_PNG_CACHE_MAX_SIZE: parseInt(
    process.env.SVG_PNG_CACHE_MAX_SIZE ?? "10",
    10
  ),
};

export default env;
