const { heroui } = require('@heroui/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--colorPrimary)',
        info: 'var(--colorInfo)',
        // success: "var(--colorSuccess)",
        error: 'var(--colorError)',
        // warning: "var(--colorWarning)",
        link: 'var(--colorLink)',
        background: 'var(--colorBgBase)',
        gradientStart: 'var(--primaryGradientStart)',
        gradientMiddle: 'var(--primaryGradientMiddle)',
        gradientEnd: 'var(--primaryGradientEnd)'
      },
      fontFamily: {
        mi: ['var(--fontMiSansThai)', 'sans-serif']
      },
      screens: {
        xxl: '1600px',
        xxlMin: '1600px',
        xlMax: { max: '1599px' },
        xl: '1536px',
        xlMin: '1536px',
        lgMax: { max: '1535px' },
        lg: '1366px',
        lgMin: '1366px',
        mdMax: { max: '1365px' },
        md: '1024px',
        mdMin: '1024px',
        smMax: { max: '1023px' },
        sm: '640px',
        smMin: '640px',
        xsMax: { max: '639px' },
        xs: '400px',
        xsMin: '400px'
      }
    }
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {}
        },
        dark: {
          colors: {}
        }
      }
    })
  ]
}
