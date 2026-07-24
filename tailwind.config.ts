import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/app/**/*.{ts,tsx}",
		"./src/components/**/*.{ts,tsx}",
		"./src/views/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: {
					DEFAULT: 'hsl(var(--background))',
					alt: 'hsl(var(--background-alt))'
				},
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				navy: {
					DEFAULT: 'hsl(var(--navy))',
					light: 'hsl(var(--navy-light))',
					muted: 'hsl(var(--navy-muted))'
				},
				orange: 'hsl(var(--orange))'
			},
			fontFamily: {
				sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
				heading: ['var(--font-heading)', 'var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
			},
			boxShadow: {
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'glow': 'var(--shadow-glow)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'flow-left': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'50%': { opacity: '1' },
					'100%': { opacity: '0', transform: 'translateX(100px)' }
				},
				'flow-right': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'50%': { opacity: '1' },
					'100%': { opacity: '0', transform: 'translateX(-100px)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
					'50%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.6)' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				/** Agentic architecture hero — must stay separate from parent translate(-50%,-50%) */
				'slide-in-right': {
					'0%': { opacity: '0', transform: 'translateX(36px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'infinite-scroll': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				'dash': {
					'0%': { strokeDashoffset: '0' },
					'100%': { strokeDashoffset: '30' }
				},
				/** Quality journey timeline — very light breathing + slow vertical highlight */
				'journey-spine-pulse': {
					'0%, 100%': { opacity: '0.9' },
					'50%': { opacity: '1' }
				},
				'journey-spine-sheen': {
					'0%': { transform: 'translateY(-130%)' },
					'100%': { transform: 'translateY(330%)' }
				},
				/** Flowing dashed paths (quality journey panel decor SVG) */
				'journey-decor-flow': {
					'0%': { strokeDashoffset: '0' },
					'100%': { strokeDashoffset: '-120' }
				},
				/** Home hero explore lanes — staggered entrance */
				'home-hero-lane-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'flow-left': 'flow-left 2s ease-in-out infinite',
				'flow-right': 'flow-right 2s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'slide-in-right': 'slide-in-right 1s ease-out both',
				'shimmer': 'shimmer 8s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'infinite-scroll': 'infinite-scroll 30s linear infinite',
				'journey-spine-pulse': 'journey-spine-pulse 4.5s ease-in-out infinite',
				'journey-spine-sheen': 'journey-spine-sheen 7s ease-in-out infinite',
				'journey-decor-flow': 'journey-decor-flow 10s linear infinite',
				'journey-decor-flow-slow': 'journey-decor-flow 14s linear infinite',
				'home-hero-lane-in': 'home-hero-lane-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
