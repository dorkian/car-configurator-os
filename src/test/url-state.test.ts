import { describe, it, expect } from 'vitest';
import { encodeBuild, decodeBuild } from '../lib/url-state/codec';
import type { Build } from '../types/config';

const build: Build = {
  carId: 'falcon-x',
  trimId: 'falcon-x-sport',
  colorId: 'cobalt-blue',
  wheelId: 'w-19-performance',
  interiorId: 'int-dark-alcantara',
  packageIds: ['pkg-tech', 'pkg-safety'],
};

describe('url-state codec', () => {
  it('round-trips a build through encode/decode', () => {
    expect(decodeBuild(encodeBuild(build))).toEqual(build);
  });

  it('returns null for invalid base64', () => {
    expect(decodeBuild('!!!not-base64!!!')).toBeNull();
  });

  it('returns null for valid base64 but wrong shape', () => {
    expect(decodeBuild(btoa(JSON.stringify({ foo: 'bar' })))).toBeNull();
  });

  it('returns null for a build missing interiorId', () => {
    const incomplete = { carId: 'falcon-x', trimId: 'falcon-x-sport', colorId: 'cobalt-blue', wheelId: 'w-19-performance', packageIds: [] };
    expect(decodeBuild(btoa(JSON.stringify(incomplete)))).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(decodeBuild('')).toBeNull();
  });
});
