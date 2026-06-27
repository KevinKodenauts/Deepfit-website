"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getAddresses, type AddressView } from "@/lib/api/addresses";
import { useAuth } from "@/contexts/AuthContext";
import { getCustomerId } from "@/lib/auth/session";
import { useRequestGuard } from "@/hooks/useRequestGuard";

const SELECTED_ADDRESS_KEY = "deepfit:selectedAddressId";

export function formatAddressLabel(address: AddressView | null): string {
  if (!address) return "SELECT ADDRESS";

  const label = (address.addressLabel ?? address.type ?? "").toUpperCase();
  if (label.includes("HOME")) return "HOME";
  if (label.includes("WORK")) return "WORK";
  return label || "OTHER";
}

export function formatUserName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "User";
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

type AddressContextValue = {
  addresses: AddressView[];
  selectedAddressId: number | null;
  selectedAddress: AddressView | null;
  locationLine: string;
  isLoading: boolean;
  error: string | null;
  setSelectedAddressId: (id: number) => void;
  refreshAddresses: () => Promise<void>;
};

const AddressContext = createContext<AddressContextValue | null>(null);

function readStoredAddressId(): number | null {
  if (typeof window === "undefined") return null;

  const stored = window.localStorage.getItem(SELECTED_ADDRESS_KEY);
  if (!stored) return null;

  const parsed = Number(stored);
  return Number.isFinite(parsed) ? parsed : null;
}

export function AddressProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, sessionVersion } = useAuth();
  const { begin, isActive } = useRequestGuard();
  const lastSessionVersionRef = useRef(0);
  const [addresses, setAddresses] = useState<AddressView[]>([]);
  const [selectedAddressId, setSelectedAddressIdState] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayName = user?.name ?? user?.customerName ?? "User";

  const selectedAddress = useMemo(
    () =>
      addresses.find((address) => address.id === selectedAddressId) ??
      addresses.find((address) => address.isDefault) ??
      addresses[0] ??
      null,
    [addresses, selectedAddressId]
  );

  const locationLine = useMemo(() => {
    if (!isAuthenticated || addresses.length === 0) return "SELECT ADDRESS";
    const address = selectedAddress ?? addresses[0];
    return `${formatAddressLabel(address)} - ${formatUserName(displayName)}`;
  }, [addresses, selectedAddress, displayName, isAuthenticated]);

  const setSelectedAddressId = useCallback((id: number) => {
    setSelectedAddressIdState(id);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SELECTED_ADDRESS_KEY, String(id));
    }
  }, []);

  const refreshAddresses = useCallback(async () => {
    const customerId = getCustomerId();
    if (!customerId) {
      setAddresses([]);
      setSelectedAddressIdState(null);
      return;
    }

    const request = begin();
    setIsLoading(true);
    setError(null);

    try {
      const list = await getAddresses(customerId);
      if (!isActive(request)) return;

      setAddresses(list);

      if (list.length === 0) {
        setSelectedAddressIdState(null);
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(SELECTED_ADDRESS_KEY);
        }
        return;
      }

      setSelectedAddressIdState((prev) => {
        const storedId = readStoredAddressId();
        const candidateIds = [prev, storedId].filter(
          (id): id is number => id != null
        );

        for (const id of candidateIds) {
          if (list.some((item) => item.id === id)) {
            return id;
          }
        }

        const defaultAddress = list.find((item) => item.isDefault) ?? list[0];
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            SELECTED_ADDRESS_KEY,
            String(defaultAddress.id)
          );
        }
        return defaultAddress.id;
      });
    } catch (err) {
      if (!isActive(request)) return;
      setAddresses([]);
      setSelectedAddressIdState(null);
      setError(
        err instanceof Error ? err.message : "Could not load addresses."
      );
    } finally {
      if (isActive(request)) {
        setIsLoading(false);
      }
    }
  }, [begin, isActive]);

  useEffect(() => {
    if (!isAuthenticated) {
      setAddresses([]);
      setSelectedAddressIdState(null);
      return;
    }

    void refreshAddresses();
  }, [isAuthenticated, refreshAddresses]);

  useEffect(() => {
    if (sessionVersion === lastSessionVersionRef.current) return;

    lastSessionVersionRef.current = sessionVersion;
    if (sessionVersion === 0 || !isAuthenticated) return;

    void refreshAddresses();
  }, [sessionVersion, isAuthenticated, refreshAddresses]);

  const value = useMemo(
    () => ({
      addresses,
      selectedAddressId,
      selectedAddress,
      locationLine,
      isLoading,
      error,
      setSelectedAddressId,
      refreshAddresses,
    }),
    [
      addresses,
      selectedAddressId,
      selectedAddress,
      locationLine,
      isLoading,
      error,
      setSelectedAddressId,
      refreshAddresses,
    ]
  );

  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
}

export function useAddresses() {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddresses must be used within AddressProvider");
  }
  return context;
}
