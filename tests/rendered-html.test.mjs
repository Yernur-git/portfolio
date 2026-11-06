import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Фотограф, видеограф и монтажёр в Алматы \| Yernur Visuals<\/title>/i);
  assert.match(html, /Yernur Visuals/);
  assert.match(html, /Фотограф \/ Видеограф \/ Монтажер/);
  assert.match(html, /<html[^>]+lang="ru"/);
  assert.match(html, /ernur_shots/);
  assert.match(html, /Kaorukooo0/);
  assert.match(html, /yernurcontact@gmail\.com/);
});

test("keeps starter preview code out of the portfolio", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /https:\/\/lh3\.googleusercontent\.com\/d\//);
  assert.match(page, /https:\/\/drive\.google\.com\/file\/d\//);
  assert.match(layout, /title:\s*pageTitle/);
  assert.doesNotMatch(`${page}\n${layout}\n${packageJson}`, /Starter Project|_sites-preview|react-loading-skeleton|Your site is taking shape/);
  assert.doesNotMatch(page, /Bekbolat|Бекболат/i);
});

test("exposes crawlable SEO metadata and consistent primary URLs", async () => {
  const response = await render();
  const html = await response.text();
  const primaryUrl = "https://yernur-visuals.vercel.app/";
  assert.match(html, /rel="canonical"[^>]*href="https:\/\/yernur-visuals\.vercel\.app\/"/);
  assert.match(html, /name="robots"[^>]*content="index, follow"/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /name="twitter:card"[^>]*content="summary_large_image"/);

  const jsonLd = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  assert.ok(jsonLd, "structured data must be present before client JavaScript runs");
  const graph = JSON.parse(jsonLd[1])["@graph"];
  assert.equal(graph.find((entity) => entity["@type"] === "Person").telephone, "+77474547235");
  assert.equal(graph.find((entity) => entity["@type"] === "WebPage").url, primaryUrl);

  const [robots, sitemap] = await Promise.all([
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
  ]);
  assert.ok(robots.includes(`Sitemap: ${primaryUrl}sitemap.xml`));
  assert.doesNotMatch(robots, /^Disallow:\s*\/\s*$/m);
  assert.ok(sitemap.includes(`<loc>${primaryUrl}</loc>`));
});
