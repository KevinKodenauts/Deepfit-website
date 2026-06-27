import type { CSSProperties, ReactNode } from "react";
import styles from "./CurrencySymbol.module.css";

/** UAE Dirham currency symbol (Unicode U+20C3). */
export const CURRENCY_SYMBOL = "\u20C3";

export const CURRENCY_FONT_FAMILY = "Dirham";

/** Dirham glyph renders larger than surrounding text at the same font size. */
export const CURRENCY_SYMBOL_SIZE_SCALE = 0.68;

type CurrencySymbolProps = {
  className?: string;
  size?: number | string;
  style?: CSSProperties;
};

export function CurrencySymbol({
  className,
  size,
  style,
}: CurrencySymbolProps) {
  const sizeStyle: CSSProperties | undefined =
    size !== undefined
      ? {
          fontSize:
            typeof size === "number"
              ? `${size * CURRENCY_SYMBOL_SIZE_SCALE}px`
              : `calc(${size} * ${CURRENCY_SYMBOL_SIZE_SCALE})`,
        }
      : undefined;

  return (
    <span
      className={`${styles.symbol} ${className ?? ""}`}
      style={{ ...sizeStyle, ...style }}
      aria-label="UAE Dirham"
    >
      {CURRENCY_SYMBOL}
    </span>
  );
}

type CurrencyAmountProps = {
  children: ReactNode;
  className?: string;
  symbolClassName?: string;
};

export function CurrencyAmount({
  children,
  className,
  symbolClassName,
}: CurrencyAmountProps) {
  return (
    <span className={`${styles.amount} ${className ?? ""}`}>
      <CurrencySymbol className={symbolClassName} />
      {children}
    </span>
  );
}
