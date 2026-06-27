"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  ChevronLeft,
  MapPin,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import AddAddressModal from "@/components/AddAddressModal";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAddresses } from "@/contexts/AddressContext";
import { deleteAddress, type AddressView } from "@/lib/api/addresses";
import { formatFullAddress, getAddressType } from "@/lib/addressDisplay";
import { getCustomerId } from "@/lib/auth/session";
import styles from "./addressesDesktop.module.css";

export default function AddressesDesktop() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSelectMode = searchParams.get("select") === "1";
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const {
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    refreshAddresses,
    isLoading,
    error,
  } = useAddresses();
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressView | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;

    refreshAddresses()
      .catch(() => undefined)
      .finally(() => setHasLoaded(true));
  }, [authLoading, isAuthenticated, refreshAddresses]);

  const loading = !hasLoaded || isLoading;

  const openAddForm = () => {
    setEditingAddress(null);
    setIsAddressFormOpen(true);
  };

  const openEditForm = (address: AddressView) => {
    setEditingAddress(address);
    setIsAddressFormOpen(true);
  };

  const handleSelect = (addressId: number) => {
    setSelectedAddressId(addressId);
    if (isSelectMode) {
      router.back();
    }
  };

  const handleDelete = async (address: AddressView) => {
    const customerId = getCustomerId();
    if (!customerId) return;

    const confirmed = window.confirm("Delete this address?");
    if (!confirmed) return;

    setDeletingId(address.id);

    try {
      const result = await deleteAddress(customerId, address.id);
      if (result.status) {
        await refreshAddresses();
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className={styles.shell}>
      <header className={styles.topBar}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={22} />
        </button>
        <div>
          <h1 className={styles.topTitle}>
            {isSelectMode ? "Select delivery address" : "My Addresses"}
          </h1>
          <p className={styles.topSubtitle}>
            {isSelectMode
              ? "Choose where you want your order delivered"
              : "Manage your saved delivery locations"}
          </p>
        </div>
      </header>

      <div className={styles.inner}>
        <div className={styles.toolbar}>
          <button type="button" className={styles.addBtn} onClick={openAddForm}>
            <Plus size={18} />
            Add new address
          </button>
        </div>

        {loading ? (
          <div className={styles.loadingWrap}>
            <div className={styles.loadingSpinner} />
            <p className={styles.loadingText}>Loading addresses...</p>
          </div>
        ) : error ? (
          <div className={styles.emptyState}>
            <MapPin size={64} className={styles.emptyIcon} />
            <h2 className={styles.emptyTitle}>Could not load addresses</h2>
            <p className={styles.emptyText}>{error}</p>
            <button
              type="button"
              className={styles.emptyBtn}
              onClick={() => void refreshAddresses()}
            >
              Try again
            </button>
          </div>
        ) : addresses.length === 0 ? (
          <div className={styles.emptyState}>
            <MapPin size={64} className={styles.emptyIcon} />
            <h2 className={styles.emptyTitle}>No addresses saved</h2>
            <p className={styles.emptyText}>
              Add a delivery address to start ordering from Deepfit.
            </p>
            <button type="button" className={styles.emptyBtn} onClick={openAddForm}>
              Add your first address
            </button>
          </div>
        ) : (
          <>
            <h2 className={styles.sectionTitle}>Your saved addresses</h2>
            <div className={styles.grid}>
              {addresses.map((address) => {
                const { label, icon: TypeIcon } = getAddressType(address);
                const isSelected = address.id === selectedAddressId;

                return (
                  <article
                    key={address.id}
                    className={`${styles.card} ${isSelected ? styles.cardSelected : ""}`}
                  >
                    <button
                      type="button"
                      className={styles.selectArea}
                      onClick={() => handleSelect(address.id)}
                    >
                      <span
                        className={`${styles.radio} ${isSelected ? styles.radioSelected : ""}`}
                        aria-hidden
                      >
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </span>

                      <span className={styles.typeIconWrap}>
                        <TypeIcon size={22} />
                      </span>

                      <span className={styles.cardBody}>
                        <span className={styles.cardTopRow}>
                          <span className={styles.cardTitle}>{label}</span>
                          {isSelected && (
                            <span className={styles.selectedBadge}>Selected</span>
                          )}
                          {address.isDefault && !isSelected && (
                            <span className={styles.defaultBadge}>Default</span>
                          )}
                        </span>
                        <span className={styles.addressText}>
                          {formatFullAddress(address)}
                        </span>
                        {address.phone && (
                          <span className={styles.phoneText}>{address.phone}</span>
                        )}
                      </span>
                    </button>

                    <div className={styles.cardActions}>
                      <button
                        type="button"
                        className={styles.actionBtn}
                        onClick={() => openEditForm(address)}
                        aria-label={`Edit ${label} address`}
                      >
                        <Pencil size={16} />
                        Edit
                      </button>
                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                        onClick={() => void handleDelete(address)}
                        disabled={deletingId === address.id}
                        aria-label={`Delete ${label} address`}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>

      <AddAddressModal
        isOpen={isAddressFormOpen}
        editAddress={editingAddress}
        onClose={() => {
          setIsAddressFormOpen(false);
          setEditingAddress(null);
        }}
        onSaved={refreshAddresses}
      />
    </div>
  );
}
