import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import toast from "react-hot-toast";
import api from "../../api/api";

function DeleteTeacherModal({
  open,
  onClose,
  teacher,
  onSuccess,
}) {
  const handleDelete = async () => {
    if (!teacher) return;

    try {
      await api.delete(`/users/${teacher.id}`);

      toast.success("Teacher deleted successfully");

      onClose();

      onSuccess();

    } catch (err) {
      console.error(err?.response?.data?.message);

      toast.error(
        err?.response?.data?.message || "Delete failed"
      );
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

          {/* Header */}

          <div className="border-b border-slate-200 p-5">

            <DialogTitle className="text-2xl font-bold text-rose-600">
              Delete Teacher
            </DialogTitle>

          </div>

          {/* Body */}

          <div className="p-5">

            <div className="rounded-2xl bg-rose-50 p-4">

              <p className="text-slate-600">
                Are you sure you want to delete this teacher?
              </p>

              <h2 className="mt-3 text-xl font-bold">
                {teacher?.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {teacher?.phone}
              </p>

            </div>

          </div>

          {/* Footer */}

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
              Cancel
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
                transition
                hover:bg-rose-700
              "
            >
              Delete
            </button>

          </div>

        </DialogPanel>

      </div>

    </Dialog>
  );
}

export default DeleteTeacherModal;