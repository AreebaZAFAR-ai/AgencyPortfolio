
"use client";

import { useState, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRightIcon, CheckIcon } from "lucide-react";

import { services } from "@/data/services";
import { Button } from "@/components/common/Button";
import { ScrollReveal } from "@/components/animations";
import { cn } from "@/lib/utils";

const budgetOptions = [
  "< $500",
  "$1k – $5k",
  "$5k – $10k",
  "$10k +",
] as const;

const OTHER_SERVICE = "Other services";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your full name."),
  email: z.email("Enter a valid email address."),
  company: z.string().optional(),
  services: z
    .array(z.string())
    .min(1, "Pick at least one service."),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, "Tell us a little more about the project."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputClass = `
  w-full
  rounded-lg
  border
  border-border-subtle
  bg-surface
  px-(--space-md)
  py-(--space-md)
  text-body
  text-text-primary
  transition-colors
  duration-300
  placeholder:text-text-muted
  focus:border-text-secondary
  focus:outline-none
  focus:ring-0
`;

interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: FieldProps) {
  const Label = htmlFor ? "label" : "p";

  return (
    <div className="w-full">
      <div className="mb-(--space-sm)">
        <Label
          {...(htmlFor ? { htmlFor } : {})}
          className="block text-small font-medium text-text-primary"
        >
          {label}
        </Label>

        {hint && (
          <span className="mt-1 block text-small text-text-muted">
            {hint}
          </span>
        )}
      </div>

      {children}

      {error && (
        <p
          role="alert"
          className="mt-(--space-xs) text-small text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      data-cursor="hover"
      className={cn(
        "inline-flex h-10 items-center gap-(--space-xs) rounded-full border px-(--space-md) text-small font-medium transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary",
        selected
          ? "border-text-primary bg-text-primary text-background"
          : "border-border-subtle bg-surface text-text-secondary hover:border-text-secondary hover:text-text-primary"
      )}
    >
      {selected && (
        <CheckIcon
          className="size-3.5"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  );
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      services: [],
      budget: undefined,
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    console.log("Contact form submission", values);

    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-(--space-lg) py-(--space-3xl) text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-text-primary text-background">
          <CheckIcon className="size-6" />
        </span>

        <h3 className="font-display text-h2 text-text-primary">
          Message sent.
        </h3>

        <p className="max-w-md text-body-lg text-text-secondary">
          Thanks for reaching out — we&rsquo;ll follow up
          within one business day.
        </p>

        <Button
          variant="outline"
          onClick={() => setSubmitted(false)}
        >
          Send another enquiry
        </Button>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-3xl">

        {/* HEADING */}
        <div className="mb-(--space-3xl) flex flex-col items-center gap-(--space-lg) text-center">
          <h2 className="font-display text-h1 text-text-primary">
            Tell us about your project
          </h2>

          <p className="max-w-xl text-body-lg text-text-secondary">
            Share a few details and let&rsquo;s create
            something meaningful together.
          </p>
        </div>

        <ScrollReveal as="div" y={24}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mx-auto w-full"
          >

            {/* NAME */}
            <div className="mb-(--space-xl)">
              <Field
                label="Your name"
                htmlFor="name"
                error={errors.name?.message}
              >
                <input
                  id="name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  className={inputClass}
                  {...register("name")}
                />
              </Field>
            </div>

            {/* EMAIL */}
            <div className="mb-(--space-xl)">
              <Field
                label="Email address"
                htmlFor="email"
                error={errors.email?.message}
              >
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className={inputClass}
                  {...register("email")}
                />
              </Field>
            </div>

            {/* COMPANY */}
            <div className="mb-(--space-xl)">
              <Field
                label="Company"
                htmlFor="company"
                hint="Optional"
              >
                <input
                  id="company"
                  autoComplete="organization"
                  className={inputClass}
                  {...register("company")}
                />
              </Field>
            </div>

            {/* SERVICES */}
            <div className="mb-(--space-2xl)">
              <Field
                label="What can we help with?"
                hint="Select all that apply"
                error={errors.services?.message}
              >
                <Controller
                  control={control}
                  name="services"
                  render={({ field }) => (
                    <div className="mt-(--space-md) flex flex-wrap gap-(--space-xs)">

                      {services.map((service) => {
                        const selected =
                          field.value.includes(
                            service.name
                          );

                        return (
                          <Chip
                            key={service.slug}
                            selected={selected}
                            onClick={() =>
                              field.onChange(
                                selected
                                  ? field.value.filter(
                                      (name) =>
                                        name !==
                                        service.name
                                    )
                                  : [
                                      ...field.value,
                                      service.name,
                                    ]
                              )
                            }
                          >
                            {service.name}
                          </Chip>
                        );
                      })}

                      {/* OTHER SERVICES */}
                      <Chip
                        selected={field.value.includes(
                          OTHER_SERVICE
                        )}
                        onClick={() =>
                          field.onChange(
                            field.value.includes(
                              OTHER_SERVICE
                            )
                              ? field.value.filter(
                                  (name) =>
                                    name !== OTHER_SERVICE
                                )
                              : [
                                  ...field.value,
                                  OTHER_SERVICE,
                                ]
                          )
                        }
                      >
                        {OTHER_SERVICE}
                      </Chip>

                    </div>
                  )}
                />
              </Field>
            </div>

            {/* BUDGET */}
            <div className="mb-(--space-2xl)">
              <Field
                label="Project budget"
                hint="Optional — helps us scope the right team"
              >
                <Controller
                  control={control}
                  name="budget"
                  render={({ field }) => (
                    <div className="mt-(--space-md) flex flex-wrap gap-(--space-xs)">
                      {budgetOptions.map((option) => (
                        <Chip
                          key={option}
                          selected={
                            field.value === option
                          }
                          onClick={() =>
                            field.onChange(
                              field.value === option
                                ? undefined
                                : option
                            )
                          }
                        >
                          {option}
                        </Chip>
                      ))}
                    </div>
                  )}
                />
              </Field>
            </div>

            {/* MESSAGE */}
            <div className="mb-(--space-2xl)">
              <Field
                label="Tell us about your project"
                htmlFor="message"
                error={errors.message?.message}
              >
                <textarea
                  id="message"
                  rows={5}
                  aria-invalid={!!errors.message}
                  className={cn(
                    inputClass,
                    "resize-none"
                  )}
                  {...register("message")}
                />
              </Field>
            </div>

            {/* SUBMIT */}
            <div className="flex flex-col items-center justify-between gap-(--space-lg) border-t border-border-subtle pt-(--space-xl) sm:flex-row">
              <p className="text-small text-text-muted">
                We reply within one business day.
              </p>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                icon={
                  <ArrowUpRightIcon className="size-4" />
                }
              >
                {isSubmitting
                  ? "Sending..."
                  : "Send enquiry"}
              </Button>
            </div>

          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
