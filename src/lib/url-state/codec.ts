import type { Build } from '../../types/config';

export function encodeBuild(build: Build): string {
  return btoa(JSON.stringify(build));
}

export function decodeBuild(param: string): Build | null {
  try {
    const json = atob(param);
    const parsed = JSON.parse(json);
    if (
      typeof parsed.carId === 'string' &&
      typeof parsed.trimId === 'string' &&
      typeof parsed.colorId === 'string' &&
      typeof parsed.wheelId === 'string' &&
      typeof parsed.interiorId === 'string' &&
      Array.isArray(parsed.packageIds)
    ) {
      return parsed as Build;
    }
    return null;
  } catch {
    return null;
  }
}
