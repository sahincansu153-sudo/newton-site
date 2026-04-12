export const metadata = {
  title: "Newton Project",
  description: "Çok Değişkenli Newton Yöntemi"
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}