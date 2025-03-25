import UserNavbarDash from "../components/users/user-navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#121212] flex w-full min-h-screen">
      <section className="w-full md:w-1/3 min-h-screen hidden md:block">
        <UserNavbarDash />
      </section>
      {children}
    </div>
  );
}
