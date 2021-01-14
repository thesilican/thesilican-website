import express from "express";
import { latexToSVG, svgToPng } from "./latex";

const apiRouter = express.Router();

apiRouter.get("/ping", (req, res) => {
  res.json({
    message: "pong",
  });
});

/*
/api/latex
Query Parameters:
  q {string} - base64 encoded tex
  format {png/svg} - png or svg. Default png.
  dpi {number} - PNG dpi, number between 10-2000. Default 1000.
  color {hex color code} - Optional recolor
*/
apiRouter.get("/latex", async (req, res) => {
  const query = req.query;
  const q = query.q;
  const tex = Buffer.from(q?.toString() ?? "", "base64").toString();
  const format = query.format ?? "png";
  const dpi = parseInt(query.dpi?.toString() ?? "1000", 10);
  const colorCode = query.color?.toString();

  if (tex === "") {
    return res.status(400).send("Invalid query");
  }
  if (tex.length > 10_000) {
    return res.status(400).send("Query too long (10000 characters max)");
  }
  if (format !== "png" && format !== "svg") {
    return res.status(400).send("Invalid ouput format");
  }
  if (!(dpi >= 10 && dpi <= 2000)) {
    return res.status(400).send("Invalid dpi (Between 10-2000)");
  }
  if (colorCode) {
    const colorMatch = colorCode.match(/^[0-9a-fA-F]{6}$/);
    if (!colorMatch) {
      return res.status(400).send("Invalid color code");
    }
  }

  let svg: string, png: Buffer;
  try {
    let coloredTex: string;
    if (colorCode) {
      coloredTex = `\\color{#${colorCode}}{${tex}}`;
    } else {
      coloredTex = tex;
    }
    svg = await latexToSVG(coloredTex);
  } catch (err) {
    // TeX error
    return res.status(400).send(err.join("\n"));
  }
  if (format === "svg") {
    res.type("svg");
    res.setHeader("Vary", "Accept-Encoding");
    return res.send(svg);
  } else if (format === "png") {
    try {
      png = await svgToPng(svg, dpi);
    } catch {
      return res.sendStatus(500);
    }
    res.type("png");
    return res.send(png);
  }
});

export { apiRouter };
