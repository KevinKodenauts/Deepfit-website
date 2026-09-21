import { SITE_COMPANY, SITE_EMAIL, SITE_URL } from "@/lib/site";
import type { OrderAddress, OrderSummary } from "@/lib/api/orders";

export type InvoiceCustomer = {
  name?: string;
  email?: string;
  phone?: string;
  address?: OrderAddress;
};

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];
const TEENS = [
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const VAT_RATE = 0.05;

function formatMoney(amount: number) {
  return `AED ${amount.toLocaleString("en-AE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Split an VAT-inclusive total into subtotal + 5% VAT. */
function splitInclusiveVat(totalInclusive: number) {
  const vat = Math.round(totalInclusive * VAT_RATE * 100) / 100;
  const subtotal = Math.round((totalInclusive - vat) * 100) / 100;
  return { subtotal, vat, total: totalInclusive };
}

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function chunkToWords(n: number): string {
  if (n < 10) return ONES[n];
  if (n < 20) return TEENS[n - 10];
  if (n < 100) {
    const tens = TENS[Math.floor(n / 10)];
    const ones = ONES[n % 10];
    return ones ? `${tens} ${ones}` : tens;
  }
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  return rest
    ? `${ONES[hundreds]} Hundred ${chunkToWords(rest)}`
    : `${ONES[hundreds]} Hundred`;
}

function integerToWords(n: number): string {
  if (n === 0) return "Zero";
  const billion = Math.floor(n / 1_000_000_000);
  const million = Math.floor((n % 1_000_000_000) / 1_000_000);
  const thousand = Math.floor((n % 1_000_000) / 1000);
  const rest = n % 1000;
  const parts: string[] = [];
  if (billion) parts.push(`${chunkToWords(billion)} Billion`);
  if (million) parts.push(`${chunkToWords(million)} Million`);
  if (thousand) parts.push(`${chunkToWords(thousand)} Thousand`);
  if (rest) parts.push(chunkToWords(rest));
  return parts.join(" ");
}

function amountInWords(amount: number): string {
  const dirhams = Math.floor(Math.abs(amount));
  const fils = Math.round((Math.abs(amount) - dirhams) * 100);
  let result = integerToWords(dirhams);
  result += dirhams === 1 ? " Dirham" : " Dirhams";
  if (fils > 0) {
    result += ` and ${integerToWords(fils)}`;
    result += fils === 1 ? " Fil" : " Fils";
  }
  return `${result} only`;
}

function formatAddressHtml(address?: OrderAddress) {
  if (!address) return "—";
  const lines = [
    address.street,
    [address.city, address.postalCode].filter(Boolean).join(", "),
    address.country,
  ].filter(Boolean);
  return lines.length ? lines.map(escapeHtml).join("<br>") : "—";
}

const ICON_EMAIL = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`;
const ICON_WEB = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/></svg>`;

function invoiceLogoUrl() {
  if (typeof window === "undefined") return "/images/logo/bcaa.png";
  return `${window.location.origin}/images/logo/bcaa.png`;
}

function siteHost() {
  try {
    return new URL(SITE_URL).hostname.replace(/^www\./, "");
  } catch {
    return "www.deepfit.life";
  }
}

const INVOICE_STYLES = `
  .invoice-container,
  .invoice-container * {
    box-sizing: border-box;
  }

  .invoice-container {
    --ink: #15262c;
    --muted: #5d7179;
    --line: #d7e3e8;
    --soft: #f3f8fa;
    --brand: #1a637b;
    --brand-dark: #134e61;
    width: 210mm;
    min-height: 297mm;
    margin: auto;
    background: #ffffff;
    padding: 16mm 15mm 12mm;
    font-family: "Segoe UI", Arial, Helvetica, sans-serif;
    color: var(--ink);
    display: flex;
    flex-direction: column;
  }

  .invoice-body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 28px;
    margin-bottom: 22px;
  }

  .logo {
    width: 150px;
    height: auto;
    object-fit: contain;
  }

  .brand-meta {
    text-align: right;
    max-width: 300px;
  }

  .doc-label {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--brand);
    margin-bottom: 8px;
  }

  .brand-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 4px;
  }

  .brand-address {
    font-size: 11px;
    line-height: 1.5;
    color: var(--muted);
    margin-bottom: 10px;
  }

  .contact {
    font-size: 11.5px;
    font-weight: 600;
    line-height: 1.55;
    color: var(--ink);
  }

  .accent-bar {
    height: 4px;
    background: linear-gradient(90deg, #1a637b 0%, #2d8a6e 55%, #6b5ea8 100%);
    border-radius: 999px;
    margin-bottom: 20px;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 14px;
    margin-bottom: 22px;
  }

  .panel {
    background: var(--soft);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 14px 16px;
  }

  .panel-title {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--brand);
    margin-bottom: 10px;
  }

  .customer-name {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .customer-address {
    font-size: 12px;
    line-height: 1.55;
    color: var(--muted);
  }

  .meta-list {
    display: grid;
    gap: 8px;
  }

  .meta-item {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-size: 12px;
  }

  .meta-item .label {
    color: var(--muted);
    font-weight: 600;
  }

  .meta-item .value {
    font-weight: 700;
    text-align: right;
  }

  .items-card {
    border: 1px solid var(--line);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 18px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  .items-table th,
  .items-table td {
    padding: 12px 14px;
    font-size: 12px;
    text-align: left;
  }

  .items-table thead th {
    background: var(--brand);
    color: #ffffff;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .items-table tbody tr {
    border-bottom: 1px solid var(--line);
  }

  .items-table tbody tr:last-child {
    border-bottom: none;
  }

  .items-table tbody tr:nth-child(even) {
    background: #fafcfd;
  }

  .items-table .sr {
    width: 8%;
    text-align: center;
    color: var(--muted);
    font-weight: 600;
  }

  .items-table .product {
    width: 48%;
    font-weight: 600;
    line-height: 1.45;
  }

  .items-table .hsn {
    width: 12%;
    text-align: center;
    color: var(--muted);
  }

  .items-table .qty {
    width: 8%;
    text-align: center;
    font-weight: 600;
  }

  .items-table .amount,
  .items-table .total {
    width: 12%;
    text-align: right;
    white-space: nowrap;
  }

  .items-table thead .sr,
  .items-table thead .hsn,
  .items-table thead .qty,
  .items-table thead .amount,
  .items-table thead .total {
    text-align: center;
  }

  .items-table thead .amount,
  .items-table thead .total {
    text-align: right;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: 1.25fr 0.75fr;
    gap: 14px;
    margin-bottom: 8px;
  }

  .amount-words {
    background: var(--soft);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 14px 16px;
  }

  .amount-words .label {
    display: block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--brand);
    margin-bottom: 6px;
  }

  .amount-words .value {
    font-size: 13px;
    font-weight: 600;
    font-style: italic;
    line-height: 1.45;
  }

  .totals-card {
    border: 1px solid var(--line);
    border-radius: 12px;
    overflow: hidden;
  }

  .totals-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    font-size: 12px;
    border-bottom: 1px solid var(--line);
  }

  .totals-row:last-child {
    border-bottom: none;
  }

  .totals-row .label {
    color: var(--muted);
    font-weight: 600;
  }

  .totals-row .value {
    font-weight: 700;
  }

  .totals-row.grand {
    background: var(--brand);
    color: #ffffff;
    padding: 13px 14px;
  }

  .totals-row.grand .label,
  .totals-row.grand .value {
    color: #ffffff;
    font-size: 13px;
    letter-spacing: 0.02em;
  }

  .bottom-grid {
    display: grid;
    grid-template-columns: 1.25fr 0.75fr;
    gap: 14px;
    margin-top: 16px;
  }

  .terms {
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 14px 16px;
    font-size: 11.5px;
    color: var(--muted);
    line-height: 1.55;
  }

  .terms-title {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .terms p {
    margin: 0 0 4px;
  }

  .signature {
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    min-height: 128px;
  }

  .company-name {
    font-size: 13px;
    font-weight: 700;
    color: var(--brand);
    margin-bottom: 34px;
  }

  .signature-line {
    width: 118px;
    border-bottom: 1px solid var(--ink);
    margin-bottom: 8px;
  }

  .authorized {
    font-size: 11px;
    color: var(--muted);
    line-height: 1.4;
  }

  .footer {
    margin-top: 20px;
    background: var(--brand-dark);
    color: #ffffff;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 16px;
    font-size: 11.5px;
    font-weight: 600;
  }

  .footer-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .footer svg {
    display: block;
    flex-shrink: 0;
  }

  @media print {
    .invoice-container {
      width: 210mm;
      min-height: 297mm;
      margin: 0;
      padding: 14mm 14mm 10mm;
    }

    @page {
      size: A4;
      margin: 0;
    }
  }
`;

function buildInvoiceInnerHtml(
  order: OrderSummary,
  customer?: InvoiceCustomer,
) {
  const invoiceNo = order.orderNumber;
  const invoiceDate = formatDate(order.deliveredAt || order.orderDate);
  const customerName = customer?.name?.trim() || "Customer";
  const address =
    customer?.address || order.shippingAddress || order.billingAddress;
  const addressHtml = formatAddressHtml(address);
  const customerState =
    address?.state || address?.city || address?.country || "—";
  const sellerState = "Dubai";
  const grandTotal = order.grandTotal;
  const { subtotal, vat } = splitInclusiveVat(grandTotal);
  const logoUrl = invoiceLogoUrl();
  const website = `www.${siteHost()}`;

  const productRows = order.orderedProducts
    .map(
      (product, index) => `
            <tr>
                <td class="sr">${index + 1}</td>
                <td class="product">${escapeHtml(product.productName)}</td>
                <td class="hsn">—</td>
                <td class="qty">${product.quantity}</td>
                <td class="amount">${escapeHtml(formatMoney(product.unitPrice))}</td>
                <td class="total">${escapeHtml(formatMoney(product.totalPrice))}</td>
            </tr>`,
    )
    .join("");

  return `<style>${INVOICE_STYLES}</style>
<div class="invoice-container">
  <div class="invoice-body">
    <div class="header">
      <div>
        <img src="${escapeHtml(logoUrl)}" alt="DeepFit Logo" class="logo">
      </div>
      <div class="brand-meta">
        <div class="doc-label">Tax Invoice</div>
        <div class="brand-name">${escapeHtml(SITE_COMPANY.name)}</div>
        <div class="brand-address">${escapeHtml(SITE_COMPANY.address)}</div>
        <div class="contact">
          ${escapeHtml(SITE_EMAIL)}<br>
          ${escapeHtml(website)}
        </div>
      </div>
    </div>

    <div class="accent-bar"></div>

    <div class="meta-grid">
      <div class="panel">
        <div class="panel-title">Bill To</div>
        <div class="customer-name">${escapeHtml(customerName)}</div>
        <div class="customer-address">
          ${addressHtml}<br>
          ${escapeHtml(customerState)}
        </div>
      </div>
      <div class="panel">
        <div class="panel-title">Invoice Details</div>
        <div class="meta-list">
          <div class="meta-item">
            <span class="label">Invoice No</span>
            <span class="value">${escapeHtml(invoiceNo)}</span>
          </div>
          <div class="meta-item">
            <span class="label">Date</span>
            <span class="value">${escapeHtml(invoiceDate)}</span>
          </div>
          <div class="meta-item">
            <span class="label">Place of Supply</span>
            <span class="value">${escapeHtml(sellerState)}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="items-card">
      <table class="items-table">
        <thead>
          <tr>
            <th class="sr">No</th>
            <th class="product">Product / Service</th>
            <th class="hsn">HSN / SAC</th>
            <th class="qty">Qty</th>
            <th class="amount">Amount</th>
            <th class="total">Total</th>
          </tr>
        </thead>
        <tbody>
          ${productRows}
        </tbody>
      </table>
    </div>

    <div class="summary-grid">
      <div class="amount-words">
        <span class="label">Amount in Words</span>
        <span class="value">${escapeHtml(amountInWords(grandTotal))}</span>
      </div>
      <div class="totals-card">
        <div class="totals-row">
          <span class="label">Subtotal</span>
          <span class="value">${escapeHtml(formatMoney(subtotal))}</span>
        </div>
        <div class="totals-row">
          <span class="label">VAT (5%)</span>
          <span class="value">${escapeHtml(formatMoney(vat))}</span>
        </div>
        <div class="totals-row">
          <span class="label">Delivery</span>
          <span class="value">FREE</span>
        </div>
        <div class="totals-row grand">
          <span class="label">Total Amount</span>
          <span class="value">${escapeHtml(formatMoney(grandTotal))}</span>
        </div>
      </div>
    </div>

    <div class="bottom-grid">
      <div class="terms">
        <div class="terms-title">Terms &amp; Conditions</div>
        <p>1) Goods once delivered are subject to DeepFit's return and refund policy.</p>
        <p>2) Subject to Dubai jurisdiction.</p>
      </div>
      <div class="signature">
        <div class="company-name">DeepFit</div>
        <div class="signature-line"></div>
        <div class="authorized">Authorized Signatory</div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="footer-item">
      ${ICON_EMAIL}
      <span>${escapeHtml(SITE_EMAIL)}</span>
    </div>
    <div class="footer-item">
      ${ICON_WEB}
      <span>${escapeHtml(website)}</span>
    </div>
  </div>
</div>`;
}

export function buildOrderInvoiceHtml(
  order: OrderSummary,
  customer?: InvoiceCustomer,
) {
  const invoiceNo = order.orderNumber;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DeepFit Invoice - ${escapeHtml(invoiceNo)}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      font-family: "Segoe UI", Arial, Helvetica, sans-serif;
      color: #15262c;
    }
  </style>
</head>
<body>
${buildInvoiceInnerHtml(order, customer)}
</body>
</html>`;
}

function printInvoiceHtml(html: string) {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  const win = iframe.contentWindow;
  if (!doc || !win) {
    iframe.remove();
    throw new Error("Unable to prepare the invoice for download.");
  }

  doc.open();
  doc.write(html);
  doc.close();

  let printed = false;
  const cleanup = () => {
    window.setTimeout(() => iframe.remove(), 1500);
  };
  const triggerPrint = () => {
    if (printed) return;
    printed = true;
    win.focus();
    win.print();
    cleanup();
  };

  const images = Array.from(doc.images);
  if (images.length === 0) {
    window.setTimeout(triggerPrint, 250);
    return;
  }

  let remaining = images.length;
  const markDone = () => {
    remaining -= 1;
    if (remaining <= 0) triggerPrint();
  };
  images.forEach((image) => {
    if (image.complete) {
      markDone();
      return;
    }
    image.addEventListener("load", markDone, { once: true });
    image.addEventListener("error", markDone, { once: true });
  });
  window.setTimeout(triggerPrint, 1800);
}

async function saveInvoicePdf(order: OrderSummary, customer?: InvoiceCustomer) {
  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "-10000px";
  host.style.top = "0";
  host.style.background = "#ffffff";
  host.innerHTML = buildInvoiceInnerHtml(order, customer);
  document.body.appendChild(host);

  const element = host.querySelector(".invoice-container") as HTMLElement | null;
  if (!element) {
    host.remove();
    throw new Error("Unable to prepare the invoice for download.");
  }

  await Promise.all(
    Array.from(element.querySelectorAll("img")).map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    }),
  );

  try {
    const { default: html2pdf } = await import("html2pdf.js");
    await html2pdf()
      .set({
        filename: `DeepFit-Invoice-${order.orderNumber}.pdf`,
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
        },
        jsPDF: {
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        },
        margin: 0,
      })
      .from(element)
      .save();
  } finally {
    host.remove();
  }
}

export async function downloadOrderInvoice(
  order: OrderSummary,
  customer?: InvoiceCustomer,
) {
  try {
    await saveInvoicePdf(order, customer);
  } catch {
    printInvoiceHtml(buildOrderInvoiceHtml(order, customer));
  }
}
