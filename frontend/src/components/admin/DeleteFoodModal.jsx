import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import toast from "react-hot-toast";
import { deleteMenu } from "../../api/menu.api";

function DeleteFoodModal({
  open,
  onClose,
  food,
  onSuccess,
}) {
  const handleDelete = async () => {
    if (!food) return;

    try {
      await deleteMenu(food.id);

      toast.success("Berjaya dipadam");

      onClose();

      onSuccess();

    } catch (err) {
      console.error(err);

      toast.error("Gagal dipadam");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">

        <DialogPanel className="w-full max-w-md rounded-3xl bg-white shadow-xl">

          <div className="border-b border-slate-200 p-5">

            <DialogTitle className="text-2xl font-bold text-rose-600">
              Padam Menu
            </DialogTitle>

          </div>

          <div className="p-5">

            <div className="rounded-2xl bg-rose-50 p-4">

              <p className="text-slate-600">
                Anda pasti mahu memadam menu ini?
              </p>

              <h2 className="mt-3 text-xl font-bold">
                {food?.name}
              </h2>

            </div>

          </div>

          <div className="flex gap-3 border-t border-slate-200 p-5">

            <button
              onClick={onClose}
              className="
                flex-1
                rounded-2xl
                bg-slate-200
                py-3
                font-semibold
              "
            >
              Batal
            </button>

            <button
              onClick={handleDelete}
              className="
                flex-1
                rounded-2xl
                bg-rose-600
                py-3
                font-semibold
                text-white
              "
            >
              Padam
            </button>

          </div>

        </DialogPanel>

      </div>

    </Dialog>
  );
}

export default DeleteFoodModal;