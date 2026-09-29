import type { Metadata } from 'next'
import { Roboto, Roboto_Slab } from 'next/font/google'
import './globals.css'
import { ClarityScript } from '@/components/ClarityScript'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import Script from 'next/script'

const robotoSans = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto-sans',
  display: 'swap',
})

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto-slab',
  display: 'swap',
})

const themeInitScript = `(function(){try{var t=localStorage.getItem('gri-theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`

export const metadata: Metadata = {
  title: 'Portal INAPI — Solicitud de Registro de Marca',
  description:
    'Portal oficial de INAPI para el registro de marcas comerciales en Chile. Proceso guiado, rápido y seguro.',
  keywords: 'registro de marca, INAPI, marca comercial, Chile, propiedad intelectual',
  openGraph: {
    title: 'Portal INAPI — Solicitud de Registro de Marca',
    description:
      'Registra tu marca con seguridad y sin complicaciones. El portal oficial de INAPI te guía paso a paso.',
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
        <ThemeProvider>{children}</ThemeProvider>

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
