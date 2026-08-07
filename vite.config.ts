import { defineConfig, type Plugin } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
const API_HOST =
  env.VITE_API_URL || process.env.VITE_API_URL || "https://apideepfit.gaamferi.com";

/** Amplify Hosting sets these during CI; use Nitro's aws_amplify SSR preset there. */
const isAmplifyBuild = Boolean(
  process.env.AWS_APP_ID || process.env.AWS_BRANCH || process.env.AWS_JOB_ID,
);

/** Django customer/exercise/blog routes require a trailing slash (same as Next rewrites). */
function djangoApiTrailingSlashPlugin(): Plugin {
  return {
    name: "deepfit-django-api-trailing-slash",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (!req.url) return next();
        const [pathname, query = ""] = req.url.split("?");
        if (
          /^\/api\/(customer|exercise|blog)(\/|$)/.test(pathname) &&
          !pathname.endsWith("/")
        ) {
          req.url = query ? `${pathname}/?${query}` : `${pathname}/`;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  server: {
    host: "::",
    port: 3000,
    proxy: {
      // Keep local Ziina payment handlers on this app.
      "/api/customer": {
        target: API_HOST,
        changeOrigin: true,
        secure: true,
      },
      "/api/exercise": {
        target: API_HOST,
        changeOrigin: true,
        secure: true,
      },
      "/api/blog": {
        target: API_HOST,
        changeOrigin: true,
        secure: true,
      },
      "/api": {
        target: API_HOST,
        changeOrigin: true,
        secure: true,
        bypass(req) {
          if (req.url?.startsWith("/api/payments")) {
            return req.url;
          }
        },
      },
    },
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
    djangoApiTrailingSlashPlugin(),
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
      routeRules: {
        "/api/customer/**": {
          proxy: `${API_HOST}/api/customer/**`,
        },
        "/api/exercise/**": {
          proxy: `${API_HOST}/api/exercise/**`,
        },
        "/api/blog/**": {
          proxy: `${API_HOST}/api/blog/**`,
        },
        "/api/customerportal/**": {
          proxy: `${API_HOST}/api/customerportal/**`,
        },
        "/api/wallet/**": {
          proxy: `${API_HOST}/api/wallet/**`,
        },
      },
    }),
    viteReact(),
  ],
});
