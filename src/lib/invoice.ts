import { SITE_EMAIL, SITE_URL } from "@/lib/site";
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

function formatMoney(amount: number) {
  return `AED ${amount.toLocaleString("en-AE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
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
  return `( ${result} only)`;
}

function formatAddressLines(address?: OrderAddress) {
  if (!address) return "";
  return [address.street, address.city, address.postalCode, address.country]
    .filter(Boolean)
    .join(", ");
}

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
            width: 210mm;
            min-height: 297mm;
            margin: auto;
            background: #ffffff;
            padding: 18mm 12mm;
            font-family: Arial, Helvetica, sans-serif;
            color: #222;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 18px;
        }

        .logo {
            width: 230px;
            height: auto;
            object-fit: contain;
        }

        .contact {
            text-align: right;
            font-size: 14px;
            font-weight: 600;
            padding-top: 8px;
            line-height: 1.5;
        }

        .invoice-title {
            border: 1px solid #222;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 45px;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 1px;
            position: relative;
        }

        .invoice-copy {
            position: absolute;
            right: 0;
            top: 0;
            height: 45px;
            width: 125px;
            border-left: 1px solid #222;
            font-size: 10px;
            font-weight: 500;
        }

        .invoice-copy div {
            height: 15px;
            display: flex;
            align-items: center;
            padding-left: 7px;
            border-bottom: 1px solid #222;
        }

        .invoice-copy div:last-child {
            border-bottom: none;
        }

        .info-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            border-left: 1px solid #222;
            border-right: 1px solid #222;
            border-bottom: 1px solid #222;
        }

        .info-left,
        .info-right {
            padding: 12px;
            min-height: 100px;
        }

        .info-left {
            border-right: 1px solid #222;
        }

        .info-row {
            display: grid;
            grid-template-columns: 95px 15px 1fr;
            font-size: 13px;
            margin-bottom: 8px;
        }

        .info-row .label {
            font-weight: 700;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        .items-table th,
        .items-table td {
            border: 1px solid #222;
            padding: 9px 7px;
            font-size: 12px;
        }

        .items-table th {
            text-align: center;
            font-weight: 700;
            height: 42px;
        }

        .items-table td {
            vertical-align: top;
        }

        .items-table .sr {
            width: 7%;
            text-align: center;
        }

        .items-table .product {
            width: 40%;
        }

        .items-table .hsn {
            width: 12%;
            text-align: center;
        }

        .items-table .qty {
            width: 8%;
            text-align: center;
        }

        .items-table .amount,
        .items-table .total {
            width: 16.5%;
            text-align: right;
        }

        .items-table tbody tr:not(.total-row) td {
            height: 52px;
        }

        .total-row td {
            height: 35px !important;
            vertical-align: middle !important;
            font-weight: 700;
        }

        .total-label {
            text-align: right;
        }

        .bottom-section {
            display: grid;
            grid-template-columns: 58% 42%;
            border-left: 1px solid #222;
            border-right: 1px solid #222;
            border-bottom: 1px solid #222;
        }

        .left-bottom {
            border-right: 1px solid #222;
        }

        .amount-words {
            min-height: 70px;
            padding: 12px;
            border-bottom: 1px solid #222;
            font-size: 13px;
        }

        .amount-words strong {
            display: block;
            margin-bottom: 8px;
        }

        .terms {
            padding: 12px;
            min-height: 85px;
            font-size: 12px;
        }

        .terms-title {
            font-weight: 700;
            margin-bottom: 10px;
        }

        .terms p {
            margin: 4px 0;
        }

        .signature {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 155px;
            text-align: center;
            font-size: 12px;
        }

        .company-name {
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 20px;
        }

        .signature-line {
            width: 100px;
            border-bottom: 1px solid #222;
            margin-bottom: 8px;
        }

        .authorized {
            line-height: 18px;
        }

        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 8px 0;
            font-size: 13px;
            font-weight: 600;
        }

        .footer-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .icon {
            font-size: 16px;
        }

        @media print {
            .invoice-container {
                width: 210mm;
                min-height: 297mm;
                margin: 0;
                padding: 18mm 12mm;
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
  const address = customer?.address || order.shippingAddress || order.billingAddress;
  const addressText = formatAddressLines(address) || "—";
  const customerState = address?.state || address?.city || address?.country || "—";
  const sellerState = "Dubai";
  const grandTotal = order.grandTotal;
  const logoUrl = invoiceLogoUrl();
  const website = `www.${siteHost()}`;
  const minRows = Math.max(order.orderedProducts.length, 3);

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

  const emptyRows = Array.from(
    { length: Math.max(0, minRows - order.orderedProducts.length) },
    () => `
            <tr>
                <td class="sr"></td>
                <td class="product"></td>
                <td class="hsn"></td>
                <td class="qty"></td>
                <td class="amount"></td>
                <td class="total"></td>
            </tr>`,
  ).join("");

  return `<style>${INVOICE_STYLES}</style>
<div class="invoice-container">
    <div class="header">
        <div>
            <img src="${escapeHtml(logoUrl)}" alt="DeepFit Logo" class="logo">
        </div>
        <div class="contact">
            ${escapeHtml(SITE_EMAIL)}<br>
            ${escapeHtml(website)}
        </div>
    </div>

    <div class="invoice-title">
        INVOICE
        <div class="invoice-copy">
            <div>Original for Recipient</div>
            <div>Duplicate</div>
            <div>Triplicate</div>
        </div>
    </div>

    <div class="info-section">
        <div class="info-left">
            <div class="info-row">
                <span class="label">Name</span>
                <span>:</span>
                <span>${escapeHtml(customerName)}</span>
            </div>
            <div class="info-row">
                <span class="label">Address</span>
                <span>:</span>
                <span>${escapeHtml(addressText)}</span>
            </div>
            <div class="info-row">
                <span class="label">State</span>
                <span>:</span>
                <span>${escapeHtml(customerState)}</span>
            </div>
        </div>
        <div class="info-right">
            <div class="info-row">
                <span class="label">Invoice No</span>
                <span>:</span>
                <span>${escapeHtml(invoiceNo)}</span>
            </div>
            <div class="info-row">
                <span class="label">Invoice Date</span>
                <span>:</span>
                <span>${escapeHtml(invoiceDate)}</span>
            </div>
            <div class="info-row">
                <span class="label">State</span>
                <span>:</span>
                <span>${escapeHtml(sellerState)}</span>
            </div>
        </div>
    </div>

    <table class="items-table">
        <thead>
            <tr>
                <th class="sr">Sr.<br>No</th>
                <th class="product">Name Of<br>Product/Service</th>
                <th class="hsn">HSN<br>SAC</th>
                <th class="qty">Qty</th>
                <th class="amount">Amount</th>
                <th class="total">Total</th>
            </tr>
        </thead>
        <tbody>
            ${productRows}
            ${emptyRows}
            <tr class="total-row">
                <td colspan="4"></td>
                <td class="total-label">Total:</td>
                <td class="total">${escapeHtml(formatMoney(grandTotal))}</td>
            </tr>
        </tbody>
    </table>

    <div class="bottom-section">
        <div class="left-bottom">
            <div class="amount-words">
                <strong>Total Invoice Amount in Words:</strong>
                ${escapeHtml(amountInWords(grandTotal))}
            </div>
            <div class="terms">
                <div class="terms-title">:Terms &amp; Conditions:</div>
                <p>1) Goods once delivered are subject to DeepFit's return and refund policy.</p>
                <p>(*Subject to Dubai Jurisdiction)</p>
            </div>
        </div>
        <div class="signature">
            <div class="company-name">DeepFit</div>
            <div class="signature-line"></div>
            <div class="authorized">
                Proprietor<br>
                (Authorized Signatory)
            </div>
        </div>
    </div>

    <div class="footer">
        <div class="footer-item">
            <span class="icon">✉</span>
            <span>${escapeHtml(SITE_EMAIL)}</span>
        </div>
        <div class="footer-item">
            <span class="icon">🌐</span>
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
        font-family: Arial, Helvetica, sans-serif;
        color: #222;
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
