import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Utility function to create page URLs for React Router
export function createPageUrl(pageName) {
  return `/${pageName}`;
}