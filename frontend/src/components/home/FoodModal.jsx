import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

// Config tab — senang nak tambah/ubah
const TABS = [
  {
    id: "FOOD",
    label: "🍛 Food",
    icon: "🍛",
    match: (f) => f.category === "FOOD" && f.type === "NASI",
    label: "makanan",
  },
  {
    id: "GORENG",
    label: "🍳 Goreng",
    icon: "🍳",
    match: (f) => f.category === "FOOD" && f.type === "GORENG",
    label: "makanan goreng",
  },
  {
    id: "DRINK",
    label: "🥤 Drink",
    icon: "🥤",
    match: (f) => f.category === "DRINK",
    label: "minuman",
  },
];

// Emoji untuk setiap kad ikut jenis menu
const getFoodIcon = (food) => {
  if (food.category === "DRINK") return "🥤";
  if (food.type === "GORENG") return "🍳";
  return "🍛";
};

function FoodModal({ open, onClose, onSelectFood, foods = [] }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("FOOD");

  const activeConfig = useMemo(
    () => TABS.find((t) => t.id === activeTab) ?? TABS[0],
    [activeTab]
  );

  const filteredFoods = useMemo(() => {
    const keyword = search.toLowerCase();
    return foods.filter(
      (food) =>
        activeConfig.match(food) &&
        food.name.toLowerCase().includes(keyword)
    );
  }, [foods, search, activeConfig]);

  const formatRM = (value) =>
    new Intl.NumberFormat("ms-MY", {
      style: "currency",
      currency: "MYR",
    }).format(Number(value));

  const handleClose = () => {
    setSearch("");
    setActiveTab("FOOD");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="fixed inset-0 flex flex-col bg-white">
          {/* Header */}
          <div className="border-b border-slate-200">
            <div className="flex items-center justify-between p-5">
              <div>
                <DialogTitle className="text-2xl font-bold">
                  Tambah Menu
                </DialogTitle>
                <p className="text-sm text-slate-500">Pilih makanan atau minuman</p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-xl bg-slate-100 px-4 py-2 font-semibold hover:bg-slate-200"
              >
                Tutup
              </button>
            </div>

            {/* Tabs: Food / Goreng / Drink */}
            <div className="px-5 pb-5">
              <div className="flex rounded-2xl bg-slate-100 p-1">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all ${
                      activeTab === tab.id
                        ? "bg-white text-indigo-600 shadow"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="border-b border-slate-200 p-5">
            <div className="flex items-center rounded-2xl border border-slate-300 px-4 transition focus-within:border-indigo-500">
              <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder={`Cari ${activeConfig.label.toLowerCase()}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-sm text-slate-500 hover:text-red-500"
                >
                  Kosongkan
                </button>
              )}
            </div>
          </div>

          {/* Menu List */}
          <div className="flex-1 overflow-y-auto p-5">
            {filteredFoods.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl">{activeConfig.icon}</div>
                  <h3 className="mt-4 text-xl font-semibold">
                    Tiada {activeConfig.id.charAt(0) + activeConfig.id.slice(1).toLowerCase()} Ditemui
                  </h3>
                  <p className="mt-2 text-slate-500">Cuba kata kunci lain.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {filteredFoods.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => {
                      onSelectFood(food);
                      setSearch("");
                    }}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-500 hover:shadow-lg active:scale-95"
                  >
                    <div className="mb-3 text-4xl">{getFoodIcon(food)}</div>
                    <h3 className="line-clamp-2 font-bold">{food.name}</h3>
                    <p className="mt-3 text-lg font-semibold text-indigo-600">
                      {formatRM(food.price)}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default FoodModal;