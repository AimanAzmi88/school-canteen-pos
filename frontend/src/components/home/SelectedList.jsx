function SelectedList({ foods }) {
  const totalItems = foods.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const formatRM = (value) => {
    return new Intl.NumberFormat("ms-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <section className="px-5 pt-5">
      <div className="mb-3 flex items-center justify-between">

        <h2 className="text-lg font-bold text-slate-900">
          Item yang dipilih
        </h2>

        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {totalItems} item
        </div>

      </div>

      <div className="h-56 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50">

        {foods.length === 0 ? (
          <div className="flex h-full items-center justify-center">

            <div className="text-center">

              <div className="text-4xl">
                🍽️
              </div>

              <p className="mt-3 font-semibold text-slate-700">
                Tiada item yang dipilih
              </p>
            </div>

          </div>
        ) : (
          <div className="space-y-2 p-3">

            {foods.map((food) => (
              <div
                key={food.id}
                className="
                  rounded-2xl
                  bg-white
                  p-3
                  shadow-sm
                  ring-1
                  ring-slate-200
                "
              >
                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-semibold text-slate-900">
                      {food.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {food.qty} × {formatRM(food.price)}
                    </p>

                  </div>

                  <p className="font-bold text-slate-900">
                    {formatRM(food.qty * food.price)}
                  </p>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default SelectedList;