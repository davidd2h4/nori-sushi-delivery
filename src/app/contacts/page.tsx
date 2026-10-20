import type { Metadata } from "next";
import { ContactsView } from "@/components/info/ContactsView";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Контакти NORI (демонстраційні плейсхолдери) та форма зворотного зв'язку.",
};

export default function Page() {
  return <ContactsView />;
}
