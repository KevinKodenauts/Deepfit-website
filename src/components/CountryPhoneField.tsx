"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FlagImage } from "react-international-phone";
import type { ParsedCountry } from "react-international-phone";
import CountryPickerSheet from "@/components/CountryPickerSheet";
import { getExpectedPhoneLength } from "@/lib/phone/utils";
import styles from "./CountryPhoneField.module.css";

type CountryPhoneFieldProps = {
  label: string;
  value: string;
  country: ParsedCountry;
  onValueChange: (value: string) => void;
  onCountryChange: (country: ParsedCountry) => void;
  optional?: boolean;
  error?: string;
  placeholder?: string;
  showChevron?: boolean;
  compact?: boolean;
};

export default function CountryPhoneField({
  label,
  value,
  country,
  onValueChange,
  onCountryChange,
  optional = false,
  error,
  placeholder,
  showChevron = true,
  compact = false,
}: CountryPhoneFieldProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const expectedLength = getExpectedPhoneLength(country);
  const inputPlaceholder =
    placeholder ?? (optional ? "Optional" : "Enter phone number");

  return (
    <div
      className={`${styles.field}${compact ? ` ${styles.fieldCompact}` : ""}`}
    >
      <label className={styles.label}>{label}</label>

      <div className={`${styles.inputWrap} ${error ? styles.inputWrapError : ""}`}>
        <button
          type="button"
          className={styles.countryBtn}
          onClick={() => setPickerOpen(true)}
          aria-label="Select country code"
        >
          <FlagImage iso2={country.iso2} className={styles.flag} />
          <span className={styles.dialCode}>+{country.dialCode}</span>
          {showChevron && (
            <ChevronDown size={16} className={styles.chevron} />
          )}
          <span className={styles.divider} />
        </button>

        <input
          type="tel"
          inputMode="numeric"
          className={styles.phoneInput}
          value={value}
          maxLength={expectedLength}
          onChange={(event) => {
            const digits = event.target.value.replace(/\D/g, "");
            onValueChange(digits.slice(0, expectedLength));
          }}
          placeholder={inputPlaceholder}
        />
      </div>

      <p className={styles.helper}>
        {optional
          ? `Optional (${expectedLength} digits)`
          : `Must be ${expectedLength} digits`}
      </p>

      {error && <p className={styles.error}>{error}</p>}

      <CountryPickerSheet
        isOpen={pickerOpen}
        selectedIso={country.iso2}
        onClose={() => setPickerOpen(false)}
        onSelect={onCountryChange}
      />
    </div>
  );
}
