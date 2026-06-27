"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";
import { FlagImage } from "react-international-phone";
import type { ParsedCountry } from "react-international-phone";
import { PARSED_COUNTRIES } from "@/lib/phone/utils";
import styles from "./CountryPickerSheet.module.css";

type CountryPickerSheetProps = {
  isOpen: boolean;
  selectedIso: string;
  onClose: () => void;
  onSelect: (country: ParsedCountry) => void;
};

export default function CountryPickerSheet({
  isOpen,
  selectedIso,
  onClose,
  onSelect,
}: CountryPickerSheetProps) {
  const [query, setQuery] = useState("");

  const filteredCountries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return PARSED_COUNTRIES;

    return PARSED_COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(normalized) ||
        country.dialCode.includes(normalized) ||
        country.iso2.includes(normalized)
    );
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.backdrop} onClick={onClose}>
          <motion.div
            className={styles.sheet}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.handle} />

            <div className={styles.header}>
              <h3 className={styles.title}>Select Country</h3>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.searchWrap}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search country or code"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <div className={styles.list}>
              {filteredCountries.map((country) => (
                <button
                  key={country.iso2}
                  type="button"
                  className={`${styles.countryRow} ${
                    country.iso2 === selectedIso ? styles.countryRowActive : ""
                  }`}
                  onClick={() => {
                    onSelect(country);
                    setQuery("");
                    onClose();
                  }}
                >
                  <FlagImage iso2={country.iso2} className={styles.flag} />
                  <span className={styles.countryName}>{country.name}</span>
                  <span className={styles.dialCode}>+{country.dialCode}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
