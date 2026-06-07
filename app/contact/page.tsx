import { Metadata } from "next";
import { ContactPage } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact Us | Rasgrand Guest House",
  description:
    "Get in touch with Rasgrand Guest House in Rasdhoo, Maldives. Find our contact details, service hours, and location information.",
};

export default function Contact() {
  return <ContactPage />;
}
