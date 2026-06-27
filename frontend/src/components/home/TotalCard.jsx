function TotalCard({ total }) {
  const formatRM = (value) => {
    return new Intl.NumberFormat("ms-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <section className="px-5 pt-5">
      <div
        className="
          overflow-hidden
          rounded-3xl
          bg-gradient-to-br
          from-indigo-600
          via-blue-600
          to-sky-500
          p-6
          text-white
          shadow-lg
        "
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Jumlah Keseluruhan
            </p>

            <h2 className="mt-3 text-5xl font-black tracking-tight tabular-nums">
              {formatRM(total)}
            </h2>
          </div>

        </div>

      </div>
    </section>
  );
}

export default TotalCard;