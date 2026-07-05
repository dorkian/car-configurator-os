export interface Build {
  carId: string;
  trimId: string;
  colorId: string;
  wheelId: string;
  interiorId: string;
  packageIds: string[];
}

export interface LineItem {
  label: string;
  price: number;
}

export interface PriceSummary {
  basePrice: number;
  trimPrice: number;
  colorPrice: number;
  wheelPrice: number;
  interiorPrice: number;
  packagePrice: number;
  optionsTotal: number;
  totalPrice: number;
  lineItems: LineItem[];
}
