"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  MoreVertical,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import type { AddressView } from "@/lib/api/addresses";
import AddAddressModal from "@/components/AddAddressModal";
import styles from "./addresses.module.css";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAddresses } from "@/contexts/AddressContext";
import { deleteAddress } from "@/lib/api/addresses";
import { formatFullAddress, getAddressType } from "@/lib/addressDisplay";
import { getCustomerId } from "@/lib/auth/session";

export default function AddressesMobile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSelectMode = searchParams.get("select") === "1";
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { addresses, selectedAddressId, setSelectedAddressId, refreshAddresses, error } =
    useAddresses();
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressView | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuAddress, setMenuAddress] = useState<AddressView | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;

    refreshAddresses()
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, [authLoading, isAuthenticated, refreshAddresses]);

  useEffect(() => {
    if (!menuAddress) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAddress(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuAddress]);

  const openAddForm = () => {
    setEditingAddress(null);
    setIsAddressFormOpen(true);
  };

  const openEditForm = (address: AddressView) => {
    setMenuAddress(null);
    setEditingAddress(address);
    setIsAddressFormOpen(true);
  };

  const handleDelete = async (address: AddressView) => {
    const customerId = getCustomerId();
    if (!customerId) return;

    const confirmed = window.confirm("Delete this address?");
    if (!confirmed) return;

    setMenuAddress(null);
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
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.pageTitle}>
          {isSelectMode ? "Select Address" : "My Addresses"}
        </h1>
      </header>

      <div className={styles.content}>
        <button type="button" className={styles.addRow} onClick={openAddForm}>
          <span className={styles.addIconWrap}>
            <Plus size={20} />
          </span>
          <span className={styles.addText}>Add new address</span>
        </button>

        {loading ? (
          <p className={styles.statusText}>Loading addresses...</p>
        ) : error ? (
          <div className={styles.emptyState}>
            <MapPin size={48} className={styles.emptyIcon} />
            <p className={styles.statusText}>{error}</p>
            <button
              type="button"
              className={styles.addRow}
              onClick={() => void refreshAddresses()}
            >
              Try again
            </button>
          </div>
        ) : addresses.length === 0 ? (
          <div className={styles.emptyState}>
            <MapPin size={48} className={styles.emptyIcon} />
            <p className={styles.statusText}>No addresses saved</p>
          </div>
        ) : (
          <>
            <h2 className={styles.sectionTitle}>Your saved addresses</h2>

            <div className={styles.addressList}>
              {addresses.map((address, index) => {
                const { label, icon: TypeIcon } = getAddressType(address);
                const isMenuOpen = menuAddress?.id === address.id;

                return (
                  <motion.article
                    key={address.id}
                    className={`${styles.addressCard} ${
                      isSelectMode && address.id === selectedAddressId
                        ? styles.addressCardSelected
                        : ""
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div
                      className={styles.cardMain}
                      role={isSelectMode ? "button" : undefined}
                      tabIndex={isSelectMode ? 0 : undefined}
                      onClick={
                        isSelectMode
                          ? () => {
                              setSelectedAddressId(address.id);
                              router.back();
                            }
                          : undefined
                      }
                      onKeyDown={
                        isSelectMode
                          ? (event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                setSelectedAddressId(address.id);
                                router.back();
                              }
                            }
                          : undefined
                      }
                    >
                      <div className={styles.typeIconWrap}>
                        <TypeIcon size={22} />
                      </div>

                      <div className={styles.cardBody}>
                        <div className={styles.cardTopRow}>
                          <div className={styles.titleRow}>
                            <h3 className={styles.addressLabel}>{label}</h3>
                            {address.isDefault && (
                              <span className={styles.defaultBadge}>Default</span>
                            )}
                          </div>

                          <div
                            className={styles.menuWrap}
                            ref={isMenuOpen ? menuRef : null}
                          >
                            <button
                              type="button"
                              className={styles.menuBtn}
                              onClick={() =>
                                setMenuAddress(isMenuOpen ? null : address)
                              }
                              aria-label="Address actions"
                              disabled={deletingId === address.id}
                            >
                              <MoreVertical size={18} />
                            </button>

                            <AnimatePresence>
                              {isMenuOpen && (
                                <motion.div
                                  className={styles.menu}
                                  initial={{ opacity: 0, y: -4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -4 }}
                                >
                                  <button
                                    type="button"
                                    className={styles.menuItem}
                                    onClick={() => openEditForm(address)}
                                  >
                                    <Pencil size={18} />
                                    <span>Edit Address</span>
                                  </button>
                                  <button
                                    type="button"
                                    className={`${styles.menuItem} ${styles.menuItemDanger}`}
                                    onClick={() => void handleDelete(address)}
                                  >
                                    <Trash2 size={18} />
                                    <span>Delete Address</span>
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <p className={styles.addressText}>
                          {formatFullAddress(address)}
                        </p>

                        {address.phone && (
                          <p className={styles.phoneText}>{address.phone}</p>
                        )}
                      </div>
                    </div>
                  </motion.article>
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
