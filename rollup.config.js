import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import scss from "rollup-plugin-scss";

export default [
  {
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
    ],
  },
  {
    input: "src/scss.js",
    output: {
      file: "styles/module.js",
      format: "esm",
      sourcemap: false,
    },
    plugins: [scss()],
  },
];
