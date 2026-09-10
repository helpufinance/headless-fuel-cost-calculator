import { formatMoney, type Currency } from './currency'
import type {
  ConsumptionUnit,
  DistanceUnit,
  FuelPriceUnit,
  TripCalculation,
  TripCalculationInput,
  TripFieldErrors,
  TripFieldStrings,
  TripFieldUnits,
  VolumeUnit,
} from './types'
export function milesToKm(miles: number): number {
  return miles * 1.609344
}
export function kmToMiles(km: number): number {
  return km / 1.609344
}
export function convertDistance(value: number, from: DistanceUnit, to: DistanceUnit): number {
  if (!Number.isFinite(value)) return value
  if (from === to) return value
  return from === 'km' ? kmToMiles(value) : milesToKm(value)
}
export function litresToUsGallons(litres: number): number {
  return litres / 3.785411784
}
export function usGallonsToLitres(usGallons: number): number {
  return usGallons * 3.785411784
}
export function litresToImperialGallons(litres: number): number {
  return litres / 4.54609
}
export function imperialGallonsToLitres(imperialGallons: number): number {
  return imperialGallons * 4.54609
}
export function convertVolume(value: number, from: VolumeUnit, to: VolumeUnit): number {
  if (!Number.isFinite(value)) return value
  if (from === to) return value
  const litres =
    from === 'litre'
      ? value
      : from === 'usGallon'
        ? usGallonsToLitres(value)
        : imperialGallonsToLitres(value)
  return to === 'litre'
    ? litres
    : to === 'usGallon'
      ? litresToUsGallons(litres)
      : litresToImperialGallons(litres)
}
export function litresPer100KmToMpgUs(l100: number): number {
  if (!Number.isFinite(l100) || l100 <= 0) return NaN
  return 235.214583 / l100
}
export function litresPer100KmToMpgImperial(l100: number): number {
  if (!Number.isFinite(l100) || l100 <= 0) return NaN
  return 282.480936 / l100
}
export function mpgUsToLitresPer100Km(mpg: number): number {
  if (!Number.isFinite(mpg) || mpg <= 0) return NaN
  return 235.214583 / mpg
}
export function mpgImperialToLitresPer100Km(mpg: number): number {
  if (!Number.isFinite(mpg) || mpg <= 0) return NaN
  return 282.480936 / mpg
}
export function toLitresPer100Km(value: number, unit: ConsumptionUnit): number {
  switch (unit) {
    case 'l100':
      return value
    case 'mpgUs':
      return mpgUsToLitresPer100Km(value)
    case 'mpgImperial':
      return mpgImperialToLitresPer100Km(value)
  }
}
export function convertConsumption(
  value: number,
  from: ConsumptionUnit,
  to: ConsumptionUnit,
): number {
  if (!Number.isFinite(value) || value <= 0) return value
  if (from === to) return value
  const l100 = toLitresPer100Km(value, from)
  if (!Number.isFinite(l100) || l100 <= 0) return value
  switch (to) {
    case 'l100':
      return l100
    case 'mpgUs':
      return litresPer100KmToMpgUs(l100)
    case 'mpgImperial':
      return litresPer100KmToMpgImperial(l100)
  }
}
export function toPricePerLitre(price: number, unit: FuelPriceUnit): number {
  switch (unit) {
    case 'litre':
      return price
    case 'usGallon':
      return price / 3.785411784
    case 'imperialGallon':
      return price / 4.54609
  }
}
export function convertFuelPrice(value: number, from: FuelPriceUnit, to: FuelPriceUnit): number {
  if (!Number.isFinite(value) || value <= 0) return value
  if (from === to) return value
  const perLitre = toPricePerLitre(value, from)
  if (!Number.isFinite(perLitre) || perLitre <= 0) return value
  switch (to) {
    case 'litre':
      return perLitre
    case 'usGallon':
      return perLitre * 3.785411784
    case 'imperialGallon':
      return perLitre * 4.54609
  }
}
export function calculateTripCost(input: TripCalculationInput): TripCalculation | null {
  const {
    distance,
    distanceUnit,
    consumption,
    consumptionUnit,
    fuelPrice,
    fuelPriceUnit,
    tripType,
    passengers,
  } = input
  if (!Number.isFinite(distance) || !Number.isFinite(consumption) || !Number.isFinite(fuelPrice)) {
    return null
  }
  if (distance <= 0 || consumption <= 0 || fuelPrice <= 0) return null
  if (!Number.isFinite(passengers) || passengers < 1) return null
  const distanceKm = convertDistance(distance, distanceUnit, 'km')
  const tripMultiplier = tripType === 'roundTrip' ? 2 : 1
  const tripDistanceKm = distanceKm * tripMultiplier
  const consumptionL100 = toLitresPer100Km(consumption, consumptionUnit)
  if (!Number.isFinite(consumptionL100) || consumptionL100 <= 0) return null
  const fuelRequiredLitres = tripDistanceKm * (consumptionL100 / 100)
  const pricePerLitre = toPricePerLitre(fuelPrice, fuelPriceUnit)
  const tripCost = fuelRequiredLitres * pricePerLitre
  const costPerKm = tripCost / tripDistanceKm
  const costPerMile = costPerKm * 1.609344
  const costPerPerson = tripCost / passengers
  return {
    oneWayDistance: distance,
    distanceUnit,
    tripDistance: distance * tripMultiplier,
    tripDistanceKm,
    tripType,
    consumptionL100,
    fuelRequiredLitres,
    fuelRequiredUsGallons: litresToUsGallons(fuelRequiredLitres),
    fuelRequiredImperialGallons: litresToImperialGallons(fuelRequiredLitres),
    pricePerLitre,
    tripCost,
    costPerKm,
    costPerMile,
    passengers,
    costPerPerson,
  }
}
export function parseInputNumber(raw: string): number | null {
  const trimmed = raw.trim()
  if (trimmed === '') return null
  const value = Number(trimmed)
  return Number.isFinite(value) ? value : null
}
export function parseTripFields(
  fields: TripFieldStrings,
  units: TripFieldUnits,
): {
  input: TripCalculationInput | null
  errors: TripFieldErrors
} {
  const errors: TripFieldErrors = {}
  const distance = parseInputNumber(fields.distance)
  const consumption = parseInputNumber(fields.consumption)
  const fuelPrice = parseInputNumber(fields.fuelPrice)
  const passengersRaw = fields.passengers.trim()
  const passengers = passengersRaw === '' ? 1 : parseInputNumber(passengersRaw)
  if (distance === null) errors.distance = 'Enter a trip distance.'
  else if (distance <= 0) errors.distance = 'Distance must be greater than 0.'
  if (consumption === null) errors.consumption = 'Enter an average fuel consumption.'
  else if (consumption <= 0) errors.consumption = 'Consumption must be greater than 0.'
  if (fuelPrice === null) errors.fuelPrice = 'Enter a fuel price.'
  else if (fuelPrice <= 0) errors.fuelPrice = 'Fuel price must be greater than 0.'
  if (passengers === null) errors.passengers = 'Passengers must be a number.'
  else if (passengers < 1) errors.passengers = 'At least 1 passenger is required.'
  else if (!Number.isInteger(passengers)) errors.passengers = 'Passengers must be a whole number.'
  const hasErrors = Object.keys(errors).length > 0
  const input: TripCalculationInput | null = hasErrors
    ? null
    : {
        distance: distance as number,
        distanceUnit: units.distanceUnit,
        consumption: consumption as number,
        consumptionUnit: units.consumptionUnit,
        fuelPrice: fuelPrice as number,
        fuelPriceUnit: units.fuelPriceUnit,
        tripType: units.tripType,
        passengers: passengers as number,
      }
  return { input, errors }
}
export function formatMeasure(value: number, maxDecimals = 2): string {
  if (!Number.isFinite(value)) return '—'
  return String(parseFloat(value.toFixed(maxDecimals)))
}
export function formatCostPerDistance(value: number, currency: Currency): string {
  if (!Number.isFinite(value)) return '—'
  const decimals = value > 0 && value < 0.1 ? 4 : 2
  return formatMoney(value, currency, decimals)
}
export function roundTripDistance(distance: number): number {
  return distance * 2
}
export { formatMoney }
