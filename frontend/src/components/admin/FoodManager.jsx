import { useEffect, useState } from "react";
import api from "../../api/api";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import FoodModal from "./FoodModal";
import DeleteFoodModal from "./DeleteFoodModal";

function FoodManager({ category, type }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    fetchFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, type]);

  const fetchFoods = async () => {
    try {
      setLoading(true);

      // Bina query param secara selamat — `type` HANYA untuk FOOD
      const params = { category };
      if (category === "FOOD" && type) {
        params.type = type;
      }

      const res = await api.get("/menus", { params });
      setFoods(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedFood(null); // reset → Add mode
    setModalOpen(true);
  };

  const handleEdit = (food) => {
    setSelectedFood(food); // ada id → Edit mode
    setModalOpen(true);
  };

  const handleDelete = (food) => {
    setSelectedFood(food);
    setDeleteOpen(true);
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          <PlusIcon className="h-5 w-5" />
          Tambah {category === "FOOD" ? "Makanan" : "Minuman"}
        </button>
      </div>

      {/* Menu List */}
      <div className="space-y-3">
        {loading ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            Memuatkan
          </div>
        ) : foods.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            Tiada menu
          </div>
        ) : (
          foods.map((food) => (
            <div
              key={food.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div>
                <h3 className="font-semibold text-slate-900">{food.name}</h3>
                <p className="text-sm text-slate-500">
                  RM {Number(food.price).toFixed(2)}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(food)}
                  className="rounded-xl bg-amber-100 p-2 text-amber-600 transition hover:bg-amber-200"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(food)}
                  className="rounded-xl bg-rose-100 p-2 text-rose-600 transition hover:bg-rose-200"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <FoodModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        food={selectedFood}
        defaultCategory={category}
        defaultType={type}
        onSuccess={fetchFoods}
      />

      <DeleteFoodModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        food={selectedFood}
        onSuccess={fetchFoods}
      />
    </>
  );
}

export default FoodManager;