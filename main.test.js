const { test, expect } = require("@playwright/test");

test("Fill and submit credit card form", async ({ page }) => {
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

  let resolveInterceptorPromise;
  const interceptorPromise = new Promise((resolve) => {
    resolveInterceptorPromise = resolve;
  });

  await page.goto("http://localhost:8000/");

  const frames = await page.frames();

  await page.exposeFunction("webkitInterceptor", (name, data) => {
    if (data?.[0].type == "capture-credit-card-form") {
      resolveInterceptorPromise({ name, data });
    }
  });

  for (let frame of frames) {
    await frame.addScriptTag({ path: "webkit-message-handler-object.js" });
    await frame.addScriptTag({ path: "ios-bundle.js" });
  }

  const creditCard = {
    "cc-number": "4242424242424242",
    "cc-exp": "12/24",
    "cc-name": "John Doe",
    "cc-exp-month": "12",
    "cc-exp-year": "2024",
    "cc-type": "visa",
  };

  await page.focus('input[autocomplete="cc-name"]');
  await page.fill('input[autocomplete="cc-name"]', creditCard["cc-name"]);

  await page.focus('input[autocomplete="cc-number"]');
  await page.fill('input[autocomplete="cc-number"]', creditCard["cc-number"]);

  await page.focus('input[autocomplete="cc-exp"]');
  await page.fill('input[autocomplete="cc-exp"]', creditCard["cc-exp"]);

  await page.click('input[type="submit"]');

  const interceptedData = await interceptorPromise;

  expect(interceptedData).not.toBeNull();
  expect(interceptedData.name).toBe("creditCardMessageHandler");
  expect(interceptedData.data?.[0].type).toBe("capture-credit-card-form");
  expect(creditCard).toMatchObject(interceptedData.data?.[0].payload);
});
