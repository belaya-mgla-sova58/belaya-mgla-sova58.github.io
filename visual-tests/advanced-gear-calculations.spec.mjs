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

// Independent whole-level reference table: costs for completing the NEXT
// mastery level, not just its final sub-stage. This guards against confusing
// 19.4→20 (last sub-stage) with 19→20 (all five sub-stages).
// Gate costs below are regression fixtures from the existing calculator.
// The mastery level is already sufficient in the first scenario, so these
// numbers isolate mithril/mythic upgrades from forging materials.
test.describe('Красное снаряжение: этапы +20…+100', () => {
  const gates = [
    { from: 0, to: 20, mastery: 11, mithril: 10, mythic: 3 },
    { from: 20, to: 40, mastery: 12, mithril: 20, mythic: 5 },
    { from: 40, to: 60, mastery: 13, mithril: 30, mythic: 5 },
    { from: 60, to: 80, mastery: 14, mithril: 40, mythic: 10 },
    { from: 80, to: 100, mastery: 15, mithril: 50, mythic: 10 },
  ];

  for (const g of gates) {
    test(`Красное +${g.from}→+${g.to}: самостоятельный этап`, async ({ page }) => {
      await openWithScenario(page, gear([item(g.mastery, g.mastery, g.from, g.to)]));
      await expect(page.locator('#ecNeedEssence')).toHaveText('0');
      await expect(page.locator('#ecNeedMithril')).toHaveText(String(g.mithril));
      await expect(page.locator('#ecNeedMythic')).toHaveText(String(g.mythic));
    });
  }

  test('Красное +0→+100: все пять этапов суммируются без повторов', async ({ page }) => {
    await openWithScenario(page, gear([item(15, 15, 0, 100)]));
    await expect(page.locator('#ecNeedEssence')).toHaveText('0');
    await expect(page.locator('#ecNeedMithril')).toHaveText('150');
    await expect(page.locator('#ecNeedMythic')).toHaveText('33');
  });

  test('Переход из мифического в красное +100 включает ещё 2 предмета', async ({ page }) => {
    // 33 for five empowerment gates, plus 2 to turn mythic into legendary.
    await openWithScenario(page, gear([item(15, 15, -1, 100)]));
    await expect(page.locator('#ecNeedEssence')).toHaveText('0');
    await expect(page.locator('#ecNeedMithril')).toHaveText('150');
    await expect(page.locator('#ecNeedMythic')).toHaveText('35');
  });

  test('Красное +40→+100: не начисляем повторно +20 и +40', async ({ page }) => {
    await openWithScenario(page, gear([item(15, 15, 40, 100)]));
    await expect(page.locator('#ecNeedEssence')).toHaveText('0');
    await expect(page.locator('#ecNeedMithril')).toHaveText('120');
    await expect(page.locator('#ecNeedMythic')).toHaveText('25');
  });

  test('Красное +20→+40: при нехватке ковки добавляется необходимый уровень', async ({ page }) => {
    await openWithScenario(page, gear([item(11, 11, 20, 40)]));
    await expect(page.locator('#ecNeedEssence')).toHaveText('120');
    await expect(page.locator('#ecNeedMithril')).toHaveText('20');
    await expect(page.locator('#ecNeedMythic')).toHaveText('7');
  });

  test('Первое укрепление +20: вариант 5 вместо 3 и два предмета', async ({ page }) => {
    await openWithScenario(page, gear([item(11, 11, 0, 20, 2)], 5));
    await expect(page.locator('#ecNeedEssence')).toHaveText('0');
    await expect(page.locator('#ecNeedMithril')).toHaveText('20');
    await expect(page.locator('#ecNeedMythic')).toHaveText('10');
  });

  test('Запас мифрила и мифических предметов уменьшает дефицит отдельно', async ({ page }) => {
    await openWithScenario(page, gear([item(15, 15, 40, 100)]));
    await page.locator('#ecStockMithril').fill('100');
    await page.locator('#ecStockMythic').fill('30');
    await expect(page.locator('#ecNeedMithril')).toHaveText('120');
    await expect(page.locator('#ecLeftMithril')).toContainText('Не хватает: 20');
    await expect(page.locator('#ecNeedMythic')).toHaveText('25');
    await expect(page.locator('#ecLeftMythic')).toContainText('останется: 5');
  });
});

test.describe('Ковка 1–20: полные уровни', () => {
  const levelCosts = [
    [10,0],[20,0],[30,0],[40,0],[50,0],
    [60,0],[70,0],[80,0],[90,0],[100,0],
    [110,1],[120,2],[130,3],[140,4],[150,5],
    [160,6],[170,7],[180,8],[190,9],[200,10],
  ];
  for (let from = 0; from < levelCosts.length; from++) {
    const [essence, mythic] = levelCosts[from];
    test(`Ковка ${from}→${from + 1}: ${essence} камней, ${mythic} мифических`, async ({ page }) => {
      await openWithScenario(page, gear([item(from, from + 1)]));
      await expect(page.locator('#ecNeedEssence')).toHaveText(String(essence));
      await expect(page.locator('#ecNeedMythic')).toHaveText(String(mythic));
      await expect(page.locator('#ecNeedMithril')).toHaveText('0');
    });
  }
});

test.describe('Промежуточные шаги ковки', () => {
  test('Ковка 10.2→11: не считаем два уже оплаченных шага', async ({ page }) => {
    const partial = { ...item(10, 11), masteryProgress: 2 };
    await openWithScenario(page, gear([partial]));
    // 10→11: 5 шагов по 22 камня. После двух выполненных остаётся 3 × 22.
    await expect(page.locator('#ecNeedEssence')).toHaveText('66');
    await expect(page.locator('#ecNeedMythic')).toHaveText('1');
  });

  test('Ковка 14.3→15: учитываются только последний этап и завершение', async ({ page }) => {
    await openWithScenario(page, gear([{ ...item(14, 15), masteryProgress: 3 }]));
    // Два оставшихся шага по 30 камней, по 1 мифическому за каждый.
    await expect(page.locator('#ecNeedEssence')).toHaveText('60');
    await expect(page.locator('#ecNeedMythic')).toHaveText('2');
  });

  test('Ковка 19.4→20: только завершающий шаг', async ({ page }) => {
    await openWithScenario(page, gear([{ ...item(19, 20), masteryProgress: 4 }]));
    await expect(page.locator('#ecNeedEssence')).toHaveText('40');
    await expect(page.locator('#ecNeedMythic')).toHaveText('2');
  });

  test('Ковка 10.2→11: запасы не вычитаются дважды', async ({ page }) => {
    await openWithScenario(page, gear([{ ...item(10, 11), masteryProgress: 2 }]));
    await page.locator('#ecStockEssence').fill('50');
    await expect(page.locator('#ecNeedEssence')).toHaveText('66');
    await expect(page.locator('#ecLeftEssence')).toContainText('Не хватает: 16');
  });
});

test.describe('Опыт улучшения', () => {
  test('Усиление золотого 0→1 требует 10 опыта, корм учитывается в запасах', async ({ page }) => {
    await openWithScenario(page, null, {
      quantity: 1, stock: 0, feed: { common: 2 }, goldFrom: 0, goldTo: 1,
      redEnabled: false, redFrom: 1, redTo: 1,
    });
    await page.locator('#ecExperienceAdvanced > summary').click();
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
    await page.locator('#ecExperienceAdvanced > summary').click();
    await expect(page.locator('#ecXpGoldNeed')).toHaveText('50');
    await expect(page.locator('#ecXpTotalNeed')).toHaveText('50');
    await expect(page.locator('#ecXpMissing')).toHaveText('50');
  });
});
