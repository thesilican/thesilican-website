import React, { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import styles from "./styles/ImageRender.module.scss";
import KaTeXHeader from "./KaTeXHeader";

type ImageRendererProps = {
  text: string;
};

export default function ImageRenderer({ text }: ImageRendererProps) {
  const [src, setSrc] = useState("");
  const [color, setColor] = useState("#000000");
  const [resolution, setResolution] = useState("1000");

  const handleImageRender = async (e: React.FormEvent) => {
    e.preventDefault();

    const urlBase = `/api/latex`;
    console.log(color);
    const params = new URLSearchParams({
      q: btoa(text).replace("=", ""),
      color: color.match(/#([0-9a-fA-f]{6})/)![1],
      resolution,
    });

    setSrc(`${urlBase}?${params.toString()}`);
  };

  return (
    <div className={styles.ImageRenderer}>
      <KaTeXHeader type="h2" tex="\text{Image:}" />
      <Form inline onSubmit={handleImageRender}>
        <Form.Group controlId="image-renderer-color">
          <Form.Label className={styles.label}>Color:</Form.Label>
          <Form.Control
            className={styles.color}
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="image-renderer-resolution">
          <Form.Label className={styles.label}>Resolution:</Form.Label>
          <Form.Control
            className={styles.resolution}
            type="number"
            min={10}
            max={2000}
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Generate Image</Button>
      </Form>
      {src && <img className={styles.img} alt={"Math Equation"} src={src} />}
    </div>
  );
}
