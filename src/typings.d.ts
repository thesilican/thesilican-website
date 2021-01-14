// For LaTeX api
declare module "mathjax-node" {
  export function config(options: any): void;
  export function start(): void;
  export function typeset(options: any): Promise<any>;
}
