"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ChevronLeft, Mail, MapPin, Phone, Send } from "lucide-react";
import { submitContactUs } from "@/lib/api/contact";
import styles from "./contact.module.css";
import { SITE_ADDRESS_LINES } from "@/lib/siteContact";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formError, setFormError] = useState("");

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setFormError("");
    setSuccessMessage("");
  };

  const validate = () => {
    const nextErrors: Partial<FormState> = {};

    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email";
    }
    if (!form.phone.trim()) nextErrors.phone = "Phone is required";
    if (!form.message.trim()) nextErrors.message = "Message is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !validate()) return;

    setIsSubmitting(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const result = await submitContactUs({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      });

      if (!result.ok) {
        setFormError(result.message);
        return;
      }

      setSuccessMessage(result.message);
      setForm(INITIAL_FORM);
    } catch {
      setFormError("Could not send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className={styles.headerTitle}>Contact Us</h1>
      </header>

      <div className={styles.shell}>
        <div className={styles.hero}>
          <span className={styles.eyebrow}>Get in touch</span>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.description}>
            Have a question about an order, product, or partnership? Send us a
            message and our team will get back to you shortly.
          </p>
        </div>

        <div className={styles.layout}>
          <aside className={styles.infoCard}>
            <h2>We&apos;re here to help</h2>
            <p>
              Reach out for order support, product guidance, or general
              inquiries. Our wellness specialists are ready to assist you.
            </p>

            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <Mail size={18} />
                </span>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:support@deepfit.life">support@deepfit.life</a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <Phone size={18} />
                </span>
                <div>
                  <strong>Phone</strong>
                  <a href="tel:+971501148044">+971 50 114 8044</a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <MapPin size={18} />
                </span>
                <div>
                  <strong>Location</strong>
                  {SITE_ADDRESS_LINES.map((line: string, idx: number) => (
                    <span key={idx}>
                      {idx > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
             
                </div>
              </div>
            </div>
          </aside>

          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {successMessage ? (
                <div className={styles.success}>{successMessage}</div>
              ) : null}
              {formError ? (
                <div className={styles.formError}>{formError}</div>
              ) : null}

              <div className={styles.field}>
                <label htmlFor="contact-name">Full name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={errors.name ? styles.fieldError : undefined}
                  placeholder="Your name"
                  autoComplete="name"
                />
                {errors.name ? (
                  <span className={styles.errorText}>{errors.name}</span>
                ) : null}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={errors.email ? styles.fieldError : undefined}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {errors.email ? (
                  <span className={styles.errorText}>{errors.email}</span>
                ) : null}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-phone">Phone</label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={errors.phone ? styles.fieldError : undefined}
                  placeholder="+971 50 000 0000"
                  autoComplete="tel"
                />
                {errors.phone ? (
                  <span className={styles.errorText}>{errors.phone}</span>
                ) : null}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={errors.message ? styles.fieldError : undefined}
                  placeholder="How can we help you?"
                />
                {errors.message ? (
                  <span className={styles.errorText}>{errors.message}</span>
                ) : null}
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                <Send size={16} />
                {isSubmitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
