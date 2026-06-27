import {
  defaultCountries,
  parseCountry,
  type ParsedCountry,
} from "react-international-phone";

export const DEFAULT_COUNTRY_ISO = "ae";

const PHONE_LENGTH_OVERRIDES: Partial<Record<string, number>> = {
  ae: 9,
  in: 10,
  us: 10,
  gb: 10,
  sa: 9,
  bh: 8,
};

export const PARSED_COUNTRIES = defaultCountries.map(parseCountry);

export function getCountryByIso(iso2: string): ParsedCountry {
  return (
    PARSED_COUNTRIES.find((country) => country.iso2 === iso2) ??
    PARSED_COUNTRIES.find((country) => country.iso2 === DEFAULT_COUNTRY_ISO)!
  );
}

export function getExpectedPhoneLength(country: ParsedCountry): number {
  const override = PHONE_LENGTH_OVERRIDES[country.iso2];
  if (override) return override;

  const format = country.format;

  if (typeof format === "string") {
    const dots = (format.match(/\./g) || []).length;
    if (dots > 0) return dots;
  }

  if (format && typeof format === "object" && "default" in format) {
    const dots = (String(format.default).match(/\./g) || []).length;
    if (dots > 0) return dots;
  }

  return 10;
}

export function parseStoredPhone(storedPhone: string): {
  country: ParsedCountry;
  localNumber: string;
} {
  const trimmed = storedPhone.trim();
  const defaultCountry = getCountryByIso(DEFAULT_COUNTRY_ISO);

  if (!trimmed) {
    return { country: defaultCountry, localNumber: "" };
  }

  const allDigits = trimmed.replace(/\D/g, "");
  const countries = [...PARSED_COUNTRIES].sort(
    (a, b) => b.dialCode.length - a.dialCode.length
  );

  if (trimmed.startsWith("+") || allDigits.length > 10) {
    for (const country of countries) {
      if (
        allDigits.startsWith(country.dialCode) &&
        allDigits.length > country.dialCode.length
      ) {
        return {
          country,
          localNumber: allDigits.slice(country.dialCode.length),
        };
      }
    }
  }

  let local = allDigits;
  if (local.startsWith("91") && local.length > 10) {
    local = local.slice(2);
  }

  return { country: defaultCountry, localNumber: local };
}

export function validatePhoneNumber(
  value: string,
  country: ParsedCountry,
  { required = true }: { required?: boolean } = {}
): string | null {
  if (!value.trim()) {
    return required ? "Please enter your phone number" : null;
  }

  const cleanPhone = value.replace(/\D/g, "");
  const expectedLength = getExpectedPhoneLength(country);

  if (cleanPhone.length !== expectedLength) {
    return `Phone number must be ${expectedLength} digits for ${country.name}`;
  }

  return null;
}

export function formatPhoneForApi(
  localDigits: string,
  country: ParsedCountry
): string {
  const clean = localDigits.replace(/\D/g, "").trim();
  if (!clean) return "";
  return `+${country.dialCode}${clean}`;
}
