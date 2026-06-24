export function getSalePrice(price: number, discount?: number): number {
  if (!discount) {
    return price;
  }

  return roundCurrency(price * (1 - discount / 100));
}

export function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}
