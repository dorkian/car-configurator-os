export interface Car {
  id: string;
  name: string;
  slug: string;
  basePrice: number;
  tagline: string;
  availableTrims: string[];
  heroImage: string;
}

export interface Trim {
  id: string;
  carId: string;
  name: string;
  priceModifier: number;
  features: string[];
  availableColors: string[];
  availableWheels: string[];
  availableInteriors: string[];
  availablePackages: string[];
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  type: 'standard' | 'metallic' | 'premium';
  priceModifier: number;
}

export interface Wheel {
  id: string;
  name: string;
  size: number;
  image: string;
  priceModifier: number;
}

export interface Interior {
  id: string;
  name: string;
  material: 'fabric' | 'leather' | 'alcantara';
  colorName: string;
  thumbnail: string;
  priceModifier: number;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  features: string[];
  priceModifier: number;
  incompatibleWith: string[];
}

export interface Catalog {
  cars: Car[];
  trims: Trim[];
  colors: Color[];
  wheels: Wheel[];
  interiors: Interior[];
  packages: Package[];
}
