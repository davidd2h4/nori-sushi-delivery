export type NavKey = "menu" | "promotions" | "about" | "delivery" | "contacts";

export const navLinks: { key: NavKey; href: string }[] = [
  { key: "menu", href: "/menu" },
  { key: "promotions", href: "/promotions" },
  { key: "about", href: "/about" },
  { key: "delivery", href: "/delivery" },
  { key: "contacts", href: "/contacts" },
];

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
