import { cn, CnProps } from "../shared";
import { ComponentPropsWithRef, forwardRef, ReactNode } from "react";
import { type VariantProps, cva } from "class-variance-authority";

const twStyles = {
  base: [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ",
    "transition-colors focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    "ring-offset-white focus-visible:ring-gray-950",
    "dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300",
  ],
  variant: {
    default: [
      "bg-gray-900 text-gray-50 hover:bg-gray-900/90",
      "dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90",
    ],
    subtle: [
      "bg-gray-100 text-gray-900 hover:bg-gray-100/80",
      "dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
    ],
    outline: [
      "border border-gray-300 bg-white hover:bg-gray-100 text-gray-900 hover:text-gray-900",
      "dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800",
      "dark:text-gray-50 dark:hover:text-gray-50 bg-opacity-30 dark:bg-opacity-30",
      "backdrop-blur-sm",
    ],
    ghost: [
      "hover:bg-gray-100 hover:text-gray-900",
      "dark:hover:bg-gray-800 dark:hover:text-gray-50",
    ],
    link: [
      "text-gray-900 underline decoration-gray-700 decoration-dotted underline-offset-4 hover:decoration-solid",
      "dark:text-gray-50 dark:decoration-gray-100",
    ],
  },
  colors: {
    primary: [
      "ring-offset-white focus-visible:ring-primary-900",
      "dark:ring-offset-primary-900 dark:focus-visible:ring-primary-300",
    ],
    secondary: [
      "ring-offset-white focus-visible:ring-secondary-900",
      "dark:ring-offset-secondary-900 dark:focus-visible:ring-secondary-300",
    ],
    accent: [
      "ring-offset-white focus-visible:ring-accent-900",
      "dark:ring-offset-accent-900 dark:focus-visible:ring-accent-300",
    ],
    danger: [
      "ring-offset-white focus-visible:ring-danger-900",
      "dark:ring-offset-danger-900 dark:focus-visible:ring-danger-300",
    ],
    warning: [
      "ring-offset-white focus-visible:ring-warning-900",
      "dark:ring-offset-warning-900 dark:focus-visible:ring-warning-300",
    ],
  },
  colorVariants: {
    primary: {
      default: [
        "bg-primary-600 text-white hover:bg-primary-600/90",
        "dark:bg-primary-600 dark:text-white dark:hover:bg-primary-600/90",
      ],
      subtle: [
        "bg-primary-100 text-primary-900 hover:bg-primary-100/80",
        "dark:bg-primary-800 dark:text-primary-50 dark:hover:bg-primary-800/80",
      ],
      outline: [
        "border border-primary-300 bg-white hover:bg-primary-100 text-primary-900 hover:text-primary-900",
        "dark:border-primary-800 dark:bg-primary-950 dark:hover:bg-primary-800",
        "dark:text-primary-50 dark:hover:text-primary-50",
      ],
      ghost: [
        "hover:bg-primary-100 hover:text-primary-900",
        "dark:hover:bg-primary-800 dark:hover:text-primary-50",
      ],
      link: [
        "text-primary-700 underline decoration-current decoration-dotted underline-offset-4 hover:decoration-solid",
        "dark:text-primary-500 dark:decoration-current",
      ],
    },
    secondary: {
      default: [
        "bg-secondary-600 text-white hover:bg-secondary-600/90",
        "dark:bg-secondary-600 dark:text-white dark:hover:bg-secondary-600/90",
      ],
      subtle: [
        "bg-secondary-100 text-secondary-900 hover:bg-secondary-100/80",
        "dark:bg-secondary-800 dark:text-secondary-50 dark:hover:bg-secondary-800/80",
      ],
      outline: [
        "border border-secondary-300 bg-white hover:bg-secondary-100 text-secondary-900 hover:text-secondary-900",
        "dark:border-secondary-800 dark:bg-secondary-950 dark:hover:bg-secondary-800",
        "dark:text-secondary-50 dark:hover:text-secondary-50",
      ],
      ghost: [
        "hover:bg-secondary-100 hover:text-secondary-900",
        "dark:hover:bg-secondary-800 dark:hover:text-secondary-50",
      ],
      link: [
        "text-secondary-700 underline decoration-current decoration-dotted underline-offset-4 hover:decoration-solid",
        "dark:text-secondary-500 dark:decoration-current",
      ],
    },
    accent: {
      default: [
        "bg-accent-600 text-white hover:bg-accent-600/90",
        "dark:bg-accent-600 dark:text-white dark:hover:bg-accent-600/90",
      ],
      subtle: [
        "bg-accent-100 text-accent-900 hover:bg-accent-100/80",
        "dark:bg-accent-800 dark:text-accent-50 dark:hover:bg-accent-800/80",
      ],
      outline: [
        "border border-accent-300 bg-white hover:bg-accent-100 text-accent-900 hover:text-accent-900",
        "dark:border-accent-800 dark:bg-accent-950 dark:hover:bg-accent-800",
        "dark:text-accent-50 dark:hover:text-accent-50",
      ],
      ghost: [
        "hover:bg-accent-100 hover:text-accent-900",
        "dark:hover:bg-accent-800 dark:hover:text-accent-50",
      ],
      link: [
        "text-accent-700 underline decoration-current decoration-dotted underline-offset-4 hover:decoration-solid",
        "dark:text-accent-500 dark:decoration-current",
      ],
    },
    danger: {
      default: [
        "bg-danger-600 text-white hover:bg-danger-600/90",
        "dark:bg-danger-600 dark:text-white dark:hover:bg-danger-600/90",
      ],
      subtle: [
        "bg-danger-100 text-danger-900 hover:bg-danger-100/80",
        "dark:bg-danger-800 dark:text-danger-50 dark:hover:bg-danger-800/80",
      ],
      outline: [
        "border border-danger-300 bg-white hover:bg-danger-100 text-danger-900 hover:text-danger-900",
        "dark:border-danger-800 dark:bg-danger-950 dark:hover:bg-danger-800",
        "dark:text-danger-50 dark:hover:text-danger-50",
      ],
      ghost: [
        "hover:bg-danger-100 hover:text-danger-900",
        "dark:hover:bg-danger-800 dark:hover:text-danger-50",
      ],
      link: [
        "text-danger-700 underline decoration-current decoration-dotted underline-offset-4 hover:decoration-solid",
        "dark:text-danger-500 dark:decoration-current",
      ],
    },
    warning: {
      default: [
        "bg-warning-500 text-black hover:bg-warning-500/90",
        "dark:bg-warning-500 dark:text-black dark:hover:bg-warning-500/90",
      ],
      subtle: [
        "bg-warning-100 text-warning-900 hover:bg-warning-100/80",
        "dark:bg-warning-700 dark:text-warning-50 dark:hover:bg-warning-700/80",
      ],
      outline: [
        "border border-warning-300 bg-white hover:bg-warning-100 text-warning-900 hover:text-warning-900",
        "dark:border-warning-800 dark:bg-warning-950 dark:hover:bg-warning-800",
        "dark:text-warning-50 dark:hover:text-warning-50",
      ],
      ghost: [
        "hover:bg-warning-100 hover:text-warning-900",
        "dark:hover:bg-warning-700 dark:hover:text-warning-50",
      ],
      link: [
        "text-warning-700 underline decoration-current decoration-dotted underline-offset-4 hover:decoration-solid",
        "dark:text-warning-500 dark:decoration-current",
      ],
    },
  },
};

const buttonVariants = cva(cn(twStyles.base), {
  variants: {
    variant: {
      default: cn(twStyles.variant.default),
      subtle: cn(twStyles.variant.subtle),
      outline: cn(twStyles.variant.outline),
      ghost: cn(twStyles.variant.ghost),
      link: cn(twStyles.variant.link),
    },
    color: {
      default: "",
      primary: cn(twStyles.colors.primary),
      secondary: cn(twStyles.colors.secondary),
      accent: cn(twStyles.colors.accent),
      danger: cn(twStyles.colors.danger),
      warning: cn(twStyles.colors.warning),
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      default: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
    size: {
      sm: "h-8 px-3",
      default: "h-10 px-4 py-2",
      lg: "h-12 px-5 text-md",
      xl: "h-14 px-7 text-md",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    color: "default",
    radius: "default",
  },
  compoundVariants: [
    // primary color variants
    {
      variant: "default",
      color: "primary",
      className: cn(twStyles.colorVariants.primary.default),
    },
    {
      variant: "subtle",
      color: "primary",
      className: cn(twStyles.colorVariants.primary.subtle),
    },
    {
      variant: "outline",
      color: "primary",
      className: cn(twStyles.colorVariants.primary.outline),
    },
    {
      variant: "ghost",
      color: "primary",
      className: cn(twStyles.colorVariants.primary.ghost),
    },
    {
      variant: "link",
      color: "primary",
      className: cn(twStyles.colorVariants.primary.link),
    },
    // secondary color variants
    {
      variant: "default",
      color: "secondary",
      className: cn(twStyles.colorVariants.secondary.default),
    },
    {
      variant: "subtle",
      color: "secondary",
      className: cn(twStyles.colorVariants.secondary.subtle),
    },
    {
      variant: "outline",
      color: "secondary",
      className: cn(twStyles.colorVariants.secondary.outline),
    },
    {
      variant: "ghost",
      color: "secondary",
      className: cn(twStyles.colorVariants.secondary.ghost),
    },
    {
      variant: "link",
      color: "secondary",
      className: cn(twStyles.colorVariants.secondary.link),
    },

    // accent color variants
    {
      variant: "default",
      color: "accent",
      className: cn(twStyles.colorVariants.accent.default),
    },
    {
      variant: "subtle",
      color: "accent",
      className: cn(twStyles.colorVariants.accent.subtle),
    },
    {
      variant: "outline",
      color: "accent",
      className: cn(twStyles.colorVariants.accent.outline),
    },
    {
      variant: "ghost",
      color: "accent",
      className: cn(twStyles.colorVariants.accent.ghost),
    },
    {
      variant: "link",
      color: "accent",
      className: cn(twStyles.colorVariants.accent.link),
    },
    // danger color variants
    {
      variant: "default",
      color: "danger",
      className: cn(twStyles.colorVariants.danger.default),
    },
    {
      variant: "subtle",
      color: "danger",
      className: cn(twStyles.colorVariants.danger.subtle),
    },
    {
      variant: "outline",
      color: "danger",
      className: cn(twStyles.colorVariants.danger.outline),
    },
    {
      variant: "ghost",
      color: "danger",
      className: cn(twStyles.colorVariants.danger.ghost),
    },
    {
      variant: "link",
      color: "danger",
      className: cn(twStyles.colorVariants.danger.link),
    },
    // warning color variants
    {
      variant: "default",
      color: "warning",
      className: cn(twStyles.colorVariants.warning.default),
    },
    {
      variant: "subtle",
      color: "warning",
      className: cn(twStyles.colorVariants.warning.subtle),
    },
    {
      variant: "outline",
      color: "warning",
      className: cn(twStyles.colorVariants.warning.outline),
    },
    {
      variant: "ghost",
      color: "warning",
      className: cn(twStyles.colorVariants.warning.ghost),
    },
    {
      variant: "link",
      color: "warning",
      className: cn(twStyles.colorVariants.warning.link),
    },
  ],
});

export interface ButtonProps
  extends Omit<ComponentPropsWithRef<"button">, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, radius, color, children, disabled, ...props },
    ref,
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, radius, color, className }),
          disabled ? "cursor-not-allowed" : "cursor-pointer",
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
