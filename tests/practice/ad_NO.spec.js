//@ts-check semantic checks in JS
import {test, expect} from "@playwright/test";
import { count } from "node:console";
import { chromium  } from "playwright";

test('ADD handling script',(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false }); // Set to true for headless mode
  const page = await browser.newPage();

  // Navigate to your target webpage
  await page.goto('https://example.com'); // Replace with your URL

  // Handle native browser dialogs (e.g., alerts/confirm prompts that might be ad-related)
  page.on('dialog', async dialog => {
    console.log('Dialog detected:', dialog.message());
    // Accept or dismiss based on your preference
    await dialog.accept(); // Or dialog.dismiss() to reject
  });

  // Function to check for and handle modals
  const handleModal = async () => {
    try {
      // Common selectors for modals (adjust based on observed patterns if possible)
      const modalSelectors = [
        '[class*="modal"]', // Elements with "modal" in class
        '[id*="modal"]',    // Elements with "modal" in ID
        '.overlay',         // Common overlay class
        '.popup',           // Common popup class
        '[role="dialog"]'   // ARIA role for dialogs
      ];

      // Check for any modal presence
      for (const selector of modalSelectors) {
        const modal = await page.locator(selector).first(); // Get the first matching element
        if (await modal.isVisible()) {
          console.log(`Modal detected with selector: ${selector}`);

          // Try to find and click a dismiss/close button
          const dismissSelectors = [
            'button[class*="close"]', // Close button
            'button[class*="dismiss"]',
            '[aria-label*="close"]', // ARIA labels
            '.close',                // Common close class
            'button:contains("Close")', // Text-based (case-insensitive)
            'button:contains("Dismiss")',
            'button:contains("X")'
          ];

          for (const dismissSel of dismissSelectors) {
            const dismissBtn = modal.locator(dismissSel).first();
            if (await dismissBtn.isVisible()) {
              await dismissBtn.click();
              console.log('Modal dismissed via close button.');
              return; // Exit after handling
            }
          }

          // If no dismiss button, try to accept (e.g., for consent modals)
          const acceptSelectors = [
            'button[class*="accept"]',
            'button[class*="agree"]',
            'button:contains("Accept")',
            'button:contains("Agree")',
            'button:contains("OK")'
          ];

          for (const acceptSel of acceptSelectors) {
            const acceptBtn = modal.locator(acceptSel).first();
            if (await acceptBtn.isVisible()) {
              await acceptBtn.click();
              console.log('Modal accepted via accept button.');
              return; // Exit after handling
            }
          }

          // Fallback: Click outside the modal or on the overlay to dismiss
          await page.mouse.click(10, 10); // Click top-left corner (adjust if needed)
          console.log('Attempted to dismiss modal by clicking outside.');
          return;
        }
      }
    } catch (error) {
      console.log('Error handling modal:', error.message);
    }
  };

  // Poll for modals every 2 seconds (adjust interval as needed)
  const pollInterval = setInterval(handleModal, 2000);

  // Let the page run for a while (e.g., 60 seconds) to catch random modals
  await page.waitForTimeout(60000);

  // Clean up
  clearInterval(pollInterval);
  await browser.close();
}));