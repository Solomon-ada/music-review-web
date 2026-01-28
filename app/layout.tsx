import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Music Review',
  description: 'Music review platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      {/* <body className="bg-gray-100 text-gray-900"> */}
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">

        <Navbar />
        <main className="max-w-4xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
