import { PlusCircleIcon } from "@heroicons/react/24/outline";

function FoodGrid({ onOpenModal }) {
  return (
    <section className="px-5 pt-5">

      <button
        onClick={onOpenModal}
        className="
          group
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          border-2
          border-dashed
          border-indigo-300
          bg-indigo-50
          py-5
          transition-all
          hover:border-indigo-500
          hover:bg-indigo-100
          active:scale-95
        "
      >
        <PlusCircleIcon className="h-8 w-8 text-indigo-600" />

        <div className="text-left">
          <h2 className="font-bold text-slate-900">
            Tambah Menu
          </h2>

          <p className="text-sm text-slate-500">
            Cari & tambah makanan
          </p>
        </div>

      </button>

    </section>
  );
}

export default FoodGrid;