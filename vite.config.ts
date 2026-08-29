import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

/** Amplify Hosting sets these during CI; use Nitro's aws_amplify SSR preset there. */
const isAmplifyBuild = Boolean(
  process.env.AWS_APP_ID || process.env.AWS_BRANCH || process.env.AWS_JOB_ID,
);

export default defineConfig({
  server: {
    host: "::",
    port: 3000,
  },
  resolve: {
    alias: {
      "@": `${process.cwd()}/src`,
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    nitro({
      defaultPreset: isAmplifyBuild ? "aws_amplify" : "cloudflare-module",
      ...(isAmplifyBuild
        ? {
            awsAmplify: {
              runtime: "nodejs22.x" as const,
            },
          }
        : {}),
    }),
    viteReact(),
  ],
});
