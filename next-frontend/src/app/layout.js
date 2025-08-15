import '../styles/globals.css'
import { Providers } from '../redux/Providers'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

export const metadata = {
  title: 'Life Storage App',
  description: 'Track your life in weeks',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="main__container">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
