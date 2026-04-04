import { test, expect } from '@playwright/test';

test.describe('Community Tests', () => {
  test('should navigate to community and click on MCP & Agent Videos', async ({ page }) => {
    await page.goto('https://playwright.dev/community/welcome');
    
    // Click on MCP & Agent Videos link
    await page.click('text=MCP & Agent Videos');
    
    // Verify navigation or page content
    await expect(page).toHaveURL(/.*mcp-videos/i);
  });
});
