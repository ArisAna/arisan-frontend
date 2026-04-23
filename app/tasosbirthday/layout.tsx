import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ο Τάσος γίνεται 5! 🚀',
  description: 'Πάρτι γενεθλίων για τον Τάσο — 29 Μαΐου 2026, Πολιτικά Ευβοίας',
};

export default function BirthdayLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Nunito:wght@400;600;700;800;900&family=Dancing+Script:wght@600;700&family=Playfair+Display:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <style>{`body { background: #0e0010; }`}</style>
      {children}
    </>
  );
}
