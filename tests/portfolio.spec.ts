import { test, expect } from "@playwright/test";

test("background simulation and branching timeline remain responsive", async ({ page }) => {
  await page.goto("/");
  const canvas = page.locator("canvas.fluid-field");
  await expect(canvas).toHaveCount(1);
  expect(await canvas.evaluate(el => getComputedStyle(el).position)).toBe("fixed");
  const frame = () => canvas.evaluate((el: HTMLCanvasElement) => el.toDataURL());
  const initial = await frame();
  await page.mouse.move(180, 230);
  await expect.poll(frame).not.toBe(initial);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => page.locator(".tl-core .tl-branch").first().evaluate(el => getComputedStyle(el).animationName)).toBe("none");
  await page.waitForTimeout(100);
  const still = await frame();
  await page.waitForTimeout(150);
  expect(await frame()).toBe(still);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect.poll(frame).not.toBe(still);
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator(".timeline-card")).toHaveCount(8);
    await expect.poll(() => page.locator(".timeline-card").evaluateAll(cards => {
      const boxes = cards.map(card => card.getBoundingClientRect());
      return boxes.every((a, i) => a.left >= 0 && a.right <= innerWidth && boxes.slice(i + 1).every(b => a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top));
    })).toBe(true);
    await expect(page.locator(".tl-core .tl-branch")).toHaveCount(8);
    const strands = await page.locator(".tl-core .tl-strand").count();
    expect(strands).toBe(await page.locator(".timeline-stage").evaluate(el => el.clientWidth < 760 ? 9 : 15));
    await expect(page.locator(".tl-halo .tl-strand")).toHaveCount(strands);
  }
});

test("project discovery, disclosure, search and recovery", async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Alexander");
  await expect(page.locator(".project-card")).toHaveCount(10);
  await page.getByRole("button", { name: "Scientific computing", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  const card = page.locator(".project-card").filter({ has: page.getByRole("heading", { name: "EuroHPC Demo Lab" }) });
  if (!isMobile) {
    await card.hover();
    await expect(card.locator(".project-peek")).toBeVisible();
  }
  await card.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#project\/eurohpc-demo-lab$/);
  await expect(page.locator("h1")).toHaveText("EuroHPC Demo Lab");
  await expect(page.getByRole("heading", { name: "MUrB N-body on Leonardo" })).toBeVisible();
  await expect(page.locator(".project-table").first()).toBeVisible();
  await page.getByRole("link", { name: "All projects" }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await page.getByRole("searchbox").fill("matter");
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card h3")).toHaveText("Inhabis");
  await page.getByRole("searchbox").fill("no-matching-project-xyz");
  await expect(page.getByText("No matching projects.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".project-card")).toHaveCount(10);
  expect(errors).toEqual([]);
});

test("project pages load from a direct link and step between projects", async ({ page }) => {
  await page.goto("/#project/inhabis");
  await expect(page.locator("h1")).toHaveText("Inhabis");
  await expect(page.locator(".project-media img").first()).toBeVisible();
  await page.reload();
  await expect(page.locator("h1")).toHaveText("Inhabis");
  await page.getByRole("link", { name: /Next/ }).click();
  await expect(page).toHaveURL(/#project\/orion$/);
  await page.goto("/#project/no-such-project");
  await expect(page.getByText("Project not found.")).toBeVisible();
});

test("hovering a project card agitates the background particles", async ({ page, isMobile }) => {
  test.skip(isMobile, "hover only exists with a pointer");
  await page.goto("/");
  const card = page.locator(".project-card").first();
  await card.scrollIntoViewIfNeeded();
  const box = await card.boundingBox();
  const canvas = page.locator("canvas.fluid-field");
  const frame = () => canvas.evaluate((el: HTMLCanvasElement) => el.toDataURL());
  await page.mouse.move(box!.x + box!.width / 2, box!.y + 40);
  await page.waitForTimeout(500);
  const before = await frame();
  await page.waitForTimeout(400);
  expect(await frame()).not.toBe(before);
  await expect(card.locator(".project-peek")).toBeVisible();
});

test("Inhabis card opens the landing page, skills keep their own colours, timeline lists new work", async ({ page }) => {
  await page.goto("/");
  const inhabis = page.locator(".project-card").first();
  await expect(inhabis.getByRole("heading", { name: "Inhabis" })).toBeVisible();
  await expect(inhabis).toHaveAttribute("href", "https://inhabis.ie");
  await expect(inhabis).toHaveAttribute("target", "_blank");
  const distinct = await page.locator(".skill-pill").evaluateAll((els) => new Set(els.map((el) => (el as HTMLElement).style.getPropertyValue("--skill"))).size);
  expect(distinct).toBeGreaterThan(30);
  await expect(page.locator(".timeline-card h3", { hasText: "Co-founder and Engineer" })).toHaveCount(1);
  await expect(page.locator(".timeline-card h3", { hasText: "EuroHPC Student Ambassador" })).toHaveCount(1);
  const covers = await page.locator(".project-cover img, .project-cover video").count();
  expect(covers).toBeGreaterThanOrEqual(9);
});

test("hovering a video card plays its clip", async ({ page, isMobile }) => {
  test.skip(isMobile, "hover only exists with a pointer");
  await page.goto("/");
  const card = page.locator(".project-card").filter({ has: page.getByRole("heading", { name: "EuroHPC Demo Lab" }) });
  await card.scrollIntoViewIfNeeded();
  await card.hover();
  await expect.poll(() => card.locator("video").evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);
  await page.mouse.move(2, 2);
  await expect.poll(() => card.locator("video").evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
});

test("thesis links survive refresh, navigation and browser history", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Thesis", exact: true }).first().click();
  await expect(page).toHaveURL(/#thesis-overview$/);
  await page.getByRole("link", { name: "Technical", exact: true }).click();
  await page.reload();
  await expect(page.locator("h1")).toHaveText("Locally Thermal from Global Athermality");
  await expect(page.locator("#thesis-technical")).toBeInViewport();
  await page.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page).toHaveURL(/#thesis-contact$/);
  await expect(page.locator("#thesis-contact")).toBeInViewport();
  await page.getByRole("button", { name: "Portfolio", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(10);
  await page.goBack();
  await expect(page.locator("h1")).toHaveText("Locally Thermal from Global Athermality");
  await page.getByRole("link", { name: "Skip to content" }).focus();
  await page.keyboard.press("Enter");
  await page.reload();
  await expect(page.locator("h1")).toHaveText("Locally Thermal from Global Athermality");
});

test("local assets, compact layouts and reduced motion", async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const docs = await page.locator('a[href^="/documents/"]').evaluateAll(links => [...new Set(links.map(a => a.getAttribute("href")!))]);
  for (const href of docs) {
    const response = await request.get(href);
    expect(response.ok()).toBeTruthy();
    expect((await response.body()).subarray(0, 4).toString()).toBe("%PDF");
  }
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    const hero = await page.locator(".hero-content").boundingBox();
    expect(hero!.x).toBeLessThan(width / 2);
  }
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  await page.goto("/#thesis-explainer");
  await page.setViewportSize({ width: 320, height: 900 });
  const headerBounds = await page.locator("header").boundingBox();
  for (const link of await page.locator(".nav-links a").all()) {
    const bounds = await link.boundingBox();
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(headerBounds!.x + headerBounds!.width);
  }
  const images = page.locator(".story-image-wrap img");
  for (const img of await images.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toBeVisible();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy();
  }
});
