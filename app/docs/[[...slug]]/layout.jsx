import { Header } from '@/components/layout/Header';

export default function DocsLayout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
