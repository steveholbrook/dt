import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  webServer:{ command:'npx http-server -p 8080 -c-1 .', port:8080, reuseExistingServer:!process.env.CI },
  use:{ headless:true, baseURL:'http://localhost:8080' }
});