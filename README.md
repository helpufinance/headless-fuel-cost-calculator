<p align="center">
  <a href="https://github.com/helpufinance/helpu.finance">
    <img src="https://raw.githubusercontent.com/helpufinance/.github/refs/heads/main/profile/assets/helpu_finance.png" alt="HelpU Finance" width="260">
  </a>
</p>

# Headless Fuel Cost Calculator

A headless, framework-agnostic fuel cost calculator with distance, consumption, and fuel price conversions for metric and imperial units. Zero dependencies, works in Node.js, Bun, and browsers.

## What is HelpU Finance?

HelpU Finance is a free, privacy-first platform with financial tools and educational resources. No tracking, no data collection.

We believe that financial literacy should be accessible to everyone.

## Features

- **Trip cost calculation** - Fuel required, cost, cost per km/mile, and cost per person
- **One-way & round trips** - Distance is doubled for the return journey
- **Unit conversions** - km/miles, L/100 km/US MPG/Imperial MPG, litre/US gallon/Imperial gallon
- **Region presets** - Europe, UK, US, or fully custom units
- **Multi-currency** - 35+ currencies with proper formatting (label only, no conversion)
- **Form parsing** - Parse string fields with field-level validation errors
- **Zero dependencies** - Lightweight and fast
- **TypeScript first** - Full type safety and IntelliSense support
- **Universal** - Works with Node.js, Bun, and in browsers

## Installation

```bash
# npm
npm install @helpu/headless-fuel-cost-calculator

# yarn
yarn add @helpu/headless-fuel-cost-calculator

# pnpm
pnpm add @helpu/headless-fuel-cost-calculator

# bun
bun add @helpu/headless-fuel-cost-calculator
```

## Usage

```typescript
import { calculateTripCost } from '@helpu/headless-fuel-cost-calculator'

const result = calculateTripCost({
  distance: 500,              // 500 km
  distanceUnit: 'km',
  consumption: 6.5,           // 6.5 L/100 km
  consumptionUnit: 'l100',
  fuelPrice: 1.7,             // €1.70 per litre
  fuelPriceUnit: 'litre',
  tripType: 'oneWay',
  passengers: 1,
})

if (result) {
  console.log('Fuel required:', result.fuelRequiredLitres, 'L')
  console.log('Trip cost:', result.tripCost)
  console.log('Cost per km:', result.costPerKm)
}
```

## API Reference

### `calculateTripCost(input)`

Calculate the full trip breakdown.

```typescript
const result = calculateTripCost({
  distance: 300,
  distanceUnit: 'mi',
  consumption: 30,
  consumptionUnit: 'mpgUs',
  fuelPrice: 3.5,
  fuelPriceUnit: 'usGallon',
  tripType: 'oneWay',
  passengers: 2,
})
```

Returns `TripCalculation | null`:

- `oneWayDistance`, `distanceUnit`, `tripDistance`, `tripDistanceKm`, `tripType`
- `consumptionL100` - consumption normalised to L/100 km
- `fuelRequiredLitres`, `fuelRequiredUsGallons`, `fuelRequiredImperialGallons`
- `pricePerLitre` - price normalised to per litre
- `tripCost`, `costPerKm`, `costPerMile`
- `passengers`, `costPerPerson`

Returns `null` for zero, negative, or non-finite values.

### `parseTripFields(fields, units)`

Parse string form fields into a calculation input with validation errors.

```typescript
const { input, errors } = parseTripFields(
  { distance: '500', consumption: '6.5', fuelPrice: '1.70', passengers: '' },
  { distanceUnit: 'km', consumptionUnit: 'l100', fuelPriceUnit: 'litre', tripType: 'oneWay' },
)
```

### Conversions

- `convertDistance(value, from, to)` - km ↔ miles
- `convertConsumption(value, from, to)` - L/100 km ↔ US MPG ↔ Imperial MPG
- `convertFuelPrice(value, from, to)` - per litre ↔ per US gallon ↔ per Imperial gallon
- `convertVolume(value, from, to)` - litre ↔ US gallon ↔ Imperial gallon
- `milesToKm`, `kmToMiles`, `litresToUsGallons`, `usGallonsToLitres`, `litresToImperialGallons`, `imperialGallonsToLitres`
- `litresPer100KmToMpgUs`, `litresPer100KmToMpgImperial`, `mpgUsToLitresPer100Km`, `mpgImperialToLitresPer100Km`
- `toLitresPer100Km`, `toPricePerLitre`, `roundTripDistance`, `parseInputNumber`

### Formatting

- `formatMoney(amount, currency, decimals)` - format an amount with currency conventions
- `formatCostPerDistance(value, currency)` - 4 decimals for tiny per-unit costs
- `formatMeasure(value, maxDecimals)` - trim trailing zeroes

### Constants

- `REGION_PRESETS`, `REGION_PRESET_OPTIONS` - bundled unit/currency presets
- `DISTANCE_UNIT_LABELS`, `DISTANCE_UNIT_SHORT`
- `CONSUMPTION_UNIT_LABELS`, `CONSUMPTION_UNIT_SHORT`
- `FUEL_PRICE_UNIT_LABELS`, `FUEL_PRICE_UNIT_SHORT`
- `TRIP_TYPE_LABELS`
- `KM_PER_MILE`, `LITRES_PER_US_GALLON`, `LITRES_PER_IMPERIAL_GALLON`, `MPG_US_FACTOR`, `MPG_IMPERIAL_FACTOR`

## Testing

Install the repository dependencies and run the test suite with:

```bash
npm test
```

## Contributing

Contributions are welcome. Please read the [contribution guidelines](https://docs.omisai.com/contribution-guidelines) before opening a pull request.

## Sponsor

Support HelpU Finance through [GitHub Sponsors](https://github.com/sponsors/helpufinance).

## License

This project is available for permitted non-commercial use under the **PolyForm Noncommercial License 1.0.0**.

Personal learning, education, research, experimentation, and other uses permitted by the PolyForm Noncommercial License are welcome.

**Commercial use requires a separate license from Omisai Technologies.**

Commercial licensing helps fund the HelpU Finance mission of creating freely accessible financial tools, educational resources, and technology.

For commercial licensing, see [`COMMERCIAL-LICENSING.md`](./COMMERCIAL-LICENSING.md).

Copyright (c) 2026 Omisai Technologies.

HelpU Finance is a project and brand of Omisai Technologies.
