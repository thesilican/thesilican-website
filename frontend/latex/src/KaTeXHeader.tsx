import { useEffect, useRef } from "react";
import katex from "katex";

type KaTeXProps = {
  tex: string;
  type: "h1" | "h2";
};

export default function KaTeXHeader({ tex, type }: KaTeXProps) {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (type === "h1") {
      katex.render(tex, h1Ref.current!);
    } else if (type === "h2") {
      katex.render(tex, h2Ref.current!);
    }
  }, [tex, type]);
  return (
    <>
      {type === "h1" && <h1 ref={h1Ref}>{tex}</h1>}
      {type === "h2" && <h2 ref={h2Ref}>{tex}</h2>}
    </>
  );
}
