/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			"fade-in": {
  				"0%": { opacity: "0" },
  				"100%": { opacity: "1" }
  			},
  			"fade-in-up": {
  				"0%": {
  					opacity: "0",
  					transform: "translateY(20px)"
  				},
  				"100%": {
  					opacity: "1",
  					transform: "translateY(0)"
  				}
  			},
  			"float": {
  				"0%, 100%": {
  					transform: "translateY(0)"
  				},
  				"50%": {
  					transform: "translateY(-20px)"
  				}
  			},
  			"move": {
  				"0%": {
  					transform: "translateX(0) translateY(0)"
  				},
  				"100%": {
  					transform: "translateX(-100%) translateY(-100%)"
  				}
  			}
  		},
  		animation: {
  			"fade-in": "fade-in 0.5s ease-out forwards",
  			"fade-in-up": "fade-in-up 0.5s ease-out forwards",
  			"float": "float 6s ease-in-out infinite",
  			"move": "move 20s linear infinite"
  		}
  	}
  },
  plugins: [
    require('daisyui'),
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
}