"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Building2, Home, Bookmark, Check, Edit2, Trash2 } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import styles from "./ChangeAddressModal.module.css";
import AddAddressModal from "./AddAddressModal";

interface Address {
  id: string;
  type: "Work" | "Home";
  address: string;
  phone: string;
  distance: string;
  isHere?: boolean;
}

interface ChangeAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: Address[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ChangeAddressModal({
  isOpen,
  onClose,
  addresses,
  selectedId,
  onSelect,
}: ChangeAddressModalProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useBodyScrollLock(isOpen);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className={styles.backdrop} data-lenis-prevent>
          <motion.div
            className={styles.modal}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className={styles.closeWrapper}>
              <button className={styles.closeBtn} onClick={onClose}>
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            <div className={styles.scrollArea} data-lenis-prevent>
              <button className={styles.addBtn} onClick={() => setIsAddModalOpen(true)}>
                + Add New Address
              </button>

              <h3 className={styles.sectionTitle}>Your saved addresses</h3>

              <div className={styles.addressList}>
                {addresses.map((addr) => {
                  const isSelected = addr.id === selectedId;
                  return (
                    <div
                      key={addr.id}
                      className={`${styles.addressCard} ${isSelected ? styles.selectedCard : ""}`}
                      onClick={() => onSelect(addr.id)}
                    >
                      <div className={styles.iconCol}>
                        <div className={styles.iconWrap}>
                          {isSelected && (
                            <div className={styles.checkBadge}>
                              <Check size={12} strokeWidth={4} />
                            </div>
                          )}
                          {addr.type === "Work" ? (
                            <Building2 size={28} className={styles.locationIcon} strokeWidth={2} />
                          ) : (
                            <Home size={28} className={styles.locationIcon} strokeWidth={2} />
                          )}
                        </div>
                        <span className={styles.iconLabel}>
                          {addr.isHere ? "You're here" : addr.distance}
                        </span>
                      </div>

                      <div className={styles.infoCol}>
                        <button className={styles.bookmarkBtn}>
                          <Bookmark size={20} />
                        </button>
                        <h4 className={styles.addressType}>{addr.type}</h4>
                        <p className={styles.addressText}>{addr.address}</p>
                        <p className={styles.phone}>
                          Phone number: <strong>{addr.phone}</strong>
                        </p>

                        <div className={styles.actionsRow}>
                          <button 
                            className={styles.actionBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsAddModalOpen(true);
                            }}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            className={styles.actionBtn}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className={styles.homeIndicator} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
      <AddAddressModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </>
  );
}
