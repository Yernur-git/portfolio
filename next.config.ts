import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_BASE_PATH: isGitHubPages ? "/portfolio" : "" },
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/portfolio",
        assetPrefix: "/portfolio/",
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
