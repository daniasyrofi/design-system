import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:6006", { waitUntil: "networkidle" });
  
  // click the sun/moon button (in the toolbar)
  // the button is usually [title="Change theme to dark"] or similar.
  // let's just get localStorage keys
  const storage = await page.evaluate(() => JSON.stringify(window.localStorage));
  console.log("LocalStorage:", storage);

  // let's click the theme toggle
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(b => b.title || b.textContent);
  });
  console.log("Buttons:", buttons);

  await browser.close();
})();
