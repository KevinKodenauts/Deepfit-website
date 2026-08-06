import styles from "@/styles/site/logo.module.css";

type LogoVariant = "color" | "white";

type LogoProps = {
  variant?: LogoVariant;
  height?: number;
  className?: string;
};

const SOURCES: Record<LogoVariant, string> = {
  color: "/images/logo/bcaa.png",
  white: "/images/logo/Deepfit-Logo-white.png",
};

export function Logo({ variant = "color", height = 44, className }: LogoProps) {
  return (
    <img
      src={SOURCES[variant]}
      alt="Deepfit — Wellness Inside Out"
      className={`${styles.logo} ${variant === "color" ? styles.logoColor : ""} ${className ?? ""}`}
      style={{ maxHeight: `${height}px` }}
    />
  );
}
