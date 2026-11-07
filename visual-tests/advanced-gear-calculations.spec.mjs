import { test, expect } from '@playwright/test';

// Fixed input/output scenarios based on the current published calculator tables.
// These are regression checks, not independent verification of game balance.
const gearKey = 'sova58-essence-mithril-calculator-v1';
const xpKey = 'sova58-gear-xp-v2';

async function openWithScenario(page, gear, xp) {
  await page.addInitScript(({ gear, xp, gearKey, xpKey }) => {
    localStorage.removeItem(gearKey);
    localStorage.removeItem(xpKey);
    if (gear) localStorage.setItem(gearKey, JSON.stringify(gear));
    if (xp) localStorage.setItem(xpKey, JSON.stringify(xp));
  }, { gear, xp, gearKey, xpKey });
  const response = await page.goto('/essence-mithril-calculator.html', { waitUntil: 'domcontentloaded' });
  expect(response?.status()).toBe(200);
  await expect(page.locator('#ecNeedEssence')).toBeVisible();
}
function item(masterFrom, masterTo, redFrom = -1, redTo = -1, qty = 1) {
  return {
    gear: 'inf-gloves', qty, masteryFrom: masterFrom,
    masteryProgress: 0, masteryTo: masterTo,
    mithrilFrom: redFrom, mithrilTo: redTo,
  };
}
function gear(items, firstGateMythic = 3) {
  return { items, firstGateMythic, stock: { essence: 0, mithril: 0, mythic: 0 } };
}

test.describe('Ковка 10–20 и красное снаряжение', () => {
  test('Ковка 10→11: 110 камней и 1 мифический предмет', async ({ page }) => {
    await openWithScenario(page, gear([item(10, 11)]));
    await expect(page.locator('#ecNeedEssence')).toHaveText('110');
    await expect(page.locator('#ecNeedMithril')).toHaveText('0');
    await expect(page.locator('#ecNeedMythic')).toHaveText('1');
  });

  test('Ковка 19→20: 200 камней и 10 мифических предметов', async ({ page }) => {
    await openWithScenario(page, gear([item(19, 20)]));
    await expect(page.locator('#ecNeedEssence')).toHaveText('200');
    await expect(page.locator('#ecNeedMythic')).toHaveText('10');
  });

  test('Красное +0→+20 требует ковку 11 и первый набор материалов', async ({ page }) => {
    await openWithScenario(page, gear([item(10, 10, 0, 20)]));
    await expect(page.locator('#ecNeedEssence')).toHaveText('110');
    await expect(page.locator('#ecNeedMithril')).toHaveText('10');
    await expect(page.locator('#ecNeedMythic')).toHaveText('4');
    await page.locator('#ecMithrilAdvanced summary').click();
    await page.locator('#ecFirstGateMythic').selectOption('5');
    await expect(page.locator('#ecNeedMythic')).toHaveText('6');
    await expect(page.locator('#ecNeedMithril')).toHaveText('10');
  });

  test('Два предмета удваивают потребность, а большие запасы уменьшают дефицит', async ({ page }) => {
    await openWithScenario(page, gear([item(10, 11, -1, -1, 2)]));
    await expect(page.locator('#ecNeedEssence')).toHaveText('220');
    await expect(page.locator('#ecNeedMythic')).toHaveText('2');
    await page.locator('#ecStockEssence').fill('200');
    await expect(page.locator('#ecLeftEssence')).toContainText('Не хватает: 20');
  });
});

test.describe('Опыт улучшения', () => {
  test('Усиление золотого 0→1 требует 10 опыта, корм учитывается в запасах', async ({ page }) => {
    await openWithScenario(page, null, {
      quantity: 1, stock: 0, feed: { common: 2 }, goldFrom: 0, goldTo: 1,
      redEnabled: false, redFrom: 1, redTo: 1,
    });
    await page.locator('#ecExperienceAdvanced summary').click();
    await expect(page.locator('#ecXpGoldNeed')).toHaveText('10');
    await expect(page.locator('#ecXpRedNeed')).toHaveText('0');
    await expect(page.locator('#ecXpFeedTotal')).toHaveText('20');
    await expect(page.locator('#ecXpTotalNeed')).toHaveText('10');
    await expect(page.locator('#ecXpSurplus')).toHaveText('10');
  });

  test('Два золотых предмета 0→2 требуют 50 опыта', async ({ page }) => {
    // Level 1 costs 10, level 2 costs 15: 25 per item, 50 total.
    await openWithScenario(page, null, {
      quantity: 2, stock: 0, feed: {}, goldFrom: 0, goldTo: 2,
      redEnabled: false, redFrom: 1, redTo: 1,
    });
    await page.locator('#ecExperienceAdvanced summary').click();
    await expect(page.locator('#ecXpGoldNeed')).toHaveText('50');
    await expect(page.locator('#ecXpTotalNeed')).toHaveText('50');
    await expect(page.locator('#ecXpMissing')).toHaveText('50');
  });
});
