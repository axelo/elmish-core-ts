import pkg from "./package.json";
import { ts, dts } from "rollup-plugin-dts";
import resolve from "rollup-plugin-node-resolve";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "commonjs"
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      resolve({
        mainFields: ["module", "main"],
        extensions: [".ts"]
      }),
      ts({
        compilerOptions: {
          removeComments: true
        }
      })
    ]
  },
  {
    input: "./src/index.ts",
    output: [{ file: "lib/index.d.ts", format: "es" }],
    plugins: [
      dts(),
      (function removeInvalidTypedefCode() {
        return {
          renderChunk: code => code.replace(/^\/\/.*/gm, "").trim()
        };
      })()
    ]
  }
];
