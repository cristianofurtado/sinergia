import fs from "node:fs";
import { chromium, defineConfig } from "@playwright/test";

const hasBundledChromium = fs.existsSync(chromium.executablePath());

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://127.0.0.1:3000",
    ...(hasBundledChromium ? {} : { channel: "chrome" }),
  },
  webServer: {
    command: "npm run start -- -H 127.0.0.1 -p 3000",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
