import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ClarityScript } from '@/components/ClarityScript'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { LocaleProvider } from '@/lib/i18n/LocaleProvider'
import Script from 'next/script'

const robotoSans = localFont({
  src: [
    { path: './fonts/roboto-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/roboto-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/roboto-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-roboto-sans',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

const robotoSlab = localFont({
  src: [
    { path: './fonts/roboto-slab-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/roboto-slab-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/roboto-slab-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-roboto-slab',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

const themeInitScript = `(function(){try{var t=localStorage.getItem('gri-theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);var l=localStorage.getItem('inapi-locale');if(l==='en'||l==='es'){document.documentElement.lang=l;document.cookie='inapi-locale='+l+';path=/;max-age=31536000;samesite=lax';}}catch(e){}})();`

export const metadata: Metadata = {
  title: 'INAPI — Propiedad industrial en Chile',
  description:
    'Instituto Nacional de Propiedad Industrial. Registra marcas y patentes, busca antecedentes y sigue tus trámites en línea.',
  keywords: 'INAPI, marcas, patentes, propiedad industrial, Chile, trámites',
  openGraph: {
    title: 'INAPI — Propiedad industrial en Chile',
    description:
      'Registra marcas y patentes, busca antecedentes y sigue tus trámites en el sitio oficial de INAPI.',
    locale: 'es_CL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${robotoSans.variable} ${robotoSlab.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ClarityScript />
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-71ZZCB5SY2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-71ZZCB5SY2');
          `}
        </Script>
      </body>
    </html>
  )
}
