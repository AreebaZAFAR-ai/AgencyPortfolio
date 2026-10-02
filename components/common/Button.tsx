import type { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/ah-btn inline-flex items-center justify-center gap-(--space-xs) whitespace-nowrap rounded-full border font-body text-small font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-text-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-text-primary bg-text-primary text-background hover:border-text-secondary hover:bg-text-secondary",
        outline: "border-border-subtle text-text-primary hover:border-text-primary",
        ghost: "border-transparent text-text-primary hover:text-text-secondary",
      },
      size: {
        sm: "h-10 px-(--space-lg)",
        md: "h-12 px-(--space-xl)",
        lg: "h-14 px-(--space-xl)",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

interface LinkButtonProps extends BaseButtonProps {
  href: string;
  external?: boolean;
  onClick?: () => void;
}

interface NativeButtonProps
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const { children, className, variant, size, icon, iconPosition = "right" } = props;
  const classes = cn(buttonVariants({ variant, size }), className);
  const content = (
    <>
      {icon && iconPosition === "left" && icon}
      <span>{children}</span>
      {icon && iconPosition === "right" && icon}
    </>
  );

  if ("href" in props && props.href) {
    const { href, external, onClick } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick} data-cursor="hover">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick} data-cursor="hover">
        {content}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- stripped from `rest` before spreading onto <button>
  const { children: _children, className: _className, icon: _icon, iconPosition: _iconPosition, variant: _variant, size: _size, href: _href, type = "button", ...rest } = props as NativeButtonProps;
  return (
    <button type={type} className={classes} data-cursor="hover" {...rest}>
      {content}
    </button>
  );
}
