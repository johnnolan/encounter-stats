import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/module.js",
  output: {
    file: "scripts/module.js",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    nodeResolve(),
    babel({ babelHelpers: "bundled", exclude: "node_modules/**" }),
    commonjs(),
  ],
};
