import { test } from "@playwright/test"

test("capture dashboard screenshot", async ({ page }) => {
    await page.goto("http://localhost:5173")
    await page.screenshot({ path: "docs/screenshots/dashboard.png", fullPage: true })
})
