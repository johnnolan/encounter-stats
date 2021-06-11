import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/module.js",
  output: {
    file: "scripts/module.js",
    format: "iife",
    compact: true,
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: "bundled" }),
    terser(),
  ],
};
