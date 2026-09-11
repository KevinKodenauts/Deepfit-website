import { SITE_COMPANY, SITE_EMAIL } from "@/lib/site";
import type { OrderSummary } from "@/lib/api/orders";

type InvoiceCustomer = {
  name?: string;
  email?: string;
  phone?: string;
};

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
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function downloadOrderInvoice(
  order: OrderSummary,
  customer?: InvoiceCustomer,
) {
  const itemTotal = order.orderedProducts.reduce(
    (sum, product) => sum + product.totalPrice,
    0,
  );
  const invoiceNo = `DF-${order.orderNumber}`;
  const rows = order.orderedProducts
    .map(
      (product, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(product.productName)}</td>
          <td>${product.quantity}</td>
          <td>${formatMoney(product.unitPrice)}</td>
          <td>${formatMoney(product.totalPrice)}</td>
        </tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Invoice ${escapeHtml(invoiceNo)}</title>
  <style>
    body { font-family: Inter, Arial, sans-serif; color: #111; margin: 0; padding: 40px; }
    h1 { margin: 0; font-size: 28px; letter-spacing: 0.08em; }
    .muted { color: #667; font-size: 13px; }
    .header { display: flex; justify-content: space-between; gap: 24px; margin-bottom: 32px; }
    .box { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    th, td { padding: 10px 8px; text-align: left; border-bottom: 1px solid #eee; font-size: 13px; }
    th { background: #f8fafc; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; }
    td:nth-child(3), td:nth-child(4), td:nth-child(5),
    th:nth-child(3), th:nth-child(4), th:nth-child(5) { text-align: right; }
    .totals { margin-top: 20px; width: 280px; margin-left: auto; }
    .totals div { display: flex; justify-content: space-between; padding: 6px 0; }
    .grand { font-weight: 700; font-size: 16px; border-top: 1px solid #ddd; margin-top: 8px; padding-top: 10px; }
    @media print { body { padding: 16px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>DEEPFIT</h1>
      <p class="muted">${escapeHtml(SITE_COMPANY.name)}<br/>${escapeHtml(SITE_COMPANY.address)}<br/>${escapeHtml(SITE_EMAIL)}</p>
    </div>
    <div class="box">
      <div><strong>Invoice</strong> ${escapeHtml(invoiceNo)}</div>
      <div>Order #${escapeHtml(order.orderNumber)}</div>
      <div>Date: ${escapeHtml(formatDate(order.orderDate))}</div>
      <div>Status: ${escapeHtml(order.orderStatus)}</div>
    </div>
  </div>
  <div class="box">
    <strong>Bill to</strong>
    <div>${escapeHtml(customer?.name || "Customer")}</div>
    <div class="muted">${escapeHtml(customer?.email || "")}${customer?.phone ? ` · ${escapeHtml(customer.phone)}` : ""}</div>
  </div>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Item</th>
        <th>Qty</th>
        <th>Rate</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="totals">
    <div><span>Item total</span><span>${formatMoney(itemTotal)}</span></div>
    <div><span>Delivery</span><span>FREE</span></div>
    <div class="grand"><span>Grand total</span><span>${formatMoney(order.grandTotal)}</span></div>
  </div>
  <p class="muted" style="margin-top:40px">Thank you for shopping with Deepfit.</p>
</body>
</html>`;

  const popup = window.open("", "_blank", "noopener,noreferrer,width=900,height=700");
  if (!popup) {
    throw new Error("Please allow pop-ups to download the invoice.");
  }
  popup.document.open();
  popup.document.write(html);
  popup.document.close();
  popup.focus();
  window.setTimeout(() => {
    popup.print();
  }, 250);
}
