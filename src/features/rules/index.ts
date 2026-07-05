import type { Build } from '../../types/config';
import * as catalog from '../../services/catalog.service';

export interface RecoveryChange {
  field: 'color' | 'wheel' | 'interior' | 'packages';
  message: string;
}

export function validateBuild(build: Build): Build {
  const car = catalog.getCars().find((c) => c.id === build.carId);
  if (!car) return build;

  const trims = catalog.getTrims(car.id);
  const trim = trims.find((t) => t.id === build.trimId) ?? trims[0];

  const colors = catalog.getColors(trim.id);
  const colorId = colors.find((c) => c.id === build.colorId)
    ? build.colorId
    : (colors[0]?.id ?? '');

  const wheels = catalog.getWheels(trim.id);
  const wheelId = wheels.find((w) => w.id === build.wheelId)
    ? build.wheelId
    : (wheels[0]?.id ?? '');

  const interiors = catalog.getInteriors(trim.id);
  const interiorId = interiors.find((i) => i.id === build.interiorId)
    ? build.interiorId
    : (interiors[0]?.id ?? '');

  const availablePkgs = catalog.getPackages(trim.id);
  const packageIds = build.packageIds.filter((id) =>
    availablePkgs.some((p) => p.id === id)
  );

  return { carId: car.id, trimId: trim.id, colorId, wheelId, interiorId, packageIds };
}

export function getTrimRecovery(build: Build, newTrimId: string): RecoveryChange[] {
  const changes: RecoveryChange[] = [];

  const newColors = catalog.getColors(newTrimId);
  const newWheels = catalog.getWheels(newTrimId);
  const newInteriors = catalog.getInteriors(newTrimId);
  const newPackages = catalog.getPackages(newTrimId);

  if (build.colorId && !newColors.some((c) => c.id === build.colorId)) {
    const prev = catalog.getColorById(build.colorId);
    const next = newColors[0];
    if (prev && next) {
      changes.push({ field: 'color', message: `Color changed: ${prev.name} → ${next.name}` });
    }
  }

  if (build.wheelId && !newWheels.some((w) => w.id === build.wheelId)) {
    const prev = catalog.getWheelById(build.wheelId);
    const next = newWheels[0];
    if (prev && next) {
      changes.push({ field: 'wheel', message: `Wheels changed: ${prev.name} → ${next.name}` });
    }
  }

  if (build.interiorId && !newInteriors.some((i) => i.id === build.interiorId)) {
    const prev = catalog.getInteriorById(build.interiorId);
    const next = newInteriors[0];
    if (prev && next) {
      changes.push({ field: 'interior', message: `Interior changed: ${prev.name} → ${next.name}` });
    }
  }

  const droppedPkgIds = build.packageIds.filter((id) => !newPackages.some((p) => p.id === id));
  if (droppedPkgIds.length > 0) {
    const names = droppedPkgIds.map((id) => catalog.getPackageById(id)?.name ?? id).join(', ');
    changes.push({
      field: 'packages',
      message: `Package${droppedPkgIds.length > 1 ? 's' : ''} removed: ${names}`,
    });
  }

  return changes;
}

export function getConflicts(
  packageId: string,
  selectedPackageIds: string[]
): string[] {
  const pkg = catalog.getPackageById(packageId);
  if (!pkg) return [];
  return selectedPackageIds.filter((id) => pkg.incompatibleWith.includes(id));
}
