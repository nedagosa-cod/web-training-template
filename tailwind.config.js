/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				primaryLight: {
					DEFAULT: 'hsl(var(--primary-light))',
					foreground: 'hsl(var(--primary-light-foreground))',
				},
				primaryDark: {
					DEFAULT: 'hsl(var(--primary-dark))',
					foreground: 'hsl(var(--primary-dark-foreground))',
				},
				primarySoft: {
					DEFAULT: 'hsl(var(--primary-soft))',
					foreground: 'hsl(var(--primary-soft-foreground))',
				},
				primaryAccent: {
					DEFAULT: 'hsl(var(--primary-accent))',
					foreground: 'hsl(var(--primary-accent-foreground))',
				},
				secondaryLight: {
					DEFAULT: 'hsl(var(--secondary-light))',
					foreground: 'hsl(var(--secondary-light-foreground))',
				},
				secondaryDark: {
					DEFAULT: 'hsl(var(--secondary-dark))',
					foreground: 'hsl(var(--secondary-dark-foreground))',
				},
				secondarySoft: {
					DEFAULT: 'hsl(var(--secondary-soft))',
					foreground: 'hsl(var(--secondary-soft-foreground))',
				},
				secondaryAccent: {
					DEFAULT: 'hsl(var(--secondary-accent))',
					foreground: 'hsl(var(--secondary-accent-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				gris: {
					DEFAULT: 'hsl(var(--gris))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0',
					},
					to: {
						height: 'var(--radix-accordion-content-height)',
					},
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)',
					},
					to: {
						height: '0',
					},
				},
				'fly-out': {
					'0%': {
						transform: 'translateY(0) rotate(0deg)',
						opacity: '1',
						borderRadius: '0',
					},
					'100%': {
						transform: 'translateY(-1000px) rotate(720deg)',
						opacity: '0',
						borderRadius: '50%',
					},
				},
				'bounce-soft': {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-4px)',
					},
				},
				animate: {
					'0%': {
						transform: 'translateY(0) rotate(0deg)',
						opacity: '1',
						borderRadius: '0',
					},
					'100%': {
						transform: 'translateY(-1000px) rotate(720deg)',
						opacity: '0',
						borderRadius: '50%',
					},
				},
				// Animaciones para Biblioteca
				shine: {
					'0%': {
						backgroundPosition: '0% 50%',
					},
					'50%': {
						backgroundPosition: '100% 50%',
					},
					'100%': {
						backgroundPosition: '0% 50%',
					},
				},
				ripple: {
					'0%': {
						transform: 'scale(1)',
						boxShadow: 'rgba(0, 0, 0, 0.3) 0px 10px 10px -0px',
					},
					'50%': {
						transform: 'scale(1.3)',
						boxShadow: 'rgba(0, 0, 0, 0.3) 0px 30px 20px -0px',
					},
					'100%': {
						transform: 'scale(1)',
						boxShadow: 'rgba(0, 0, 0, 0.3) 0px 10px 10px -0px',
					},
				},
				'color-change': {
					'0%': {
						color: 'hsl(var(--primary))',
					},
					'50%': {
						color: 'white',
					},
					'100%': {
						color: 'hsl(var(--primary))',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				flying: 'fly-out 25s linear infinite',
				floating: 'animate 25s linear infinite',
				'flying-slow': 'fly-out 35s linear infinite',
				'flying-slower': 'fly-out 45s linear infinite',
				'floating-slow': 'animate 35s linear infinite',
				'floating-slower': 'animate 45s linear infinite',
				'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
				// Animaciones para Biblioteca
				shine: 'shine 4s linear infinite',
				ripple: 'ripple 2s infinite ease-in-out',
				'color-change': 'color-change 2s infinite ease-in-out',
			},
			boxShadow: {
				aura: '0 0 0 6px rgba(253, 186, 18, 0.2)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
