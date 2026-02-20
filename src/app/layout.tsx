import Providers from './providers';
import './globals.css';
import { Montserrat } from "next/font/google";
import { CartProvider } from './components/cartContext';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: 'Bungee Deliveries',
  description: 'Fast food delivery to your doorstep',
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#FF6B00',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <Providers>
          <CartProvider>
            {children}
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
