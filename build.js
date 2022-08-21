import esbuild from "esbuild";

(async () => {
  await esbuild.build({
    entryPoints: ["scripts/module.ts"],
    loader: { ".hbs": "default" },
    bundle: true,
    minify: true,
    sourcemap: true,
    minifyIdentifiers: false,
    logLevel: "info",
    target: ["es6"],
    outdir: "dist",
    plugins: [],
  });
})();
