"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Instagram,
  Facebook,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/constants";

const serviceHours = [
  {
    service: "Reception",
    hours: "7:00 AM - 12:00 AM",
    note: "Available to assist you",
  },
  {
    service: "Restaurant",
    hours: "7:00 AM - 12:00 AM",
    note: "Breakfast, lunch & dinner",
  },
  {
    service: "Room Service",
    hours: "7:00 AM - 12:00 AM",
    note: "In-room dining available",
  },
  {
    service: "Tours & Excursions",
    hours: "8:00 AM - 6:00 PM",
    note: "Book your adventures",
  },
  {
    service: "Airport Transfers",
    hours: "By arrangement",
    note: "Book 24 hours in advance",
  },
];

const faqs = [
  {
    question: "How do I get to Rasdhoo from Malé?",
    answer:
      "We can arrange a speedboat transfer from Malé (approximately 25 minutes) or you can take the public ferry (about 2 hours). Contact us to arrange your transfer.",
  },
  {
    question: "Is the beach close to the guest house?",
    answer:
      "Yes! The beautiful bikini beach is just a 5-minute walk from Ras Grand. We provide beach towels for your convenience.",
  },
  {
    question: "Do you offer diving and snorkeling trips?",
    answer:
      "Absolutely! We work with local dive operators to offer diving, snorkeling, dolphin watching, and other excursions. Just ask our front desk to book.",
  },
  {
    question: "Is breakfast included in the room rate?",
    answer:
      "Breakfast is included with our Family Room and Beach View Suite. For other rooms, breakfast can be added for $10 per person per day.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash (USD), major credit cards (Visa, Mastercard), and bank transfers. Please note that ATMs are limited on the island.",
  },
];

export function ContactPage() {
  const heroRef = useRef(null);
  const contactRef = useRef(null);
  const hoursRef = useRef(null);
  const faqRef = useRef(null);
  const formRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });
  const hoursInView = useInView(hoursRef, { once: true, margin: "-100px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });
  const formInView = useInView(formRef, { once: true, margin: "-100px" });

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
    "idle",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    // Simulate form submission
    setTimeout(() => {
      setFormStatus("sent");
    }, 1500);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[50vh] min-h-[350px] flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <Image
            src="/gallery/seatingarea.jpg"
            alt="Contact Ras Grand"
            fill
            className="object-cover object-[50%_35%]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            We&apos;re here to help make your stay perfect
          </p>
        </motion.div>
      </section>

      {/* Contact Info & Hours */}
      <section ref={contactRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-turquoise font-medium text-sm uppercase tracking-wider">
                Get In Touch
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Contact Information
              </h2>
              <p className="text-muted-foreground mb-8">
                Have questions or want to make a reservation? Reach out to us
                through any of the channels below. We typically respond within a
                few hours.
              </p>

              <div className="space-y-6">
                {/* Phone */}
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-start gap-4 p-4 bg-sand rounded-xl hover:bg-sand/80 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-ocean" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Phone</h3>
                    <p className="text-ocean font-semibold">
                      {siteConfig.phone}
                    </p>
                    <a
                      href={`tel:${siteConfig.phone2}`}
                      className="text-ocean font-semibold hover:underline"
                    >
                      {siteConfig.phone2}
                    </a>
                    <p className="text-muted-foreground text-sm">
                      Call us anytime
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(
                    /[^0-9]/g,
                    "",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-sand rounded-xl hover:bg-sand/80 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">WhatsApp</h3>
                    <p className="text-green-600 font-semibold">
                      {siteConfig.whatsapp}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Quick responses via chat
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-4 p-4 bg-sand rounded-xl hover:bg-sand/80 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-ocean" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Email</h3>
                    <p className="text-ocean font-semibold">
                      {siteConfig.email}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      For inquiries & reservations
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 bg-sand rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-ocean" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Location</h3>
                    <p className="text-foreground font-semibold">
                      {siteConfig.address.island}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {siteConfig.address.atoll}, {siteConfig.address.country}
                    </p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-center gap-4 pt-4">
                  <span className="text-muted-foreground text-sm">
                    Follow us:
                  </span>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-sand flex items-center justify-center hover:bg-ocean hover:text-white transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-sand flex items-center justify-center hover:bg-ocean hover:text-white transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Service Hours */}
            <motion.div
              ref={hoursRef}
              initial={{ opacity: 0, x: 30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-turquoise font-medium text-sm uppercase tracking-wider">
                When We&apos;re Available
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Service Hours
              </h2>
              <p className="text-muted-foreground mb-8">
                Our team is dedicated to providing you with excellent service
                throughout your stay.
              </p>

              <div className="bg-ocean-deep rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/20">
                  <Clock className="w-6 h-6 text-turquoise" />
                  <h3 className="font-serif text-xl font-semibold">
                    Operating Hours
                  </h3>
                </div>

                <div className="space-y-4">
                  {serviceHours.map((item, index) => (
                    <motion.div
                      key={item.service}
                      initial={{ opacity: 0, y: 10 }}
                      animate={hoursInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                    >
                      <div>
                        <p className="font-medium">{item.service}</p>
                        <p className="text-white/60 text-sm">{item.note}</p>
                      </div>
                      <span className="text-turquoise font-semibold text-right">
                        {item.hours}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={formRef} className="py-20 bg-sand">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-10">
              <span className="text-turquoise font-medium text-sm uppercase tracking-wider">
                Send Us a Message
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Inquiry Form
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>
            </div>

            {formStatus === "sent" ?
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-2xl text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. We&apos;ll respond to your inquiry
                  within 24 hours.
                </p>
                <Button
                  onClick={() => setFormStatus("idle")}
                  variant="outline"
                  className="rounded-full"
                >
                  Send Another Message
                </Button>
              </motion.div>
            : <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      placeholder="+1 234 567 8900"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      required
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us how we can help..."
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full bg-ocean-deep hover:bg-ocean text-white rounded-full h-12"
                >
                  {formStatus === "sending" ?
                    "Sending..."
                  : <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  }
                </Button>
              </form>
            }
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <span className="text-turquoise font-medium text-sm uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-sand rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-ocean shrink-0 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-muted-foreground">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
