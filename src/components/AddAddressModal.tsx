"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mailbox,
  Globe,
  MapPin,
  Building2,
  ChevronDown,
  Home,
  Briefcase,
} from "lucide-react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import {
  addAddress,
  updateAddress,
  type AddressView,
} from "@/lib/api/addresses";
import { getCustomerId } from "@/lib/auth/session";
import {
  UAE_COUNTRY,
  UAE_DISPLAY_COUNTRY,
  UAE_EMIRATES,
} from "@/constants/uaeAddress";
import styles from "./AddAddressModal.module.css";

type AddAddressModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
  editAddress?: AddressView | null;
};

type AddressTypeOption = "Home" | "Work";

function resolveEmirate(state: string): string {
  if (!state) return "";
  const match = UAE_EMIRATES.find(
    (emirate) => emirate.toLowerCase() === state.toLowerCase()
  );
  return match ?? state;
}

function resolvePoBox(pincode: string): string {
  if (!pincode || pincode === "00000") return "";
  return pincode;
}

function resolveAddressType(type?: string): AddressTypeOption {
  const normalized = (type ?? "").toLowerCase();
  if (normalized.includes("work") || normalized.includes("office")) {
    return "Work";
  }
  return "Home";
}

export default function AddAddressModal({
  isOpen,
  onClose,
  onSaved,
  editAddress = null,
}: AddAddressModalProps) {
  const { isDesktop, isHydrated } = useBreakpoint();
  const desktop = isHydrated && isDesktop;
  const isEditMode = editAddress != null;
  const [poBox, setPoBox] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [emirate, setEmirate] = useState("");
  const [addressType, setAddressType] = useState<AddressTypeOption>("Home");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    if (editAddress) {
      setPoBox(resolvePoBox(editAddress.pincode));
      setAddress(editAddress.address);
      setCity(editAddress.city);
      setEmirate(resolveEmirate(editAddress.state));
      setAddressType(resolveAddressType(editAddress.type));
    } else {
      setPoBox("");
      setAddress("");
      setCity("");
      setEmirate("");
      setAddressType("Home");
    }
    setError("");
    setSaving(false);
  }, [isOpen, editAddress]);

  const handleSave = async () => {
    if (!address.trim() || !city.trim() || !emirate) {
      setError("Please fill address, city, and emirate.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const customerId = getCustomerId();
      if (!customerId) {
        setError("Please sign in to save your address.");
        return;
      }

      if (isEditMode && editAddress) {
        const result = await updateAddress({
          customerId,
          addressId: editAddress.id,
          addressLine1: address.trim(),
          city: city.trim(),
          state: emirate,
          pincode: poBox.trim() || "00000",
          addressType,
          country: editAddress.country || UAE_COUNTRY,
          isDefault: editAddress.isDefault,
        });

        if (!result.status) {
          setError(result.message ?? "Could not update address.");
          return;
        }
      } else {
        const result = await addAddress({
          customerId,
          addressLine1: address.trim(),
          city: city.trim(),
          state: emirate,
          pincode: poBox.trim() || "00000",
          addressType,
          country: UAE_COUNTRY,
        });

        if (!result.status) {
          setError(result.message ?? "Could not save address.");
          return;
        }
      }

      onSaved?.();
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`${styles.backdrop} ${desktop ? styles.backdropDesktop : ""}`}
          data-lenis-prevent
          onClick={onClose}
        >
          <motion.div
            className={`${styles.sheet} ${desktop ? styles.sheetDesktop : ""}`}
            initial={
              desktop ? { opacity: 0, scale: 0.96, y: 12 } : { y: "100%" }
            }
            animate={desktop ? { opacity: 1, scale: 1, y: 0 } : { y: 0 }}
            exit={
              desktop ? { opacity: 0, scale: 0.96, y: 12 } : { y: "100%" }
            }
            transition={
              desktop
                ? { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
                : { type: "spring", damping: 28, stiffness: 320 }
            }
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-address-title"
          >
            {!desktop && <div className={styles.handle} />}

            <div className={styles.header}>
              <div className={styles.headerText}>
                <h2 id="add-address-title" className={styles.title}>
                  {isEditMode ? "Edit Address" : "Add New Address"}
                </h2>
                {desktop && (
                  <p className={styles.subtitle}>
                    {isEditMode
                      ? "Update your delivery details below."
                      : "Enter your UAE delivery location for faster checkout."}
                  </p>
                )}
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close"
              >
                <X size={desktop ? 20 : 24} />
              </button>
            </div>

            <div className={styles.divider} />

            <div className={styles.form} data-lenis-prevent>
              <div className={styles.field}>
                <span className={styles.label}>Address type</span>
                <div className={styles.typeRow}>
                  <button
                    type="button"
                    className={`${styles.typeBtn} ${
                      addressType === "Home" ? styles.typeBtnActive : ""
                    }`}
                    onClick={() => setAddressType("Home")}
                  >
                    <Home size={18} />
                    Home
                  </button>
                  <button
                    type="button"
                    className={`${styles.typeBtn} ${
                      addressType === "Work" ? styles.typeBtnActive : ""
                    }`}
                    onClick={() => setAddressType("Work")}
                  >
                    <Briefcase size={18} />
                    Work
                  </button>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="address-line">
                  Street address
                </label>
                <div className={styles.inputWrap}>
                  <MapPin size={18} className={styles.inputIcon} />
                  <input
                    id="address-line"
                    type="text"
                    className={styles.input}
                    placeholder="Villa/Apartment, Street, Area"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>
              </div>

              <div className={styles.gridRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="address-city">
                    City
                  </label>
                  <div className={styles.inputWrap}>
                    <Building2 size={18} className={styles.inputIcon} />
                    <input
                      id="address-city"
                      type="text"
                      className={styles.input}
                      placeholder="City"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="address-emirate">
                    Emirate
                  </label>
                  <div className={styles.selectWrap}>
                    <select
                      id="address-emirate"
                      className={styles.select}
                      value={emirate}
                      onChange={(event) => setEmirate(event.target.value)}
                    >
                      <option value="">Select emirate</option>
                      {UAE_EMIRATES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={18} className={styles.selectIcon} />
                  </div>
                </div>
              </div>

              <div className={styles.gridRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="address-pobox">
                    P.O. Box <span className={styles.optional}>(optional)</span>
                  </label>
                  <div className={styles.inputWrap}>
                    <Mailbox size={18} className={styles.inputIcon} />
                    <input
                      id="address-pobox"
                      type="text"
                      className={styles.input}
                      placeholder="P.O. Box"
                      value={poBox}
                      onChange={(event) => setPoBox(event.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="address-country">
                    Country
                  </label>
                  <div className={styles.inputWrap}>
                    <Globe size={18} className={styles.inputIcon} />
                    <input
                      id="address-country"
                      type="text"
                      className={`${styles.input} ${styles.inputReadonly}`}
                      value={UAE_DISPLAY_COUNTRY}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {error && <p className={styles.error}>{error}</p>}
            </div>

            <div className={styles.footer}>
              {desktop && (
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={onClose}
                  disabled={saving}
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                className={styles.saveBtn}
                onClick={handleSave}
                disabled={saving}
              >
                {saving
                  ? isEditMode
                    ? "Updating..."
                    : "Saving..."
                  : isEditMode
                    ? "Update Address"
                    : "Save Address"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
