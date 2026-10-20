import { z } from "zod";
import type { Dictionary } from "@/i18n";

/** Accepts +380XXXXXXXXX or 0XXXXXXXXX with any spaces, dashes or brackets. */
export function isUaPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return /^380\d{9}$/.test(digits) || /^0\d{9}$/.test(digits);
}

export function checkoutSchema(t: Dictionary) {
  const e = t.checkout.errors;
  return z
    .object({
      name: z.string().trim().min(2, e.name).max(60, e.name),
      phone: z.string().trim().refine(isUaPhone, e.phone),
      email: z
        .string()
        .trim()
        .refine((v) => v === "" || z.email().safeParse(v).success, e.email),
      method: z.enum(["delivery", "pickup"]),
      city: z.string().trim(),
      street: z.string().trim(),
      house: z.string().trim(),
      apartment: z.string().trim().max(10),
      comment: z.string().trim().max(500, e.comment),
      payment: z.enum(["cash", "card"]),
      timeMode: z.enum(["asap", "scheduled"]),
      time: z.string(),
      persons: z.string(),
      agree: z.boolean().refine((v) => v, e.agree),
    })
    .superRefine((data, ctx) => {
      if (data.method === "delivery") {
        if (!data.city) ctx.addIssue({ code: "custom", path: ["city"], message: e.city });
        if (!data.street) ctx.addIssue({ code: "custom", path: ["street"], message: e.street });
        if (!data.house) ctx.addIssue({ code: "custom", path: ["house"], message: e.house });
      }
      if (data.timeMode === "scheduled" && !data.time) {
        ctx.addIssue({ code: "custom", path: ["time"], message: e.time });
      }
    });
}

export type CheckoutValues = z.infer<ReturnType<typeof checkoutSchema>>;

export const checkoutDefaults: CheckoutValues = {
  name: "",
  phone: "",
  email: "",
  method: "delivery",
  city: "",
  street: "",
  house: "",
  apartment: "",
  comment: "",
  payment: "cash",
  timeMode: "asap",
  time: "",
  persons: "2",
  agree: false,
};

/** Random local demo order number, e.g. NORI-482193. */
export function demoOrderNumber(): string {
  const n = new Uint32Array(1);
  crypto.getRandomValues(n);
  return `NORI-${String(100000 + (n[0] % 900000))}`;
}
