import { test, expect, selectors } from "@playwright/test";

test("homepage has correct title, url", async ({ page }) => {
    await page.goto("/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Home/);

    await expect(page).toHaveURL(/.*home/); // Expects the URL to contain intro.
});

test("homepage has links to homepage", async ({ page }) => {
    await page.goto("/");

    const homeButton = page.getByRole("link", { name: "Home" }); // create a locator
    await expect(homeButton).toHaveAttribute("href", "/home"); // Expect an attribute "to be strictly equal" to the value.
    await homeButton.click(); // Click the get started link.
    await expect(page).toHaveURL(/.*home/); // Expects the URL to contain intro.
});

test("homepage has links to shop", async ({ page }) => {
  await page.goto("/");

  const shopButton = page.getByRole("link", { name: "Shop" });
  await expect(shopButton).toHaveAttribute("href", "/shop");
  await shopButton.click();
  await expect(page).toHaveURL(/.*shop/);
});

test("homepage has links to profile", async ({ page }) => {
  await page.goto("/");

  const profileButton = page.getByRole("link", { name: "Profile" });
  await expect(profileButton).toHaveAttribute("href", "/profile");
  await profileButton.click(); 
  await expect(page).toHaveURL(/.*profile/);
});

test("homepage challenge card links to challenge", async ({ page }) => {
  await page.goto("/");

  const challengeCard = page.getByRole("link", { name: /Challenge/ });
  await expect(challengeCard).toHaveAttribute("href", /.*challenge\?id=.*/);
  await challengeCard.click(); 
  await expect(page).toHaveURL(/.*challenge\?id=.*/);
});

test("homepage task item name links to tasks tab in challenge", async ({ page }) => {
  await page.goto("/");

  const taskName = page.getByRole("link", { name: /Task/ });
  await expect(taskName).toHaveAttribute("href", /.*challenge\?id=.*&tab=tasks.*/);
  await taskName.click(); 
  await expect(page).toHaveURL(/.*challenge\?id=.*&tab=tasks.*/);
});
