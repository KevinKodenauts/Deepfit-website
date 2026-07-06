import Image from "next/image";
import Link from "next/link";
import styles from "./welcome.module.css";

export default function WelcomeMobile() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.branding}>
          <Image
            src="/images/logo/Logo-white.png"
            alt="Deepfit - Wellness Inside Out"
            width={145}
            height={100}
            className={styles.logo}
            priority
          />
        </div>

        <div className={styles.heroWrap}>
          <Image
            src="/images/Login-Image.png"
            alt="Fitness products including supplements, kettlebell, and dumbbell"
            width={256}
            height={256}
            className={styles.heroImage}
            priority
          />
        </div>

        <div className={styles.card}>
          <h1 className={styles.title}>
            Your Fitness Store
            <br />
            <span className={styles.titleStrong}>Delivered Fast</span>
          </h1>
          <p className={styles.subtitle}>
            Shop supplements, gym essentials & wellness products in minutes.
          </p>

          <div className={styles.actions}>
            <Link href="/login" className={styles.loginBtn}>
              Login
            </Link>
            <Link href="/signup" className={styles.signupBtn}>
              Create Account
            </Link>
            <Link href="/home" className={styles.guestLink}>
              Continue as Guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
