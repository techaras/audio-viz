/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./convex/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Background colors
        'unprotected-bg': '#FDFBF7',
        'protected-bg': '#FBFAF3',
        'slider-bg': '#14171F',
        'button-primary-bg': '#14171F',
        'input-unprotected-bg': '#F4F3EC',
        
        // Text colors
        'text-label': '#484848',           // Labels like "Email", "Password"
        'text-placeholder': '#777873',     // Placeholder text
        'text-link': '#000000',            // Links like "Sign up"
        'text-title-light': '#010200',     // Titles on light backgrounds
        'text-title-dark': '#FFFFFF',      // Titles on dark backgrounds
        'text-secondary-dark': '#81848C',  // Secondary text on dark backgrounds (dates, times)
        'text-muted-dark': '#4B4B5F',      // Muted text on dark backgrounds
        
        // UI elements
        'slider-indicator': '#4B4B5F',     // Top slider/drag handle
        'divider': '#252837',              // Divider lines
        'accent-red-dark': '#FF6363',      // Red accent on dark backgrounds (record, delete, etc.)
        'accent-ring-light': '#EEEDE6',    // Accent ring on light backgrounds
      },
    },
  },
  plugins: [],
}