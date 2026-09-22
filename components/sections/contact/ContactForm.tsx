"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRightIcon, CheckIcon } from "lucide-react";
import { Field, FieldContent, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/common/Button";
import { ScrollReveal } from "@/components/animations";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  company: z.string().optional(),
  message: z.string().min(10, "Tell us a little more about the project."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    // Stub submit handler — no backend wired up in this pass.
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Contact form submission", values);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-xl border border-ah-muted/20 p-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ah-ink text-ah-bg">
          <CheckIcon className="h-5 w-5" />
        </span>
        <h3 className="font-heading text-h3 text-ah-ink">Message sent.</h3>
        <p className="text-body text-ah-muted">Thanks for reaching out — we&rsquo;ll follow up within one business day.</p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <ScrollReveal as="div" y={24}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <FieldContent>
              <Input id="name" placeholder="Jane Doe" aria-invalid={!!errors.name} {...register("name")} />
              <FieldError errors={[errors.name]} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <FieldContent>
              <Input id="email" type="email" placeholder="jane@company.com" aria-invalid={!!errors.email} {...register("email")} />
              <FieldError errors={[errors.email]} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="company">Company (optional)</FieldLabel>
            <FieldContent>
              <Input id="company" placeholder="Company name" {...register("company")} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="message">Project details</FieldLabel>
            <FieldContent>
              <Textarea
                id="message"
                rows={5}
                placeholder="Tell us about your product, timeline, and goals."
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              <FieldError errors={[errors.message]} />
            </FieldContent>
          </Field>

          <Button type="submit" size="lg" disabled={isSubmitting} icon={<ArrowUpRightIcon className="h-4 w-4" />}>
            {isSubmitting ? "Sending..." : "Send message"}
          </Button>
        </FieldGroup>
      </form>
    </ScrollReveal>
  );
}
