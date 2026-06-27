"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ParsedCountry } from "react-international-phone";
import { useAuth } from "@/contexts/AuthContext";
import { updateCustomerProfile } from "@/lib/api/auth";
import { getProfileInitials } from "@/hooks/useProfilePage";
import {
  formatPhoneForApi,
  parseStoredPhone,
  validatePhoneNumber,
} from "@/lib/phone/utils";

export function useUpdateProfileForm(options?: { onSuccess?: () => void }) {
  const router = useRouter();
  const { user, refreshProfile } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<ParsedCountry>(
    () => parseStoredPhone("").country
  );
  const [altPhoneCountry, setAltPhoneCountry] = useState<ParsedCountry>(
    () => parseStoredPhone("").country
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [altPhoneError, setAltPhoneError] = useState("");

  useEffect(() => {
    if (!user) return;

    const displayName = user.customerName || user.name || "";
    const displayEmail = user.customerEmail || user.email || "";
    const primaryPhone = user.customerMobile || user.phone || "";
    const alternatePhone = user.customerAlterMobile || "";

    const primaryParsed = parseStoredPhone(primaryPhone);
    const altParsed = parseStoredPhone(alternatePhone);

    setName(displayName);
    setEmail(displayEmail);
    setPhone(primaryParsed.localNumber);
    setAltPhone(altParsed.localNumber);
    setPhoneCountry(primaryParsed.country);
    setAltPhoneCountry(altParsed.country);
    setError("");
    setPhoneError("");
    setAltPhoneError("");
  }, [user]);

  const initials = getProfileInitials(name || email || "User");

  const handleSubmit = async () => {
    if (!user?.id) return;

    setError("");
    setPhoneError("");
    setAltPhoneError("");

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter your name");
      return;
    }

    const primaryValidation = validatePhoneNumber(phone, phoneCountry);
    if (primaryValidation) {
      setPhoneError(primaryValidation);
      return;
    }

    const altValidation = validatePhoneNumber(altPhone, altPhoneCountry, {
      required: false,
    });
    if (altValidation) {
      setAltPhoneError(altValidation);
      return;
    }

    setLoading(true);

    try {
      const result = await updateCustomerProfile({
        customerId: user.id,
        customerName: trimmedName,
        customerMobile: formatPhoneForApi(phone, phoneCountry),
        customerAlterMobile: formatPhoneForApi(altPhone, altPhoneCountry),
        updatedBy: trimmedName,
      });

      if (!result.status) {
        setError(result.message ?? "Failed to update profile. Please try again.");
        return;
      }

      await refreshProfile();
      if (options?.onSuccess) {
        options.onSuccess();
      } else {
        router.back();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    router,
    user,
    name,
    setName,
    email,
    phone,
    setPhone,
    altPhone,
    setAltPhone,
    phoneCountry,
    setPhoneCountry,
    altPhoneCountry,
    setAltPhoneCountry,
    loading,
    error,
    phoneError,
    altPhoneError,
    initials,
    handleSubmit,
  };
}
