export function Money(amount: number): string {
  return "₦" + Number(amount || 0).toLocaleString("en-NG");
}

export function MoneyFromKobo(amountKobo: number): string {
  return Money(amountKobo / 100);
}

export function fmtDate(d: string | number | Date): string {
  return new Date(d).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function fmtDateTime(d: string | number | Date): string {
  return new Date(d).toLocaleString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
