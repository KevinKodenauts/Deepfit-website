"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  ChevronRight,
  MapPinOff,
  Home,
  Building2,
  Check,
  Pencil,
} from "lucide-react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import type { AddressView } from "@/lib/api/addresses";
import styles from "./SelectAddressSheet.module.css";
import AddAddressModal from "./AddAddressModal";

type SelectAddressSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  addresses: AddressView[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onAddressesUpdated: () => void;
};

function formatFullAddress(address: AddressView): string {
  return [address.address, address.city, address.state, address.pincode, address.country]
    .filter(Boolean)
    .join(", ");
}

export default function SelectAddressSheet({
  isOpen,
  onClose,
  addresses,
  selectedId,
  onSelect,
  onAddressesUpdated,
}: SelectAddressSheetProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<AddressView | null>(null);

  useBodyScrollLock(isOpen);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className={styles.backdrop} data-lenis-prevent onClick={onClose}>
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
                <h2 className={styles.title}>Select Address</h2>
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={onClose}
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>

              <div className={styles.divider} />

              <div className={styles.content}>
                <button
                  type="button"
                  className={styles.addRow}
                  onClick={() => setIsAddOpen(true)}
                >
                  <span className={styles.addIconWrap}>
                    <Plus size={20} />
                  </span>
                  <span className={styles.addText}>Add New Address</span>
                  <ChevronRight size={18} className={styles.chevron} />
                </button>

                {addresses.length === 0 ? (
                  <div className={styles.emptyState}>
                    <MapPinOff size={64} className={styles.emptyIcon} />
                    <p className={styles.emptyTitle}>No addresses saved</p>
                    <p className={styles.emptySubtitle}>Add an address to continue</p>
                  </div>
                ) : (
                  <div className={styles.addressList}>
                    {addresses.map((address) => {
                      const isSelected = address.id === selectedId;
                      const isWork =
                        address.type.toLowerCase().includes("work") ||
                        address.type.toLowerCase().includes("office");
                      const Icon = isWork ? Building2 : Home;

                      return (
                        <div
                          key={address.id}
                          className={`${styles.addressCard} ${isSelected ? styles.addressCardSelected : ""}`}
                        >
                          <button
                            type="button"
                            className={styles.addressSelectBtn}
                            onClick={() => {
                              onSelect(address.id);
                              onClose();
                            }}
                          >
                            <span
                              className={`${styles.radio} ${isSelected ? styles.radioSelected : ""}`}
                            >
                              {isSelected && <Check size={14} strokeWidth={3} />}
                            </span>

                            <span className={styles.addressIconWrap}>
                              <Icon size={20} />
                            </span>

                            <span className={styles.addressInfo}>
                              <span className={styles.addressTitleRow}>
                                <span className={styles.addressType}>{address.type}</span>
                                {isSelected && (
                                  <span className={styles.selectedBadge}>Selected</span>
                                )}
                              </span>
                              <span className={styles.addressText}>
                                {formatFullAddress(address)}
                              </span>
                            </span>
                          </button>

                          <button
                            type="button"
                            className={styles.editBtn}
                            aria-label={`Edit ${address.type} address`}
                            onClick={() => {
                              setEditAddress(address);
                            }}
                          >
                            <Pencil size={18} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AddAddressModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSaved={async () => {
          await onAddressesUpdated();
          setIsAddOpen(false);
        }}
      />

      <AddAddressModal
        isOpen={editAddress != null}
        editAddress={editAddress}
        onClose={() => setEditAddress(null)}
        onSaved={async () => {
          await onAddressesUpdated();
          setEditAddress(null);
        }}
      />
    </>
  );
}
