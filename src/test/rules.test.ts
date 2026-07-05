import { describe, it, expect } from 'vitest';
import { validateBuild, getConflicts, getTrimRecovery } from '../features/rules';
import type { Build } from '../types/config';

const validBuild: Build = {
  carId: 'falcon-x',
  trimId: 'falcon-x-standard',
  colorId: 'midnight-black',
  wheelId: 'w-17-alloy',
  interiorId: 'int-black-leather',
  packageIds: [],
};

describe('validateBuild', () => {
  it('returns the build unchanged when fully valid', () => {
    expect(validateBuild(validBuild)).toEqual(validBuild);
  });

  it('drops a color not available on the trim', () => {
    const result = validateBuild({ ...validBuild, colorId: 'aurora-gold' });
    expect(result.colorId).toBe('midnight-black');
  });

  it('drops a wheel not available on the trim', () => {
    const result = validateBuild({ ...validBuild, wheelId: 'w-20-elite' });
    expect(result.wheelId).toBe('w-17-alloy');
  });

  it('drops an interior not available on the trim', () => {
    const result = validateBuild({ ...validBuild, interiorId: 'int-dark-alcantara' });
    expect(result.interiorId).toBe('int-black-leather');
  });

  it('drops a package not available on the trim', () => {
    const result = validateBuild({ ...validBuild, packageIds: ['pkg-performance'] });
    expect(result.packageIds).not.toContain('pkg-performance');
  });

  it('falls back to first trim if trimId is invalid', () => {
    const result = validateBuild({ ...validBuild, trimId: 'does-not-exist' });
    expect(result.trimId).toBe('falcon-x-standard');
  });

  it('keeps valid packages when trim changes to one that still supports them', () => {
    const build: Build = {
      ...validBuild,
      trimId: 'falcon-x-sport',
      wheelId: 'w-18-sport',
      packageIds: ['pkg-comfort'],
    };
    const result = validateBuild(build);
    expect(result.packageIds).toContain('pkg-comfort');
  });
});

describe('getConflicts', () => {
  it('returns conflicting package ids', () => {
    const conflicts = getConflicts('pkg-performance', ['pkg-comfort', 'pkg-safety']);
    expect(conflicts).toContain('pkg-comfort');
    expect(conflicts).not.toContain('pkg-safety');
  });

  it('returns empty array when no conflicts', () => {
    expect(getConflicts('pkg-comfort', ['pkg-safety'])).toEqual([]);
  });

  it('returns empty array for unknown package id', () => {
    expect(getConflicts('pkg-unknown', ['pkg-comfort'])).toEqual([]);
  });
});

describe('getTrimRecovery', () => {
  it('returns empty array when all selections are valid on the new trim', () => {
    // sport trim has the same defaults as standard for these options
    const build: Build = {
      carId: 'falcon-x',
      trimId: 'falcon-x-standard',
      colorId: 'midnight-black',
      wheelId: 'w-18-sport',
      interiorId: 'int-black-leather',
      packageIds: [],
    };
    expect(getTrimRecovery(build, 'falcon-x-sport')).toHaveLength(0);
  });

  it('reports wheel change when downgrading from elite to standard', () => {
    const build: Build = {
      carId: 'falcon-x',
      trimId: 'falcon-x-elite',
      colorId: 'midnight-black',
      wheelId: 'w-20-elite',
      interiorId: 'int-black-leather',
      packageIds: [],
    };
    const changes = getTrimRecovery(build, 'falcon-x-standard');
    expect(changes.some((c) => c.field === 'wheel')).toBe(true);
    expect(changes.find((c) => c.field === 'wheel')?.message).toMatch(/20.*Elite/i);
  });

  it('reports color change when downgrading and color is not available', () => {
    const build: Build = {
      carId: 'falcon-x',
      trimId: 'falcon-x-elite',
      colorId: 'aurora-gold',
      wheelId: 'w-19-performance',
      interiorId: 'int-black-leather',
      packageIds: [],
    };
    const changes = getTrimRecovery(build, 'falcon-x-standard');
    expect(changes.some((c) => c.field === 'color')).toBe(true);
  });

  it('reports interior change when alcantara is not on standard trim', () => {
    const build: Build = {
      carId: 'falcon-x',
      trimId: 'falcon-x-sport',
      colorId: 'midnight-black',
      wheelId: 'w-18-sport',
      interiorId: 'int-dark-alcantara',
      packageIds: [],
    };
    const changes = getTrimRecovery(build, 'falcon-x-standard');
    expect(changes.some((c) => c.field === 'interior')).toBe(true);
    expect(changes.find((c) => c.field === 'interior')?.message).toMatch(/Alcantara/i);
  });

  it('reports dropped packages when downgrading trim', () => {
    const build: Build = {
      carId: 'falcon-x',
      trimId: 'falcon-x-elite',
      colorId: 'midnight-black',
      wheelId: 'w-19-performance',
      interiorId: 'int-black-leather',
      packageIds: ['pkg-performance'],
    };
    const changes = getTrimRecovery(build, 'falcon-x-standard');
    const pkgChange = changes.find((c) => c.field === 'packages');
    expect(pkgChange).toBeDefined();
    expect(pkgChange?.message).toMatch(/Performance Pack/i);
  });

  it('reports multiple changes at once', () => {
    const build: Build = {
      carId: 'falcon-x',
      trimId: 'falcon-x-elite',
      colorId: 'aurora-gold',
      wheelId: 'w-20-elite',
      interiorId: 'int-dark-alcantara',
      packageIds: ['pkg-performance'],
    };
    const changes = getTrimRecovery(build, 'falcon-x-standard');
    const fields = changes.map((c) => c.field);
    expect(fields).toContain('color');
    expect(fields).toContain('wheel');
    expect(fields).toContain('interior');
    expect(fields).toContain('packages');
  });
});

describe('validateBuild — Aureon S (second car, same pure function)', () => {
  const validAureonBuild: Build = {
    carId: 'aureon-s',
    trimId: 'aureon-s-elegance',
    colorId: 'midnight-black',
    wheelId: 'w-18-serenity',
    interiorId: 'int-cognac-nappa',
    packageIds: [],
  };

  it('returns the build unchanged when fully valid', () => {
    expect(validateBuild(validAureonBuild)).toEqual(validAureonBuild);
  });

  it('drops a color not available on the Elegance trim', () => {
    const result = validateBuild({ ...validAureonBuild, colorId: 'burgundy-wine' });
    expect(result.colorId).toBe('midnight-black');
  });

  it('drops a wheel not available on the Elegance trim', () => {
    const result = validateBuild({ ...validAureonBuild, wheelId: 'w-20-sovereign' });
    expect(result.wheelId).toBe('w-18-serenity');
  });

  it('drops a package not available on the Elegance trim', () => {
    const result = validateBuild({ ...validAureonBuild, packageIds: ['pkg-chauffeur'] });
    expect(result.packageIds).not.toContain('pkg-chauffeur');
  });

  it('falls back to first trim if trimId is invalid', () => {
    const result = validateBuild({ ...validAureonBuild, trimId: 'does-not-exist' });
    expect(result.trimId).toBe('aureon-s-elegance');
  });
});

describe('getTrimRecovery — Aureon S (second car, same pure function)', () => {
  it('reports dropped package when downgrading from Signature to Elegance', () => {
    const build: Build = {
      carId: 'aureon-s',
      trimId: 'aureon-s-signature',
      colorId: 'burgundy-wine',
      wheelId: 'w-20-sovereign',
      interiorId: 'int-executive-wood',
      packageIds: ['pkg-chauffeur'],
    };
    const changes = getTrimRecovery(build, 'aureon-s-elegance');
    const fields = changes.map((c) => c.field);
    expect(fields).toContain('color');
    expect(fields).toContain('wheel');
    expect(fields).toContain('interior');
    expect(fields).toContain('packages');
    expect(changes.find((c) => c.field === 'packages')?.message).toMatch(/Chauffeur Pack/i);
  });
});
