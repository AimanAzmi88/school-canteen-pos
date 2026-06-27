import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

function TeacherModal({
  open,
  onClose,
  onSelectTeacher,
  teachers = [],
}) {
  const [search, setSearch] = useState("");

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) =>
      teacher.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [teachers, search]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-black/40"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">

        <DialogPanel className="w-full max-w-md rounded-3xl bg-white shadow-xl">

          {/* Header */}

          <div className="border-b border-slate-200 p-5">

            <DialogTitle className="text-xl font-bold">
              Pilih Guru
            </DialogTitle>

          </div>

          {/* Search */}

          <div className="p-5">

            <div className="flex items-center rounded-2xl border border-slate-300 px-4">

              <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />

              <input
                type="text"
                placeholder="Cari guru..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent px-3 py-3 outline-none"
              />

            </div>

          </div>

          {/* Teacher List */}

          <div className="max-h-96 overflow-y-auto px-5 pb-5">

            {filteredTeachers.length === 0 ? (

              <div className="py-10 text-center text-slate-500">
                Tiada Guru Ditemui
              </div>

            ) : (

              <div className="space-y-2">

                {filteredTeachers.map((teacher) => (

                  <button
                    key={teacher.id}
                    onClick={() => {
                      onSelectTeacher(teacher);
                      setSearch("");
                      onClose();
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-slate-200
                      p-4
                      transition
                      hover:border-indigo-400
                      hover:bg-indigo-50
                    "
                  >

                    <div className="text-left">

                      <h3 className="font-semibold">
                        {teacher.name}
                      </h3>
                    </div>

                    <span className="font-semibold text-indigo-600">
                      Pilih
                    </span>

                  </button>

                ))}

              </div>

            )}

          </div>

          {/* Footer */}

          <div className="border-t border-slate-200 p-5">

            <button
              onClick={() => {
                setSearch("");
                onClose();
              }}
              className="
                w-full
                rounded-2xl
                bg-slate-200
                py-3
                font-semibold
              "
            >
              Tutup
            </button>

          </div>

        </DialogPanel>

      </div>

    </Dialog>
  );
}

export default TeacherModal;