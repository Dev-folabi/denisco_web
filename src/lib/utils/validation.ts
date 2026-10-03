export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^(\+234|0)[789]\d{9}$/.test(phone.replace(/\s/g, ""));
}
