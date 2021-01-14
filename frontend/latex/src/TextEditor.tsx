import { useEffect, useRef } from "react";
import { createMonacoEditor } from "./monaco";
import styles from "./styles/TextEditor.module.scss";

type TextEditorProps = {
  text: string;
  onTextChange: (text: string) => void;
};

export default function TextEditor({ text, onTextChange }: TextEditorProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = divRef.current!;
    const editor = createMonacoEditor(div, text);
    editor.onDidChangeModelContent(() => {
      const content = editor.getModel()?.getLinesContent().join("\n") ?? "";
      onTextChange(content);
    });

    const handleResize = () => {
      editor.layout();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      editor.dispose();
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.outer}>
      <div className={styles.inner} ref={divRef} />
    </div>
  );
}
