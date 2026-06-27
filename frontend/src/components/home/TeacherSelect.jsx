import {
  ChevronDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

function TeacherSelect({
  selectedTeacher,
  onOpenModal,
}) {
  return (
    <section className="px-5 pt-5">
      <p className="mb-2 text-sm font-bold text-slate-900">
        Senarai Guru
      </p>

      <button
        type="button"
        onClick={onOpenModal}
        className="
          flex
          w-full
          items-center
          justify-between
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-4
          py-4
          shadow-sm
          transition
          hover:border-indigo-400
          hover:bg-slate-50
        "
      >
        <div className="flex items-center gap-3">

          <div className="rounded-full bg-indigo-100 p-2">
            <UserCircleIcon className="h-6 w-6 text-indigo-600" />
          </div>

          <div className="text-left">

            <p className="text-xs text-slate-500">
              Guru Dipilih
            </p>

            <p className="font-semibold text-slate-900">
              {selectedTeacher
                ? selectedTeacher.name
                : "Pilih Guru"}
            </p>

          </div>

        </div>

        <ChevronDownIcon className="h-5 w-5 text-slate-500" />
      </button>
    </section>
  );
}

export default TeacherSelect;