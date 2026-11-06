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
  assert.match(html, /<title>Yernur Visuals<\/title>/i);
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
  assert.match(layout, /title:\s*"Yernur Visuals"/);
  assert.doesNotMatch(`${page}\n${layout}\n${packageJson}`, /Starter Project|_sites-preview|react-loading-skeleton|Your site is taking shape/);
  assert.doesNotMatch(page, /Bekbolat|Бекболат/i);
});
