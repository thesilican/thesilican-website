import katex from "katex";
import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import styles from "./styles/App.module.scss";
import TextEditor from "./TextEditor";
import { useDebounce } from "./util";
import KaTeXHeader from "./KaTeXHeader";

const localStorageKey = "latex-editor-value";

const getInitialTextState = () =>
  window.localStorage.getItem(localStorageKey) ??
  "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}";

export default function App() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(getInitialTextState);
  const [src, setSrc] = useState<string | null>(null);
  const debouncedText = useDebounce(text, 0);

  useEffect(() => {
    const span = spanRef.current!;
    window.localStorage.setItem(localStorageKey, debouncedText);
    try {
      katex.render(debouncedText, span, {
        throwOnError: false,
      });
    } catch (err) {}
  }, [debouncedText]);

  const handleImageRender = (e: React.FormEvent) => {
    e.preventDefault();

    const urlBase = `/api/latex`;
    const params = new URLSearchParams({
      q: btoa(text).replace("=", ""),
    });
    setSrc(`${urlBase}?${params.toString()}`);
  };

  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <KaTeXHeader type="h1" tex="\LaTeX\text{ to PNG}" />
      </div>
      <div className={styles.left}>
        <KaTeXHeader type="h2" tex="\text{Type Equation Here:}" />
        <TextEditor text={text} onTextChange={setText} />
      </div>
      <div className={styles.rightOuter}>
        <div className={styles.rightInner}>
          <div className={styles.katex}>
            <KaTeXHeader type="h2" tex="\text{Preview:}" />
            <span ref={spanRef} />
          </div>
          <div className={styles.image}>
            <KaTeXHeader type="h2" tex="\text{Image:}" />
            <Form inline onSubmit={handleImageRender}>
              <Form.Label className={styles.label}>Color:</Form.Label>
              <Form.Control className={styles.color} type="color" />
              <Form.Label className={styles.label}>Resolution:</Form.Label>
              <Form.Control
                className={styles.resolution}
                type="number"
                min={10}
                max={2000}
                value={1000}
              />
              <Button type="submit">Generate Image</Button>
            </Form>
            {src && (
              <img className={styles.img} alt={"Math Equation"} src={src} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
