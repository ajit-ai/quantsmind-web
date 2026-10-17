// Minimal ambient declarations for the Node built-ins used by tests that read
// repository fixtures (the sitemap, the design tokens) and by the
// static-generation regression tests (the prerendered HTML output).
//
// The project deliberately does not depend on @types/node, and adding a
// dependency for a handful of read-only helpers is not warranted. These
// declarations cover only what is actually called, so accidental wider use of
// Node APIs in the browser build still fails to compile.

declare module 'node:fs' {
  export function readFileSync(path: string, encoding: 'utf8'): string;
  export function existsSync(path: string): boolean;
}

declare module 'node:path' {
  export function resolve(...segments: string[]): string;
  export function join(...segments: string[]): string;
}

declare const process: {
  cwd(): string;
};
