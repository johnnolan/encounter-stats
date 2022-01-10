import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

esbuild
  .build({
    entryPoints: ["scss/module.scss"],
    outdir: "styles",
    bundle: false,
    plugins: [sassPlugin()],
  })
  .then(() => console.log("⚡ Build complete! ⚡"))
  .catch(() => process.exit(1));
