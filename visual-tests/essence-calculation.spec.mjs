import { test, expect } from '@playwright/test';

// Controlled numeric regression tests based on the calculator's published
// mastery-cost table. Runs locally, no real player data is touched.
test.describe('Эссенция и мифрил: контроль расчётов', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('sova58-essence-mithril-calculator-v1');
    });
    const response = await page.goto('/essence-mithril-calculator.html', {
      waitUntil: 'domcontentloaded',
    });
    expect(response?.status()).toBe(200);
    await expect(page.locator('#ecNeedEssence')).toBeVisible();
  });

  test('Ковка 0→1 требует 10 камней, 0→2 требует 30', async ({ page }) => {
    const current = page.locator('#ecItems [data-index="0"] [data-field="masteryFrom"]');
    const target = page.locator('#ecItems [data-index="0"] [data-field="masteryTo"]');
    await expect(current).toHaveValue('0');
    await expect(page.locator('#ecNeedEssence')).toHaveText('0');
    await target.selectOption('1');
    await expect(page.locator('#ecNeedEssence')).toHaveText('10');
    await target.selectOption('2');
    await expect(page.locator('#ecNeedEssence')).toHaveText('30');
    await expect(page.locator('#ecNeedMithril')).toHaveText('0');
    await expect(page.locator('#ecNeedMythic')).toHaveText('0');
  });

  test('Запасы меняют дефицит, но не стоимость улучшения', async ({ page }) => {
    await page.locator('#ecItems [data-index="0"] [data-field="masteryTo"]').selectOption('2');
    await expect(page.locator('#ecNeedEssence')).toHaveText('30');
    await expect(page.locator('#ecLeftEssence')).toContainText('Не хватает: 30');

    await page.locator('#ecStockEssence').fill('12');
    await expect(page.locator('#ecNeedEssence')).toHaveText('30');
    await expect(page.locator('#ecLeftEssence')).toContainText('Не хватает: 18');

    await page.locator('#ecStockEssence').fill('35');
    await expect(page.locator('#ecNeedEssence')).toHaveText('30');
    await expect(page.locator('#ecLeftEssence')).toContainText('останется: 5');
  });

  test('Добавление и сброс предметов не оставляет чужие расчёты', async ({ page }) => {
    await page.locator('#ecItems [data-index="0"] [data-field="masteryTo"]').selectOption('1');
    await expect(page.locator('#ecNeedEssence')).toHaveText('10');
    await page.locator('#ecMoreItems summary').click();
    await page.locator('#ecAdd').click();
    await expect(page.locator('#ecItems article.ec-item')).toHaveCount(2);
    await page.locator('#ecItems [data-index="1"] [data-field="masteryTo"]').selectOption('1');
    await expect(page.locator('#ecNeedEssence')).toHaveText('20');

    page.once('dialog', dialog => dialog.accept());
    await page.locator('#ecReset').click();
    await expect(page.locator('#ecItems article.ec-item')).toHaveCount(1);
    await expect(page.locator('#ecNeedEssence')).toHaveText('0');
    await expect(page.locator('#ecStockEssence')).toHaveValue('0');
  });
});
