function OrderCard({
  order,
  onView,
}) {
  const formatRM = (value) => {
    return new Intl.NumberFormat("ms-MY", {
      style: "currency",
      currency: "MYR",
    }).format(Number(value));
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Guru
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {order.teacher.name}
          </h2>

        </div>

        <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
          {formatRM(order.total)}
        </div>

      </div>

      {/* Summary */}

      <div className="mt-6">

<div className="rounded-2xl bg-slate-50 p-5 text-center">

  <p className="text-xs uppercase text-slate-500">
    Jumlah item
  </p>

  <h3 className="mt-2 text-3xl font-bold">
    {order.itemCount}
  </h3>

</div>

      </div>

      {/* Button */}

      <button
        onClick={() => onView(order)}
        className="
          mt-6
          w-full
          rounded-2xl
          bg-indigo-600
          py-3
          font-semibold
          text-white
          transition
          hover:bg-indigo-700
        "
      >
        Paparkan Pesanan
      </button>

    </div>
  );
}

export default OrderCard;