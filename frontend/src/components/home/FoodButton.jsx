function FoodButton({ food, onClick }) {
  const formatRM = (value) => {
    return new Intl.NumberFormat("ms-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <button
      onClick={() => onClick(food)}
      className="
        group
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-indigo-400
        hover:shadow-lg
        active:scale-95
      "
    >

      <h3 className="mt-4 text-center text-sm font-bold text-slate-900">
        {food.name}
      </h3>

      <p className="mt-1 text-center text-xs font-medium text-slate-500">
        {formatRM(food.price)}
      </p>
    </button>
  );
}

export default FoodButton;