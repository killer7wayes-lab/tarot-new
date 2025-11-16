export const metadata = {
  title: 'Mystic Tarot - Expert AI Reader',
  description: 'Professional Tarot Readings with Advanced AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}