"use client";

import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PASSWORD_REQUIREMENTS } from "@/lib/validation";
import styles from "@/styles/signup/passwordGuidance.module.css";

type PasswordGuidanceProps = {
  htmlFor: string;
  label?: string;
};

export default function PasswordGuidance({
  htmlFor,
  label = "Password",
}: PasswordGuidanceProps) {
  return (
    <div className={styles.labelRow}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={styles.infoBtn}
            aria-label="Password requirements"
          >
            <Info size={16} strokeWidth={2.25} />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          className={styles.popover}
          sideOffset={8}
        >
          <p className={styles.popoverTitle}>Password must include</p>
          <ul className={styles.list}>
            {PASSWORD_REQUIREMENTS.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
