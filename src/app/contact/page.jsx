"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import { Textarea } from "../../components/ui/textarea.jsx";
import { useToast } from "../../hooks/use-toast.js";
import { SUPPORT_EMAIL } from "../../lib/brand.js";

export default function ContactPage() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Message sent",
        description: "Thanks! We’ll reply soon. (Demo form – no backend connected.)",
      });
      setForm({ name: "", email: "", message: "" });
    }, 550);
  };

  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6 rounded-2xl border border-border/70 bg-gradient-to-r from-card to-secondary/35 p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Support</p>
          <h1 className="text-3xl font-semibold">Contact us</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Need help? Send a message or email us directly at{" "}
            <a className="font-medium text-primary underline-offset-4 hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="surface-card p-6 md:p-8">
            <h2 className="text-xl font-semibold">Send a message</h2>
            <form onSubmit={submit} className="mt-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  placeholder="Tell us what you need help with..."
                  required
                />
              </div>
              <Button type="submit" className="rounded-full px-6" disabled={submitting}>
                {submitting ? "Sending..." : "Send message"}
              </Button>
            </form>
          </section>

          <aside className="surface-card h-fit p-6 md:p-8 lg:sticky lg:top-24">
            <h3 className="text-lg font-semibold">Quick links</h3>
            <div className="mt-4 grid gap-2">
              <Button asChild variant="outline" className="justify-start rounded-xl">
                <Link href="/support">Help center</Link>
              </Button>
              <Button asChild variant="outline" className="justify-start rounded-xl">
                <Link href="/orders">Track an order</Link>
              </Button>
              <Button asChild variant="outline" className="justify-start rounded-xl">
                <Link href="/returns">Returns & refunds</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

