import "../globals.css";
import "semantic-ui-css/semantic.min.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main>{children}</main>
    </div>
  );
}
