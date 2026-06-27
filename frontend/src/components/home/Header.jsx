function Header({
  title = "School POS",
  subtitle = "Point of Sale",
  status = "Ready",
}) {
  return (
    <header className="border-b border-slate-200 bg-white px-5 py-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            {subtitle}
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            {title}
          </h1>

        </div>

        <div
          className="
            rounded-full
            bg-emerald-100
            px-3
            py-1
          "
        >
          <span
            className="
              text-xs
              font-semibold
              text-emerald-700
            "
          >
            {status}
          </span>
        </div>

      </div>

    </header>
  );
}

export default Header;