export function buildProductHref(productId: number, productIds: number[]) {
  const unique = [...new Set(productIds.filter((id) => id > 0))];
  if (unique.length <= 1) {
    return `/product/${productId}`;
  }
  return `/product/${productId}?list=${unique.join(",")}`;
}

export function parseProductList(
  listParam: string | null,
  currentId: number
): number[] {
  if (!listParam) return [currentId];

  const ids = listParam
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((id) => id > 0);

  const unique = [...new Set(ids)];
  if (!unique.includes(currentId)) {
    unique.unshift(currentId);
  }

  return unique.length > 0 ? unique : [currentId];
}
