/** @type {import('tailwindcss').Config} */

const sharedConfig = require("tailwind-config");

module.exports = {
    ...sharedConfig,
    content: ["./**/*.{js,ts,jsx,tsx,mdx}", "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}"],
};