import katex from "katex";
import { useEffect, useRef, useState } from "react";
import ImageRenderer from "./ImageRenderer";
import KaTeXHeader from "./KaTeXHeader";
import styles from "./styles/App.module.scss";
import TextEditor from "./TextEditor";
import { useDebounce } from "./util";

const localStorageKey = "latex-editor-value";

const getInitialTextState = () =>
  window.localStorage.getItem(localStorageKey) ??
  "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}";

export default function App() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(getInitialTextState);
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
          <ImageRenderer text={text} />
        </div>
      </div>
    </div>
  );
}
