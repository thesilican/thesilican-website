/* eslint-disable no-restricted-globals */
// @ts-nocheck
import * as monaco from "monaco-editor";

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    const root = `${process.env.PUBLIC_URL}/workers`;
    if (label === "json") {
      return `${root}/json.worker.js`;
    }
    if (label === "css" || label === "scss" || label === "less") {
      return `${root}/css.worker.js`;
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return `${root}/html.worker.js`;
    }
    if (label === "typescript" || label === "javascript") {
      return `${root}/ts.worker.js`;
    }
    return `${root}/editor.worker.js`;
  },
};

export function createMonacoEditor(element: HTMLDivElement, text: string) {
  return monaco.editor.create(element, {
    folding: false,
    model: monaco.editor.createModel(text),
    hideCursorInOverviewRuler: true,
    theme: "vs",
    minimap: {
      enabled: false,
    },
    lineNumbers: "off",
    automaticLayout: true,
  });
}
