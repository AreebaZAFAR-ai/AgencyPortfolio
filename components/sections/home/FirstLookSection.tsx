"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button";

export function FirstLookSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="first-look" className="relative isolate overflow-hidden py-section text-text-primary">
      <Image src="/assets/images/ffff.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-background/70" aria-hidden="true" />

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-(--space-lg) px-(--space-gutter) text-center">
        <h2 className="font-display text-h1">First look, every season.</h2>
        <p className="max-w-sm text-body text-text-secondary">
          Early access to new launches, and the occasional note on how they were made.
        </p>

        <form onSubmit={handleSubmit} className="mt-(--space-2xl) w-full max-w-xl text-left">
          <label htmlFor="first-look-email" className="type-eyebrow text-text-muted">
            Email address
          </label>
          <div className="mt-(--space-sm) flex items-end gap-(--space-md)">
            <input
              id="first-look-email"
              type="email"
              required
              placeholder="you@example.com"
              disabled={submitted}
              className="h-12 min-w-0 flex-1 border-b border-text-muted bg-transparent text-body text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-text-primary"
            />
            <Button type="submit" disabled={submitted}>
              {submitted ? "Joined" : "Join"}
            </Button>
          </div>
          <p className="mt-(--space-lg) text-center text-small text-text-muted">
            {submitted ? "Thanks, you’re on the list." : "No more than once a month. Unsubscribe anytime."}
          </p>
        </form>
      </div>
    </section>
  );
}
