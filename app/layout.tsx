import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WMC2 — Weapons of Mass Construction 2 | Método Saizen',
  description:
    'O curso técnico do MrSaizen sobre a nova fase do Método Saizen. Prescrição de treino avançado com critério, lógica e aplicação prática.',
  openGraph: {
    title: 'WMC2 — Weapons of Mass Construction 2',
    description:
      'A nova etapa do Método Saizen. Prescrição avançada com frequência, perfil de resistência e neuromechanical matching.',
    images: [{ url: '/assets/og-wmc2.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WMC2 — Weapons of Mass Construction 2',
    description: 'A nova etapa do Método Saizen.',
    images: ['/assets/og-wmc2.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
