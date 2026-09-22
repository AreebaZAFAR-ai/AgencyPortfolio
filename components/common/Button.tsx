import type { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/ah-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-button transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ah-accent/60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ah-ink text-ah-bg hover:bg-ah-ink/85",
        outline: "border border-ah-muted/40 text-ah-ink hover:border-ah-ink/70 hover:bg-ah-ink/5",
        ghost: "text-ah-ink hover:text-ah-muted",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-13 px-7",
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
