function HistoryCard({
  order,
  onClick,
}) {
  return (
    <button
      onClick={() => onClick(order)}
      className="
        w-full
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        text-left
        shadow-sm
        transition
        hover:border-indigo-400
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <h3 className="font-bold">
            {order.teacher.name}
          </h3>

          <p className="text-sm text-slate-500">
            {order.receiptNo}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            order.isSent
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {order.isSent ? "Dihantar" : "Tertunda"}
        </span>

      </div>

      <div className="mt-4 flex items-center justify-between">

        <span className="text-sm text-slate-500">
          {order.itemCount} Item
        </span>

        <span className="font-bold">
          RM {Number(order.total).toFixed(2)}
        </span>

      </div>

      <p className="mt-3 text-xs text-slate-500">
        {new Date(order.createdAt).toLocaleString("ms-MY", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
})}
      </p>

    </button>
  );
}

export default HistoryCard;