import Header from "../components/home/Header";
import BottomNav from "../components/home/BottomNav";

function AppLayout({
  title,
  subtitle,
  status = "Online",
  children,
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">

      <div className="relative w-full max-w-[420px] bg-white shadow-xl">

        <Header
          title={title}
          subtitle={subtitle}
          status={status}
        />

        <main className="px-4 pt-4 pb-24">
          {children}
        </main>

        <BottomNav />

      </div>

    </div>
  );
}

export default AppLayout;