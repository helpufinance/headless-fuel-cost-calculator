import { describe, expect, it } from 'vitest'
import {
  KM_PER_MILE,
  LITRES_PER_IMPERIAL_GALLON,
  LITRES_PER_US_GALLON,
  MPG_IMPERIAL_FACTOR,
  MPG_US_FACTOR,
  calculateTripCost,
  convertConsumption,
  convertDistance,
  convertFuelPrice,
  convertVolume,
  formatCostPerDistance,
  formatMeasure,
  formatMoney,
  getCurrenciesByRegion,
  getCurrencyConfig,
  getSupportedCurrencies,
  imperialGallonsToLitres,
  kmToMiles,
  litresPer100KmToMpgImperial,
  litresPer100KmToMpgUs,
  litresToImperialGallons,
  litresToUsGallons,
  milesToKm,
  mpgImperialToLitresPer100Km,
  mpgUsToLitresPer100Km,
  parseInputNumber,
  parseTripFields,
  roundTripDistance,
  usGallonsToLitres,
} from '../src/index'
import type { TripCalculationInput } from '../src/index'
const metricInput: TripCalculationInput = {
  distance: 500,
  distanceUnit: 'km',
  consumption: 6.5,
  consumptionUnit: 'l100',
  fuelPrice: 1.7,
  fuelPriceUnit: 'litre',
  tripType: 'oneWay',
  passengers: 1,
}
const usInput: TripCalculationInput = {
  distance: 300,
  distanceUnit: 'mi',
  consumption: 30,
  consumptionUnit: 'mpgUs',
  fuelPrice: 3.5,
  fuelPriceUnit: 'usGallon',
  tripType: 'oneWay',
  passengers: 1,
}
const ukInput: TripCalculationInput = {
  distance: 300,
  distanceUnit: 'mi',
  consumption: 45,
  consumptionUnit: 'mpgImperial',
  fuelPrice: 1.45,
  fuelPriceUnit: 'litre',
  tripType: 'oneWay',
  passengers: 1,
}
describe('calculateTripCost - metric', () => {
  it('computes 32.5 L of fuel for 500 km at 6.5 L/100 km', () => {
    const result = calculateTripCost(metricInput)
    expect(result).not.toBeNull()
    expect(result?.fuelRequiredLitres).toBeCloseTo(32.5, 10)
  })
  it('computes a €55.25 trip cost', () => {
    const result = calculateTripCost(metricInput)
    expect(result?.tripCost).toBeCloseTo(55.25, 10)
  })
  it('computes cost per km and per mile', () => {
    const result = calculateTripCost(metricInput)
    expect(result?.costPerKm).toBeCloseTo(0.1105, 10)
    expect(result?.costPerMile).toBeCloseTo(0.1105 * KM_PER_MILE, 10)
  })
})
describe('calculateTripCost - US', () => {
  it('computes 10 US gallons of fuel for 300 miles at 30 MPG', () => {
    const result = calculateTripCost(usInput)
    expect(result).not.toBeNull()
    expect(result?.fuelRequiredUsGallons).toBeCloseTo(10, 6)
    expect(result?.fuelRequiredLitres).toBeCloseTo(LITRES_PER_US_GALLON * 10, 6)
  })
  it('computes a $35.00 trip cost', () => {
    const result = calculateTripCost(usInput)
    expect(result?.tripCost).toBeCloseTo(35, 6)
  })
})
describe('calculateTripCost - UK', () => {
  it('computes 6.6667 Imperial gallons of fuel for 300 miles at 45 MPG', () => {
    const result = calculateTripCost(ukInput)
    expect(result).not.toBeNull()
    expect(result?.fuelRequiredImperialGallons).toBeCloseTo(300 / 45, 6)
  })
  it('converts the fuel requirement to approximately 30.31 litres', () => {
    const result = calculateTripCost(ukInput)
    expect(result?.fuelRequiredLitres).toBeCloseTo(30.3073, 2)
    expect(result?.fuelRequiredLitres).toBeCloseTo((300 / 45) * LITRES_PER_IMPERIAL_GALLON, 6)
  })
  it('computes an approximately £43.95 trip cost', () => {
    const result = calculateTripCost(ukInput)
    expect(result?.tripCost).toBeCloseTo(43.95, 1)
  })
})
describe('round trip', () => {
  it('doubles the effective distance', () => {
    const result = calculateTripCost({ ...metricInput, tripType: 'roundTrip' })
    expect(result?.tripDistance).toBeCloseTo(1000, 10)
    expect(result?.oneWayDistance).toBe(500)
  })
  it('doubles fuel use and trip cost', () => {
    const oneWay = calculateTripCost(metricInput)
    const roundTrip = calculateTripCost({ ...metricInput, tripType: 'roundTrip' })
    expect(roundTrip?.fuelRequiredLitres).toBeCloseTo((oneWay?.fuelRequiredLitres ?? 0) * 2, 10)
    expect(roundTrip?.tripCost).toBeCloseTo((oneWay?.tripCost ?? 0) * 2, 10)
  })
  it('keeps cost per km unchanged for a round trip', () => {
    const oneWay = calculateTripCost(metricInput)
    const roundTrip = calculateTripCost({ ...metricInput, tripType: 'roundTrip' })
    expect(roundTrip?.costPerKm).toBeCloseTo(oneWay?.costPerKm ?? 0, 10)
  })
  it('roundTripDistance doubles a distance', () => {
    expect(roundTripDistance(500)).toBe(1000)
  })
})
describe('distance conversions', () => {
  it('converts miles to km', () => {
    expect(milesToKm(1)).toBeCloseTo(KM_PER_MILE, 12)
    expect(milesToKm(300)).toBeCloseTo(482.8032, 6)
  })
  it('converts km to miles', () => {
    expect(kmToMiles(KM_PER_MILE)).toBeCloseTo(1, 12)
    expect(kmToMiles(100)).toBeCloseTo(62.137119, 5)
  })
  it('round-trips km to miles and back', () => {
    expect(convertDistance(convertDistance(123.4, 'km', 'mi'), 'mi', 'km')).toBeCloseTo(123.4, 10)
  })
  it('returns the value unchanged when units match', () => {
    expect(convertDistance(50, 'km', 'km')).toBe(50)
  })
  it('returns non-finite distances unchanged', () => {
    expect(convertDistance(Infinity, 'km', 'mi')).toBe(Infinity)
  })
})
describe('volume conversions', () => {
  it('converts litres to US gallons', () => {
    expect(litresToUsGallons(LITRES_PER_US_GALLON)).toBeCloseTo(1, 12)
    expect(usGallonsToLitres(1)).toBeCloseTo(LITRES_PER_US_GALLON, 12)
  })
  it('converts litres to Imperial gallons', () => {
    expect(litresToImperialGallons(LITRES_PER_IMPERIAL_GALLON)).toBeCloseTo(1, 12)
    expect(imperialGallonsToLitres(1)).toBeCloseTo(LITRES_PER_IMPERIAL_GALLON, 12)
  })
  it('does not treat US and Imperial gallons as equal', () => {
    const us = usGallonsToLitres(1)
    const imperial = imperialGallonsToLitres(1)
    expect(us).toBeCloseTo(3.785411784, 12)
    expect(imperial).toBeCloseTo(4.54609, 12)
    expect(imperial - us).toBeCloseTo(0.760678216, 10)
  })
  it('converts between volume units', () => {
    expect(convertVolume(1, 'usGallon', 'imperialGallon')).toBeCloseTo(
      LITRES_PER_US_GALLON / LITRES_PER_IMPERIAL_GALLON,
      10,
    )
    expect(convertVolume(10, 'litre', 'usGallon')).toBeCloseTo(10 / LITRES_PER_US_GALLON, 10)
    expect(convertVolume(1, 'imperialGallon', 'litre')).toBeCloseTo(LITRES_PER_IMPERIAL_GALLON, 10)
    expect(convertVolume(1, 'litre', 'litre')).toBe(1)
    expect(convertVolume(NaN, 'litre', 'usGallon')).toBeNaN()
  })
})
describe('consumption conversions', () => {
  it('converts 6.5 L/100 km to US MPG', () => {
    expect(litresPer100KmToMpgUs(6.5)).toBeCloseTo(36.19, 1)
    expect(litresPer100KmToMpgUs(6.5)).toBeCloseTo(MPG_US_FACTOR / 6.5, 10)
  })
  it('converts 6.5 L/100 km to Imperial MPG', () => {
    expect(litresPer100KmToMpgImperial(6.5)).toBeCloseTo(43.46, 1)
    expect(litresPer100KmToMpgImperial(6.5)).toBeCloseTo(MPG_IMPERIAL_FACTOR / 6.5, 10)
  })
  it('converts MPG US back to L/100 km', () => {
    expect(mpgUsToLitresPer100Km(36.19)).toBeCloseTo(6.5, 1)
    expect(mpgUsToLitresPer100Km(30)).toBeCloseTo(MPG_US_FACTOR / 30, 10)
  })
  it('converts MPG Imperial back to L/100 km', () => {
    expect(mpgImperialToLitresPer100Km(45)).toBeCloseTo(MPG_IMPERIAL_FACTOR / 45, 10)
  })
  it('does not treat US MPG and Imperial MPG as equal', () => {
    expect(litresPer100KmToMpgUs(6.5)).not.toBeCloseTo(litresPer100KmToMpgImperial(6.5), 1)
  })
  it('converts consumption between units via convertConsumption', () => {
    expect(convertConsumption(6.5, 'l100', 'mpgUs')).toBeCloseTo(36.19, 1)
    expect(convertConsumption(6.5, 'l100', 'mpgImperial')).toBeCloseTo(43.46, 1)
    expect(convertConsumption(30, 'mpgUs', 'l100')).toBeCloseTo(7.8404861, 6)
    expect(convertConsumption(45, 'mpgImperial', 'l100')).toBeCloseTo(6.277354133, 6)
    expect(convertConsumption(6.5, 'l100', 'l100')).toBe(6.5)
    expect(convertConsumption(0, 'l100', 'mpgUs')).toBe(0)
    expect(convertConsumption(10, 'unknown' as never, 'mpgUs')).toBe(10)
  })
  it('guards against division by zero', () => {
    expect(litresPer100KmToMpgUs(0)).toBeNaN()
    expect(litresPer100KmToMpgImperial(0)).toBeNaN()
    expect(litresPer100KmToMpgUs(-5)).toBeNaN()
    expect(mpgUsToLitresPer100Km(0)).toBeNaN()
    expect(mpgImperialToLitresPer100Km(0)).toBeNaN()
  })
})
describe('fuel price conversions', () => {
  it('converts a price per US gallon to per litre', () => {
    expect(convertFuelPrice(3.5, 'usGallon', 'litre')).toBeCloseTo(3.5 / LITRES_PER_US_GALLON, 10)
  })
  it('converts a price per litre to per US gallon', () => {
    expect(convertFuelPrice(1.7, 'litre', 'usGallon')).toBeCloseTo(1.7 * LITRES_PER_US_GALLON, 8)
  })
  it('converts a price per Imperial gallon to per litre', () => {
    expect(convertFuelPrice(6, 'imperialGallon', 'litre')).toBeCloseTo(
      6 / LITRES_PER_IMPERIAL_GALLON,
      10,
    )
  })
  it('does not treat US and Imperial gallon prices as equal', () => {
    expect(convertFuelPrice(1.7, 'litre', 'usGallon')).not.toBeCloseTo(
      convertFuelPrice(1.7, 'litre', 'imperialGallon'),
      10,
    )
  })
  it('handles matching, invalid, and unknown price units', () => {
    expect(convertFuelPrice(1.7, 'litre', 'litre')).toBe(1.7)
    expect(convertFuelPrice(0, 'litre', 'usGallon')).toBe(0)
    expect(convertFuelPrice(1.7, 'unknown' as never, 'usGallon')).toBe(1.7)
  })
})
describe('edge cases', () => {
  it('returns null for zero values', () => {
    expect(calculateTripCost({ ...metricInput, distance: 0 })).toBeNull()
    expect(calculateTripCost({ ...metricInput, consumption: 0 })).toBeNull()
    expect(calculateTripCost({ ...metricInput, fuelPrice: 0 })).toBeNull()
  })
  it('returns null for negative values', () => {
    expect(calculateTripCost({ ...metricInput, distance: -10 })).toBeNull()
    expect(calculateTripCost({ ...metricInput, consumption: -1 })).toBeNull()
    expect(calculateTripCost({ ...metricInput, fuelPrice: -0.5 })).toBeNull()
  })
  it('returns null for non-finite values', () => {
    expect(calculateTripCost({ ...metricInput, distance: NaN })).toBeNull()
    expect(calculateTripCost({ ...metricInput, consumption: Infinity })).toBeNull()
    expect(calculateTripCost({ ...metricInput, passengers: NaN })).toBeNull()
    expect(calculateTripCost({ ...metricInput, passengers: 0 })).toBeNull()
    expect(calculateTripCost({ ...metricInput, consumptionUnit: 'unknown' as never })).toBeNull()
  })
  it('handles decimal inputs', () => {
    const result = calculateTripCost({
      ...metricInput,
      distance: 12.5,
      consumption: 5.25,
      fuelPrice: 1.719,
    })
    expect(result?.tripCost).toBeCloseTo(12.5 * (5.25 / 100) * 1.719, 10)
  })
  it('handles very large distances without overflow', () => {
    const result = calculateTripCost({
      ...metricInput,
      distance: 10000000,
      tripType: 'roundTrip',
    })
    expect(result?.tripCost).toBeCloseTo(20000000 * (6.5 / 100) * 1.7, 6)
    expect(Number.isFinite(result?.tripCost)).toBe(true)
  })
  it('handles very small consumption and price', () => {
    const result = calculateTripCost({ ...metricInput, consumption: 0.1, fuelPrice: 0.01 })
    expect(result).not.toBeNull()
    expect(result?.tripCost).toBeGreaterThan(0)
  })
  it('guards against division by zero for infinite MPG', () => {
    expect(
      calculateTripCost({ ...metricInput, consumptionUnit: 'mpgUs', consumption: Infinity }),
    ).toBeNull()
  })
})
describe('parseTripFields', () => {
  const units = {
    distanceUnit: 'km' as const,
    consumptionUnit: 'l100' as const,
    fuelPriceUnit: 'litre' as const,
    tripType: 'oneWay' as const,
  }
  it('parses valid fields', () => {
    const { input, errors } = parseTripFields(
      { distance: '500', consumption: '6.5', fuelPrice: '1.70', passengers: '' },
      units,
    )
    expect(errors).toEqual({})
    expect(input).not.toBeNull()
    expect(input?.passengers).toBe(1)
  })
  it('flags empty input', () => {
    const { input, errors } = parseTripFields(
      { distance: '', consumption: '', fuelPrice: '', passengers: '' },
      units,
    )
    expect(input).toBeNull()
    expect(errors.distance).toBeTruthy()
    expect(errors.consumption).toBeTruthy()
    expect(errors.fuelPrice).toBeTruthy()
  })
  it('flags zero and negative input', () => {
    const { input, errors } = parseTripFields(
      { distance: '0', consumption: '-3', fuelPrice: '0', passengers: '' },
      units,
    )
    expect(input).toBeNull()
    expect(errors.distance).toBe('Distance must be greater than 0.')
    expect(errors.consumption).toBe('Consumption must be greater than 0.')
    expect(errors.fuelPrice).toBe('Fuel price must be greater than 0.')
  })
  it('flags invalid strings', () => {
    const { input, errors } = parseTripFields(
      { distance: 'abc', consumption: '1e', fuelPrice: '--2', passengers: '' },
      units,
    )
    expect(input).toBeNull()
    expect(errors.distance).toBeTruthy()
    expect(errors.consumption).toBeTruthy()
    expect(errors.fuelPrice).toBeTruthy()
  })
  it('flags invalid passenger counts', () => {
    const tooFew = parseTripFields(
      { distance: '10', consumption: '6', fuelPrice: '1', passengers: '0' },
      units,
    )
    expect(tooFew.errors.passengers).toBeTruthy()
    const fractional = parseTripFields(
      { distance: '10', consumption: '6', fuelPrice: '1', passengers: '2.5' },
      units,
    )
    expect(fractional.errors.passengers).toBe('Passengers must be a whole number.')
    const valid = parseTripFields(
      { distance: '10', consumption: '6', fuelPrice: '1', passengers: '3' },
      units,
    )
    expect(valid.errors.passengers).toBeUndefined()
    expect(valid.input?.passengers).toBe(3)
    const invalid = parseTripFields(
      { distance: '10', consumption: '6', fuelPrice: '1', passengers: 'many' },
      units,
    )
    expect(invalid.errors.passengers).toBe('Passengers must be a number.')
  })
  it('accepts decimal input', () => {
    const { input } = parseTripFields(
      { distance: '125.75', consumption: '7.25', fuelPrice: '1.499', passengers: '2' },
      units,
    )
    expect(input?.distance).toBeCloseTo(125.75, 10)
  })
})
describe('cost per person', () => {
  it('splits the trip cost equally between passengers', () => {
    const result = calculateTripCost({ ...metricInput, passengers: 3 })
    expect(result?.costPerPerson).toBeCloseTo(55.25 / 3, 10)
  })
  it('equals the trip cost for a single passenger', () => {
    const result = calculateTripCost(metricInput)
    expect(result?.costPerPerson).toBeCloseTo(result?.tripCost ?? 0, 10)
  })
})
describe('formatting', () => {
  it('formats money with currency conventions', () => {
    expect(formatMoney(55.25, 'EUR')).toBe('55,25 €')
    expect(formatMoney(35, 'USD')).toBe('$35.00')
    expect(formatMoney(35.9, 'USD', 0)).toBe('$36')
    expect(formatMoney(43.95, 'GBP')).toBe('£43.95')
  })
  it('formats large amounts with thousands separators', () => {
    expect(formatMoney(1234567.89, 'USD')).toBe('$1,234,567.89')
  })
  it('formats cost per distance without zeroes for tiny values', () => {
    expect(formatCostPerDistance(0.1105, 'EUR')).toBe('0,11 €')
    expect(formatCostPerDistance(0.0042, 'USD')).toBe('$0.0042')
    expect(formatCostPerDistance(0.1778, 'EUR')).toBe('0,18 €')
  })
  it('trims trailing zeroes in measurements', () => {
    expect(formatMeasure(6.5)).toBe('6.5')
    expect(formatMeasure(32.5, 2)).toBe('32.5')
    expect(formatMeasure(43.458605, 2)).toBe('43.46')
    expect(formatMeasure(500)).toBe('500')
  })
  it('never formats invalid numbers into the UI', () => {
    expect(formatMoney(NaN, 'EUR')).toBe('—')
    expect(formatMeasure(Infinity)).toBe('—')
    expect(formatCostPerDistance(NaN, 'EUR')).toBe('—')
  })
})
describe('parseInputNumber', () => {
  it('parses sensible input', () => {
    expect(parseInputNumber('6.5')).toBe(6.5)
    expect(parseInputNumber(' 1.70 ')).toBe(1.7)
    expect(parseInputNumber('0.5')).toBe(0.5)
  })
  it('rejects empty, non-numeric and non-finite input', () => {
    expect(parseInputNumber('')).toBeNull()
    expect(parseInputNumber('   ')).toBeNull()
    expect(parseInputNumber('abc')).toBeNull()
    expect(parseInputNumber('Infinity')).toBeNull()
    expect(parseInputNumber('1e999')).toBeNull()
  })
})

describe('currency lookup helpers', () => {
  it('returns currency metadata, supported currencies, and regional groups', () => {
    expect(getCurrencyConfig('USD').code).toBe('USD')
    expect(getSupportedCurrencies()).toContain('EUR')
    expect(getCurrenciesByRegion('Europe')).toContain('EUR')
    expect(getCurrenciesByRegion('Other' as never)).toEqual(expect.any(Array))
  })
})
