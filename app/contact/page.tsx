import { Metadata } from "next";
import { ContactPage } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact Us | Ras Grand Guest House",
  description:
    "Get in touch with Ras Grand Guest House in Rasdhoo, Maldives. Find our contact details, service hours, and location information.",
};

export default function Contact() {
  return <ContactPage />;
}
