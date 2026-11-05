import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="mt-14 flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
