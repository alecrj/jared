import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price / 100)
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function getCuisineColor(cuisine: string): string {
  const colors: Record<string, string> = {
    'Italian': 'bg-red-100 text-red-800 border-red-200',
    'French': 'bg-blue-100 text-blue-800 border-blue-200',
    'Japanese': 'bg-pink-100 text-pink-800 border-pink-200',
    'Mexican': 'bg-green-100 text-green-800 border-green-200',
    'Thai': 'bg-purple-100 text-purple-800 border-purple-200',
    'Indian': 'bg-orange-100 text-orange-800 border-orange-200',
    'Chinese': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Mediterranean': 'bg-teal-100 text-teal-800 border-teal-200',
    'American': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Spanish': 'bg-rose-100 text-rose-800 border-rose-200',
  }
  return colors[cuisine] || 'bg-gray-100 text-gray-800 border-gray-200'
}