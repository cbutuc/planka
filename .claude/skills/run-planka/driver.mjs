// Drives the running Planka board with Playwright and captures screenshots.
// Usage: node driver.mjs <baseUrl>
//   e.g. node driver.mjs http://localhost:5174
//
// Requires the app already running: docker-compose up -d, server `npm run dev`,
// client `npm run dev` (see SKILL.md for the full sequence and how to read the
// actual client port out of its log).

import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const shotDir = path.join(__dirname, "screenshots");

const baseUrl = process.argv[2];
if (!baseUrl) {
  console.error("Usage: node driver.mjs <baseUrl>  (e.g. http://localhost:5174)");
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(String(err)));

// The app has exactly one route today: /board (see client/src/App.tsx).
// There is no redirect from "/" — you must navigate to /board directly.
await page.goto(`${baseUrl}/board`, { waitUntil: "networkidle" });
await page.waitForSelector("text=To Do", { timeout: 15000 });
await page.screenshot({ path: path.join(shotDir, "board-1-initial.png") });

// Representative interaction 1: hover the primary action (New task) to show
// the accent color transition (the only place --color-accent is visibly used
// beyond the focus ring, as of the "Lamp Gold" colorize pass).
const newTaskBtn = page.locator("button:has-text('New task')").first();
await newTaskBtn.hover();
await page.waitForTimeout(300); // let the 150ms color transition settle
await page.screenshot({ path: path.join(shotDir, "board-2-newtask-hover.png") });

// Representative interaction 2: open a column's "..." menu (Edit/Delete),
// exercising the dropdown surface, its shadow, and open/close motion.
await page.locator("[class*='menu-button']").first().click();
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(shotDir, "board-3-menu-open.png") });

console.log("CONSOLE_ERRORS:", JSON.stringify(consoleErrors));
console.log("SCREENSHOTS:", shotDir);

await browser.close();

if (consoleErrors.length > 0) {
  console.error("Console errors were thrown during the run — investigate before declaring success.");
  process.exit(1);
}
