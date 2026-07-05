import carsData from '../data/catalog.json';
import trimsData from '../data/trims.json';
import colorsData from '../data/colors.json';
import wheelsData from '../data/wheels.json';
import interiorsData from '../data/interiors.json';
import packagesData from '../data/packages.json';
import type { Car, Trim, Color, Wheel, Interior, Package } from '../types/catalog';

const cars = carsData as Car[];
const trims = trimsData as Trim[];
const colors = colorsData as Color[];
const wheels = wheelsData as Wheel[];
const interiors = interiorsData as Interior[];
const packages = packagesData as Package[];

export function getCars(): Car[] {
  return cars;
}

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug);
}

export function getTrims(carId: string): Trim[] {
  return trims.filter((t) => t.carId === carId);
}

export function getTrimById(trimId: string): Trim | undefined {
  return trims.find((t) => t.id === trimId);
}

export function getColors(trimId: string): Color[] {
  const trim = getTrimById(trimId);
  if (!trim) return [];
  return colors.filter((c) => trim.availableColors.includes(c.id));
}

export function getColorById(colorId: string): Color | undefined {
  return colors.find((c) => c.id === colorId);
}

export function getWheels(trimId: string): Wheel[] {
  const trim = getTrimById(trimId);
  if (!trim) return [];
  return wheels.filter((w) => trim.availableWheels.includes(w.id));
}

export function getWheelById(wheelId: string): Wheel | undefined {
  return wheels.find((w) => w.id === wheelId);
}

export function getInteriors(trimId: string): Interior[] {
  const trim = getTrimById(trimId);
  if (!trim) return [];
  return interiors.filter((i) => trim.availableInteriors.includes(i.id));
}

export function getInteriorById(interiorId: string): Interior | undefined {
  return interiors.find((i) => i.id === interiorId);
}

export function getPackages(trimId: string): Package[] {
  const trim = getTrimById(trimId);
  if (!trim) return [];
  return packages.filter((p) => trim.availablePackages.includes(p.id));
}

export function getPackageById(packageId: string): Package | undefined {
  return packages.find((p) => p.id === packageId);
}
