import scss from "rollup-plugin-scss";

export default [
  {
    input: "scripts/scss.js",
    output: {
      file: "styles/module.js",
      format: "esm",
      sourcemap: false,
    },
    plugins: [scss()],
  },
];
