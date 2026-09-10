import type { Currency } from './currency'
export type DistanceUnit = 'km' | 'mi'
export type ConsumptionUnit = 'l100' | 'mpgUs' | 'mpgImperial'
export type FuelPriceUnit = 'litre' | 'usGallon' | 'imperialGallon'
export type TripType = 'oneWay' | 'roundTrip'
export type RegionPreset = 'europe' | 'uk' | 'us' | 'custom'
export type VolumeUnit = 'litre' | 'usGallon' | 'imperialGallon'
export interface TripCalculationInput {
  distance: number
  distanceUnit: DistanceUnit
  consumption: number
  consumptionUnit: ConsumptionUnit
  fuelPrice: number
  fuelPriceUnit: FuelPriceUnit
  tripType: TripType
  passengers: number
}
export interface TripCalculation {
  oneWayDistance: number
  distanceUnit: DistanceUnit
  tripDistance: number
  tripDistanceKm: number
  tripType: TripType
  consumptionL100: number
  fuelRequiredLitres: number
  fuelRequiredUsGallons: number
  fuelRequiredImperialGallons: number
  pricePerLitre: number
  tripCost: number
  costPerKm: number
  costPerMile: number
  passengers: number
  costPerPerson: number
}
export interface TripFieldErrors {
  distance?: string
  consumption?: string
  fuelPrice?: string
  passengers?: string
}
export interface TripFieldStrings {
  distance: string
  consumption: string
  fuelPrice: string
  passengers: string
}
export interface TripFieldUnits {
  distanceUnit: DistanceUnit
  consumptionUnit: ConsumptionUnit
  fuelPriceUnit: FuelPriceUnit
  tripType: TripType
}
export const KM_PER_MILE = 1.609344
export const LITRES_PER_US_GALLON = 3.785411784
export const LITRES_PER_IMPERIAL_GALLON = 4.54609
export const MPG_US_FACTOR = 235.214583
export const MPG_IMPERIAL_FACTOR = 282.480936
export const DISTANCE_UNIT_LABELS: Record<DistanceUnit, string> = {
  km: 'Kilometres (km)',
  mi: 'Miles (mi)',
}
export const DISTANCE_UNIT_SHORT: Record<DistanceUnit, string> = {
  km: 'km',
  mi: 'mi',
}
export const CONSUMPTION_UNIT_LABELS: Record<ConsumptionUnit, string> = {
  l100: 'Litres per 100 km (L/100 km)',
  mpgUs: 'Miles per US gallon (MPG)',
  mpgImperial: 'Miles per Imperial gallon (MPG UK)',
}
export const CONSUMPTION_UNIT_SHORT: Record<ConsumptionUnit, string> = {
  l100: 'L/100 km',
  mpgUs: 'MPG (US)',
  mpgImperial: 'MPG (UK)',
}
export const FUEL_PRICE_UNIT_LABELS: Record<FuelPriceUnit, string> = {
  litre: 'per litre',
  usGallon: 'per US gallon',
  imperialGallon: 'per Imperial gallon',
}
export const FUEL_PRICE_UNIT_SHORT: Record<FuelPriceUnit, string> = {
  litre: '/ L',
  usGallon: '/ US gal',
  imperialGallon: '/ imp. gal',
}
export const TRIP_TYPE_LABELS: Record<TripType, string> = {
  oneWay: 'One way',
  roundTrip: 'Round trip',
}
export interface RegionPresetConfig {
  label: string
  distanceUnit: DistanceUnit
  consumptionUnit: ConsumptionUnit
  fuelPriceUnit: FuelPriceUnit
  currency: Currency
}
export const REGION_PRESETS: Record<RegionPreset, RegionPresetConfig> = {
  europe: {
    label: 'Europe / Metric',
    distanceUnit: 'km',
    consumptionUnit: 'l100',
    fuelPriceUnit: 'litre',
    currency: 'EUR',
  },
  uk: {
    label: 'United Kingdom',
    distanceUnit: 'mi',
    consumptionUnit: 'mpgImperial',
    fuelPriceUnit: 'litre',
    currency: 'GBP',
  },
  us: {
    label: 'United States',
    distanceUnit: 'mi',
    consumptionUnit: 'mpgUs',
    fuelPriceUnit: 'usGallon',
    currency: 'USD',
  },
  custom: {
    label: 'Custom',
    distanceUnit: 'km',
    consumptionUnit: 'l100',
    fuelPriceUnit: 'litre',
    currency: 'EUR',
  },
}
export const REGION_PRESET_OPTIONS: {
  value: RegionPreset
  label: string
}[] = (Object.entries(REGION_PRESETS) as [RegionPreset, RegionPresetConfig][]).map(
  ([value, config]) => ({ value, label: config.label }),
)
