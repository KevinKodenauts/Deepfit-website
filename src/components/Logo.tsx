import Image from "next/image";
import styles from "./Logo.module.css";

type LogoVariant = "color" | "white";

interface LogoProps {
  variant?: LogoVariant;
  height?: number;
  className?: string;
  priority?: boolean;
}

const SOURCES: Record<LogoVariant, string> = {
  color: "/images/logo/bcaa.png",
  white: "/images/logo/Deepfit-Logo-white.png",
};

const DIMENSIONS: Record<LogoVariant, { width: number; height: number }> = {
  color: { width: 1200, height: 824 },
  white: { width: 580, height: 400 },
};

export default function Logo({
  variant = "color",
  height = 80,
  className,
  priority = false,
}: LogoProps) {
  const { width, height: intrinsicHeight } = DIMENSIONS[variant];

  return (
    <Image
      src={SOURCES[variant]}
      alt="Deepfit - Wellness Inside Out"
      width={width}
      height={intrinsicHeight}
      className={`${styles.logo} ${className ?? ""}`}
      style={{
        width: "auto",
        height: "auto",
        maxHeight: `var(--logo-max-height, ${height}px)`,
      }}
      priority={priority}
    />
  );
}
