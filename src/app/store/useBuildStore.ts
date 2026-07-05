import { create } from 'zustand';
import type { Build, PriceSummary } from '../../types/config';
import type { Color, Wheel, Interior, Package, Trim } from '../../types/catalog';
import { computePrice } from '../../features/pricing';
import { validateBuild, getTrimRecovery } from '../../features/rules';
import * as catalog from '../../services/catalog.service';

interface Selectors {
  basePrice: () => number;
  optionsTotal: () => number;
  totalPrice: () => number;
  availableColors: () => Color[];
  availableWheels: () => Wheel[];
  availableInteriors: () => Interior[];
  availablePackages: () => Package[];
  activeTrim: () => Trim | undefined;
  priceSummary: () => PriceSummary | null;
}

interface BuildStore extends Selectors {
  build: Build;
  recoveryMessages: string[];
  clearRecoveryMessages: () => void;
  setTrim: (trimId: string) => void;
  setColor: (colorId: string) => void;
  setWheel: (wheelId: string) => void;
  setInterior: (interiorId: string) => void;
  togglePackage: (packageId: string) => void;
  resetBuild: (carSlug: string) => void;
  hydrate: (build: Build) => void;
}

function defaultBuild(carSlug: string): Build {
  const car = catalog.getCarBySlug(carSlug);
  if (!car) throw new Error(`Unknown car slug: ${carSlug}`);
  const trims = catalog.getTrims(car.id);
  const trim = trims[0];
  return {
    carId: car.id,
    trimId: trim.id,
    colorId: catalog.getColors(trim.id)[0]?.id ?? '',
    wheelId: catalog.getWheels(trim.id)[0]?.id ?? '',
    interiorId: catalog.getInteriors(trim.id)[0]?.id ?? '',
    packageIds: [],
  };
}

export const useBuildStore = create<BuildStore>((set, get) => ({
  build: {
    carId: '',
    trimId: '',
    colorId: '',
    wheelId: '',
    interiorId: '',
    packageIds: [],
  },

  recoveryMessages: [],

  clearRecoveryMessages() {
    set({ recoveryMessages: [] });
  },

  // ── Actions ────────────────────────────────────────────────────────────────

  setTrim(trimId) {
    set((state) => {
      const recovery = getTrimRecovery(state.build, trimId);
      const colors = catalog.getColors(trimId);
      const wheels = catalog.getWheels(trimId);
      const interiors = catalog.getInteriors(trimId);
      const packages = catalog.getPackages(trimId);
      const updated: Build = {
        ...state.build,
        trimId,
        colorId: colors[0]?.id ?? '',
        wheelId: wheels[0]?.id ?? '',
        interiorId: interiors[0]?.id ?? '',
        packageIds: state.build.packageIds.filter((id) =>
          packages.some((p) => p.id === id)
        ),
      };
      return { build: updated, recoveryMessages: recovery.map((r) => r.message) };
    });
  },

  setColor(colorId) {
    set((state) => ({ build: { ...state.build, colorId } }));
  },

  setWheel(wheelId) {
    set((state) => ({ build: { ...state.build, wheelId } }));
  },

  setInterior(interiorId) {
    set((state) => ({ build: { ...state.build, interiorId } }));
  },

  togglePackage(packageId) {
    set((state) => {
      const { packageIds, trimId } = state.build;
      const pkg = catalog.getPackageById(packageId);
      if (!pkg || !catalog.getPackages(trimId).some((p) => p.id === packageId)) return state;

      if (packageIds.includes(packageId)) {
        return { build: { ...state.build, packageIds: packageIds.filter((id) => id !== packageId) } };
      }

      const withoutConflicts = packageIds.filter((id) => !pkg.incompatibleWith.includes(id));
      return { build: { ...state.build, packageIds: [...withoutConflicts, packageId] } };
    });
  },

  resetBuild(carSlug) {
    set({ build: defaultBuild(carSlug) });
  },

  hydrate(build) {
    set({ build: validateBuild(build) });
  },

  // ── Selectors ──────────────────────────────────────────────────────────────

  activeTrim() {
    return catalog.getTrimById(get().build.trimId);
  },

  availableColors() {
    return catalog.getColors(get().build.trimId);
  },

  availableWheels() {
    return catalog.getWheels(get().build.trimId);
  },

  availableInteriors() {
    return catalog.getInteriors(get().build.trimId);
  },

  availablePackages() {
    return catalog.getPackages(get().build.trimId);
  },

  priceSummary() {
    const { build } = get();
    if (!build.carId) return null;
    return computePrice(build);
  },

  basePrice() {
    const car = catalog.getCars().find((c) => c.id === get().build.carId);
    return car?.basePrice ?? 0;
  },

  optionsTotal() {
    return get().priceSummary()?.optionsTotal ?? 0;
  },

  totalPrice() {
    return get().priceSummary()?.totalPrice ?? 0;
  },
}));
