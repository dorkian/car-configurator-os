import type { Build, PriceSummary, LineItem } from '../../types/config';
import * as catalog from '../../services/catalog.service';

export function computePrice(build: Build): PriceSummary {
  const car = catalog.getCars().find((c) => c.id === build.carId);
  const trim = catalog.getTrimById(build.trimId);
  const color = catalog.getColorById(build.colorId);
  const wheel = catalog.getWheelById(build.wheelId);
  const interior = catalog.getInteriorById(build.interiorId);
  const pkgs = catalog.getPackages(build.trimId).filter((p) =>
    build.packageIds.includes(p.id)
  );

  const basePrice = car?.basePrice ?? 0;
  const trimPrice = trim?.priceModifier ?? 0;
  const colorPrice = color?.priceModifier ?? 0;
  const wheelPrice = wheel?.priceModifier ?? 0;
  const interiorPrice = interior?.priceModifier ?? 0;
  const packagePrice = pkgs.reduce((sum, p) => sum + p.priceModifier, 0);
  const optionsTotal = trimPrice + colorPrice + wheelPrice + interiorPrice + packagePrice;

  const lineItems: LineItem[] = [
    { label: `Base price — ${car?.name ?? ''}`, price: basePrice },
    ...(trimPrice ? [{ label: `${trim?.name ?? ''} trim`, price: trimPrice }] : []),
    ...(colorPrice ? [{ label: `${color?.name ?? ''} paint`, price: colorPrice }] : []),
    ...(wheelPrice ? [{ label: `${wheel?.name ?? ''} wheels`, price: wheelPrice }] : []),
    ...(interiorPrice ? [{ label: `${interior?.name ?? ''} interior`, price: interiorPrice }] : []),
    ...pkgs.map((p) => ({ label: p.name, price: p.priceModifier })),
  ];

  return {
    basePrice,
    trimPrice,
    colorPrice,
    wheelPrice,
    interiorPrice,
    packagePrice,
    optionsTotal,
    totalPrice: basePrice + optionsTotal,
    lineItems,
  };
}
