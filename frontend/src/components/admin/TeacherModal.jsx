import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/api";

function TeacherModal({
  open,
  onClose,
  teacher,
  onSuccess,
}) {
  const isEdit = !!teacher;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (teacher) {
      setName(teacher.name);
      setPhone(teacher.phone);
    } else {
      setName("");
      setPhone("");
    }
  }, [teacher]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Teacher name is required");
      return;
    }

    if (!phone.trim()) {
      toast.error("Phone number is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: name.trim(),
        phone: phone.trim(),
      };

      if (isEdit) {
        await api.put(`/users/${teacher.id}`, payload);

        toast.success("Teacher updated successfully");
      } else {
        await api.post("/users", payload);

        toast.success("Teacher added successfully");
      }

      onSuccess();
      onClose();

    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!loading) onClose();
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">

        <DialogPanel className="w-full max-w-md rounded-3xl bg-white shadow-xl">

          {/* Header */}
          <div className="border-b border-slate-200 p-5">

            <DialogTitle className="text-2xl font-bold">
              {isEdit ? "Edit Teacher" : "Add Teacher"}
            </DialogTitle>

            <p className="mt-1 text-sm text-slate-500">
              {isEdit
                ? "Update teacher information"
                : "Create a new teacher"}
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-5"
          >

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Teacher Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Cikgu Ahmad"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-300
                  p-3
                  outline-none
                  transition
                  focus:border-indigo-500
                "
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Phone Number
              </label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="60123456789"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-300
                  p-3
                  outline-none
                  transition
                  focus:border-indigo-500
                "
              />

            </div>

            <div className="flex gap-3 pt-2">

              <button
                type="button"
                disabled={loading}
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
                type="submit"
                disabled={loading}
                className="
                  flex-1
                  rounded-2xl
                  bg-indigo-600
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-indigo-700
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Saving..."
                  : isEdit
                  ? "Update"
                  : "Save"}
              </button>

            </div>

          </form>

        </DialogPanel>

      </div>
    </Dialog>
  );
}

export default TeacherModal;