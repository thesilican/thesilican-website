import mathJaxAPI from "mathjax-node";
import sharp from "sharp";
import env from "../env";

class LRUCache<K, V> {
  maxSize: number;
  cache: Map<K, V>;
  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }
  get(key: K) {
    const val = this.cache.get(key);
    if (val !== undefined) {
      this.cache.delete(key);
      this.cache.set(key, val);
    }
    return val;
  }
  set(key: K, val: V) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, val);
  }
}

mathJaxAPI.config({
  displayErrors: false,
  MathJax: {},
});
mathJaxAPI.start();
const latexSvgCache = new LRUCache<string, string>(
  env.LATEX_SVG_CACHE_MAX_SIZE
);

export async function latexToSVG(latex: string): Promise<string> {
  // LRU Cache
  // https://stackoverflow.com/questions/996505/lru-cache-implementation-in-javascript
  const val = latexSvgCache.get(latex);
  if (val !== undefined) {
    return val;
  }
  return mathJaxAPI
    .typeset({
      math: latex,
      format: "TeX",
      svg: true,
    })
    .then((data: { svg: string }) => data.svg);
}

const svgPngCache = new LRUCache<string, Buffer>(env.SVG_PNG_CACHE_MAX_SIZE);

export async function svgToPng(svg: string, dpi: number): Promise<Buffer> {
  const key = `${dpi}/${svg}`;
  const val = svgPngCache.get(key);
  if (val !== undefined) {
    return val;
  }

  return sharp(Buffer.from(svg), {
    density: dpi,
  })
    .png()
    .toBuffer();
}
