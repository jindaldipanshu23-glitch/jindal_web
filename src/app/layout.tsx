import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { OrderProvider } from '@/context/OrderContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'ISHKA - Kanha Ji Poshak & Festival Spiritual Crafts Store',
  description: 'Buy premium Laddu Gopal Poshak, Kundan Mukut, Shringar, Festival Torans, and Pure Brass Akhand Diyas with express Shiprocket delivery across India.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="flex flex-col min-h-screen">
        <OrderProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <WhatsAppWidget />
          </CartProvider>
        </OrderProvider>
      </body>
    </html>
  );
};
