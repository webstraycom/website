import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function StarlightLayout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="mt-14 flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
