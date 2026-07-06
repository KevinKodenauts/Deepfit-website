import { CUSTOMER_PORTAL, portalUrl } from "./config";
import { apiRequest } from "./client";

export type OrderItemPayload = {
  productId: number;
  quantity: number;
  variantId?: number;
};

export type OrderProduct = {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image?: string;
  lastTrackedStatus?: string;
};

export type OrderSummary = {
  id: number;
  orderNumber: string;
  orderStatus: string;
  orderDate: string;
  grandTotal: number;
  isPaid: boolean;
  paymentStatus?: string;
  orderedProducts: OrderProduct[];
};

type RawOrderProduct = {
  id: number;
  qty?: string | number;
  unitPrice?: string | number;
  finalAmount?: string | number;
  lastTrackedStatus?: string;
  productDetail?: {
    id?: number;
    productname?: string;
    productName?: string;
    productGallery?: string | string[];
  };
  variantDetail?: {
    id?: number;
    variantImageGallery?: string | string[];
    price?: string;
    variantkey?: string;
  };
};

type RawOrder = {
  id: number;
  orderNo?: string;
  orderNumber?: string;
  orderStatus: string;
  orderDate: string;
  netAmount?: string | number;
  grandTotal?: string | number;
  paymentStatus?: string;
  isPaid?: boolean;
  products?: RawOrderProduct[];
  orderedProducts?: Array<{
    id: number;
    productName: string;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
  }>;
};

type OrdersResponse = {
  status: boolean;
  customerOrderList?: RawOrder[];
  orderList?: RawOrder[];
};

function parseGallery(gallery?: string | string[]): string | undefined {
  if (!gallery) return undefined;
  if (Array.isArray(gallery)) return gallery[0] || undefined;

  const trimmed = gallery.trim();
  if (!trimmed) return undefined;

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (Array.isArray(parsed)) return String(parsed[0] ?? "");
  } catch {
    // Fall through to comma-separated parsing.
  }

  return trimmed.split(",")[0]?.trim() || undefined;
}

function mapOrderProduct(product: RawOrderProduct): OrderProduct {
  const productName =
    product.productDetail?.productName ??
    product.productDetail?.productname ??
    "Product";

  const image =
    parseGallery(product.variantDetail?.variantImageGallery) ??
    parseGallery(product.productDetail?.productGallery);

  return {
    id: product.id,
    productName,
    quantity: Number(product.qty ?? 1),
    unitPrice: Number(product.unitPrice ?? 0),
    totalPrice: Number(product.finalAmount ?? product.unitPrice ?? 0),
    image,
    lastTrackedStatus: product.lastTrackedStatus,
  };
}

function mapOrder(order: RawOrder): OrderSummary {
  const orderedProducts = order.products?.length
    ? order.products.map(mapOrderProduct)
    : (order.orderedProducts ?? []).map((product) => ({
        id: product.id,
        productName: product.productName,
        quantity: product.quantity,
        unitPrice: Number(product.unitPrice ?? 0),
        totalPrice: Number(product.totalPrice ?? 0),
      }));

  const paymentStatus = order.paymentStatus?.toLowerCase();
  const isPaid =
    order.isPaid ??
    (paymentStatus === "paid" ||
      paymentStatus === "success" ||
      paymentStatus === "completed");

  return {
    id: order.id,
    orderNumber: order.orderNo ?? order.orderNumber ?? String(order.id),
    orderStatus: order.orderStatus,
    orderDate: order.orderDate,
    grandTotal: Number(order.netAmount ?? order.grandTotal ?? 0),
    isPaid,
    paymentStatus: order.paymentStatus,
    orderedProducts,
  };
}

export async function getCustomerOrders(
  customerId: number
): Promise<OrderSummary[]> {
  const data = await apiRequest<OrdersResponse>(
    portalUrl("/orderbycustomer"),
    { method: "POST", body: { customerId }, auth: true }
  );

  const orders = data.customerOrderList ?? data.orderList ?? [];
  return orders.map(mapOrder);
}

export function groupOrdersByNumber(orders: OrderSummary[]): OrderSummary[] {
  const grouped = new Map<string, OrderSummary>();

  for (const order of orders) {
    const existing = grouped.get(order.orderNumber);
    if (!existing) {
      grouped.set(order.orderNumber, { ...order });
      continue;
    }

    grouped.set(order.orderNumber, {
      ...existing,
      orderedProducts: [...existing.orderedProducts, ...order.orderedProducts],
      grandTotal: existing.grandTotal + order.grandTotal,
    });
  }

  return Array.from(grouped.values());
}

export type OrderStatusFilter =
  | "All Orders"
  | "In Transit"
  | "Shipping"
  | "Return"
  | "Cancel";

export function filterOrdersByStatus(
  orders: OrderSummary[],
  filter: OrderStatusFilter
): OrderSummary[] {
  if (filter === "All Orders") return orders;

  return orders.filter((order) => {
    const status = order.orderStatus.toLowerCase();
    switch (filter) {
      case "In Transit":
        return status.includes("in transit") || status.includes("in progress");
      case "Shipping":
        return status.includes("shipping") || status.includes("dispatch");
      case "Return":
        return status.includes("return");
      case "Cancel":
        return status.includes("cancel");
      default:
        return true;
    }
  });
}

export type PlaceOrderResult = {
  status: boolean;
  message?: string;
  orderId?: number;
  orderNumber?: string;
  paymentRequired?: boolean;
  paymentUrl?: string;
  paymentIntentId?: string;
  isPaid?: boolean;
};

export async function placeOrder(payload: {
  customerId: number;
  addressId: number;
  paymentMethod: string;
  items: OrderItemPayload[];
  couponCode?: string;
  subtotal?: number;
  shippingCost?: number;
  discountAmount?: number;
  grandTotal?: number;
  platform?: "web" | "app";
}) {
  return apiRequest<PlaceOrderResult>(portalUrl("/addcustomerorder"), {
    method: "POST",
    body: {
      customerId: payload.customerId,
      addressId: payload.addressId,
      shippingAddressId: payload.addressId,
      billingAddressId: payload.addressId,
      paymentMethod: payload.paymentMethod,
      platform: payload.platform ?? "web",
      subtotal: payload.subtotal,
      shippingCost: payload.shippingCost,
      discountAmount: payload.discountAmount,
      grandTotal: payload.grandTotal,
      items: payload.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        variantId: item.variantId,
      })),
      ...(payload.couponCode ? { couponCode: payload.couponCode } : {}),
    },
    auth: true,
  });
}

export async function verifyZiinaPayment(payload: {
  orderId?: number | string;
  paymentIntentId?: string;
}) {
  return apiRequest<{
    status: boolean;
    message?: string;
    orderId?: number;
    orderNumber?: string;
    isPaid?: boolean;
    paymentStatus?: string;
  }>(portalUrl("/verifyziinapayment"), {
    method: "POST",
    body: {
      orderId: payload.orderId,
      paymentIntentId: payload.paymentIntentId,
    },
    auth: true,
  });
}

/** Start Ziina checkout via the Next.js server (works even if Django is not updated yet). */
export async function startZiinaPayment(payload: {
  orderId: number | string;
  orderNumber: string;
  amount: number;
}) {
  const response = await fetch("/api/payments/ziina/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json().catch(() => null)) as {
    status?: boolean;
    message?: string;
    paymentUrl?: string;
    paymentIntentId?: string;
  } | null;

  if (!response.ok || !data?.status || !data.paymentUrl) {
    throw new Error(data?.message ?? "Could not start payment");
  }

  return data as {
    status: true;
    paymentUrl: string;
    paymentIntentId?: string;
  };
}

/** Verify Ziina payment via the Next.js server, then best-effort sync to Django. */
export async function confirmZiinaPayment(payload: {
  orderId?: number | string;
  paymentIntentId?: string;
  amount?: number;
  accessToken?: string | null;
}) {
  const response = await fetch("/api/payments/ziina/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId: payload.orderId,
      paymentIntentId: payload.paymentIntentId,
      amount: payload.amount,
      accessToken: payload.accessToken ?? undefined,
    }),
  });
  const data = (await response.json().catch(() => null)) as {
    status?: boolean;
    message?: string;
    isPaid?: boolean;
    paymentStatus?: string;
    orderId?: number | string;
    paymentIntentId?: string;
  } | null;

  return {
    status: Boolean(data?.status),
    message: data?.message,
    isPaid: data?.isPaid,
    paymentStatus: data?.paymentStatus,
    orderId: data?.orderId,
    paymentIntentId: data?.paymentIntentId,
  };
}

export async function getShippingCharge(customerId: number, pincode: string) {
  const data = await apiRequest<{ status: boolean; shippingCharge: number }>(
    portalUrl("/getshippingcharge"),
    {
      method: "POST",
      body: { customerId, pincode },
      auth: true,
    }
  );
  return data.shippingCharge ?? 0;
}

export async function validateCoupon(customerId: number, couponCode: string) {
  return apiRequest<{ status: boolean; message?: string }>(
    portalUrl("/checkoffercouponvalidity"),
    {
      method: "POST",
      body: { customerId, couponCode },
      auth: true,
    }
  );
}
