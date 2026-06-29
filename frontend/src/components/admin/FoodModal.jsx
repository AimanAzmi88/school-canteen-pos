import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateMenu, createMenu, } from "../../api/menu.api";

function FoodModal({
  open,
  onClose,
  food,
  defaultCategory,
  defaultType,
  onSuccess,
}) {
  const isEdit = !!food?.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(defaultCategory || "FOOD");
  const [type, setType] = useState(defaultType || "NASI");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (food?.id) {
      setName(food.name ?? "");
      setPrice(food.price ?? "");
      setCategory(food.category ?? "FOOD");
      setType(food.type ?? "NASI");
    } else {
      setName("");
      setPrice("");
      setCategory(defaultCategory || "FOOD");
      setType(defaultType || "NASI");
    }
  }, [food, defaultCategory, defaultType]);

  const handleClose = () => {
    if (!loading) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Nama diperlukan");
      return;
    }
    if (price === "" || Number.isNaN(Number(price))) {
      toast.error("Harga diperlukan");
      return;
    }

    try {
      setLoading(true);

      // Bina payload — `type` HANYA untuk FOOD, DRINK takde type
      const payload = {
        name: name.trim(),
        price: Number(price),
        category,
        ...(category === "FOOD" ? { type } : {}),
      };

      if (isEdit) {
        await updateMenu(food.id, payload);
        toast.success("Menu berjaya dikemas kini");
      } else {
        await createMenu(payload);
        toast.success("Menu berjaya ditambah");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err.response?.data?.message || err);
      toast.error(err?.response?.data?.message || "Ralat telah berlaku");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-3xl bg-white shadow-xl">
          {/* Header */}
          <div className="border-b border-slate-200 p-5">
            <DialogTitle className="text-2xl font-bold">
              {isEdit ? "Edit Menu" : "Tambah Menu"}
            </DialogTitle>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="space-y-5 p-5">

            {/* Menu Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Nama menu
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={category === "DRINK" ? "Milo Ais" : "Mee Goreng"}
                className="w-full rounded-2xl border border-slate-300 p-3 outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Harga (RM)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="3.50"
                className="w-full rounded-2xl border border-slate-300 p-3 outline-none transition focus:border-indigo-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={handleClose}
                className="flex-1 rounded-2xl bg-slate-200 py-3 font-semibold disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-2xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : isEdit ? "Kemaskini" : "Simpan"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default FoodModal;