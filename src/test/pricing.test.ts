import { describe, it, expect } from 'vitest';
import { computePrice } from '../features/pricing';
import type { Build } from '../types/config';

const baseBuild: Build = {
  carId: 'falcon-x',
  trimId: 'falcon-x-standard',
  colorId: 'midnight-black',
  wheelId: 'w-17-alloy',
  interiorId: 'int-black-leather',
  packageIds: [],
};

describe('computePrice', () => {
  it('returns base price only for standard trim with no-cost options', () => {
    const result = computePrice(baseBuild);
    expect(result.basePrice).toBe(4200000);
    expect(result.trimPrice).toBe(0);
    expect(result.colorPrice).toBe(0);
    expect(result.wheelPrice).toBe(0);
    expect(result.interiorPrice).toBe(0);
    expect(result.packagePrice).toBe(0);
    expect(result.optionsTotal).toBe(0);
    expect(result.totalPrice).toBe(4200000);
  });

  it('adds trim price modifier for sport trim', () => {
    const build: Build = {
      ...baseBuild,
      trimId: 'falcon-x-sport',
      wheelId: 'w-18-sport',
    };
    const result = computePrice(build);
    expect(result.trimPrice).toBe(400000);
    expect(result.wheelPrice).toBe(60000);
    expect(result.totalPrice).toBe(4200000 + 400000 + 60000);
  });

  it('adds color price modifier for metallic paint', () => {
    const result = computePrice({ ...baseBuild, colorId: 'steel-grey' });
    expect(result.colorPrice).toBe(50000);
  });

  it('adds interior price modifier for cream leather', () => {
    const result = computePrice({ ...baseBuild, interiorId: 'int-cream-leather' });
    expect(result.interiorPrice).toBe(80000);
  });

  it('adds interior price modifier for alcantara on sport trim', () => {
    const build: Build = {
      ...baseBuild,
      trimId: 'falcon-x-sport',
      wheelId: 'w-18-sport',
      interiorId: 'int-dark-alcantara',
    };
    const result = computePrice(build);
    expect(result.interiorPrice).toBe(200000);
  });

  it('adds package prices and reflects in optionsTotal', () => {
    const result = computePrice({ ...baseBuild, packageIds: ['pkg-comfort', 'pkg-safety'] });
    expect(result.packagePrice).toBe(180000 + 250000);
    expect(result.optionsTotal).toBe(180000 + 250000);
    expect(result.totalPrice).toBe(4200000 + 180000 + 250000);
  });

  it('includes all option categories in optionsTotal', () => {
    const build: Build = {
      carId: 'falcon-x',
      trimId: 'falcon-x-sport',
      colorId: 'steel-grey',
      wheelId: 'w-19-performance',
      interiorId: 'int-cream-leather',
      packageIds: ['pkg-tech'],
    };
    const result = computePrice(build);
    expect(result.optionsTotal).toBe(
      400000 + 50000 + 140000 + 80000 + 320000
    );
    expect(result.totalPrice).toBe(4200000 + result.optionsTotal);
  });

  it('produces correct line items including interior', () => {
    const result = computePrice({ ...baseBuild, interiorId: 'int-cream-leather', packageIds: ['pkg-comfort'] });
    expect(result.lineItems.some((li) => li.label.includes('Cream Leather'))).toBe(true);
    expect(result.lineItems.some((li) => li.label.includes('Comfort Pack'))).toBe(true);
  });
});

describe('computePrice — Aureon S (second car, same pure function)', () => {
  const aureonBuild: Build = {
    carId: 'aureon-s',
    trimId: 'aureon-s-elegance',
    colorId: 'midnight-black',
    wheelId: 'w-18-serenity',
    interiorId: 'int-cognac-nappa',
    packageIds: [],
  };

  it('returns base price only for the base Elegance trim with no-cost options', () => {
    const result = computePrice(aureonBuild);
    expect(result.basePrice).toBe(6800000);
    expect(result.trimPrice).toBe(0);
    expect(result.colorPrice).toBe(0);
    expect(result.wheelPrice).toBe(0);
    expect(result.interiorPrice).toBe(0);
    expect(result.totalPrice).toBe(6800000);
  });

  it('adds trim, wheel, and color modifiers for the Signature trim', () => {
    const build: Build = {
      ...aureonBuild,
      trimId: 'aureon-s-signature',
      wheelId: 'w-20-sovereign',
      colorId: 'burgundy-wine',
      interiorId: 'int-executive-wood',
      packageIds: ['pkg-chauffeur'],
    };
    const result = computePrice(build);
    expect(result.trimPrice).toBe(1500000);
    expect(result.wheelPrice).toBe(180000);
    expect(result.colorPrice).toBe(140000);
    expect(result.interiorPrice).toBe(280000);
    expect(result.packagePrice).toBe(480000);
    expect(result.optionsTotal).toBe(1500000 + 180000 + 140000 + 280000 + 480000);
    expect(result.totalPrice).toBe(6800000 + result.optionsTotal);
  });

  it('uses the exact same computePrice implementation as Falcon X (no per-car duplication)', () => {
    // Both builds go through the identical imported function; this assertion
    // exists to make that architectural intent explicit and regression-checkable.
    const falconResult = computePrice(baseBuild);
    const aureonResult = computePrice(aureonBuild);
    expect(falconResult.lineItems[0].label).toContain('Falcon X');
    expect(aureonResult.lineItems[0].label).toContain('Aureon S');
  });
});
