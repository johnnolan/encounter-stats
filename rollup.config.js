import { terser } from "rollup-plugin-terser";

export default {
  input: "src/module.js",
  output: {
    file: "scripts/module.js",
    format: "es",
  },
  plugins: [terser()],
};
