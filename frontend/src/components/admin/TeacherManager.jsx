import { useEffect, useState } from "react";
import { getUsers } from "../../api/user.api";

import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import TeacherModal from "./TeacherModal";
import DeleteTeacherModal from "./DeleteTeacherModal";

function TeacherManager() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);

      const res = await getUsers()

      setTeachers(res.data.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          {/* <h2 className="text-2xl font-bold">
            Teacher
          </h2> */}

          <p className="text-slate-500">
            Manage teacher
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedTeacher(null);
            setModalOpen(true);
          }}
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-indigo-600
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-indigo-700
          "
        >
          <PlusIcon className="h-5 w-5" />
          Tambah guru
        </button>

      </div>

      {/* List */}

      <div className="space-y-3">

        {loading ? (

          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            Memuatkan...
          </div>

        ) : teachers.length === 0 ? (

          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            Tiada guru
          </div>

        ) : (

          teachers.map((teacher) => (

            <div
              key={teacher.id}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
              "
            >

              <div>

                <h3 className="font-semibold text-slate-900">
                  {teacher.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {teacher.phone}
                </p>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => {
                    setSelectedTeacher(teacher);
                    setModalOpen(true);
                  }}
                  className="
                    rounded-xl
                    bg-amber-100
                    p-2
                    text-amber-600
                    transition
                    hover:bg-amber-200
                  "
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>

                <button
                  onClick={() => {
                    setSelectedTeacher(teacher);
                    setDeleteOpen(true);
                  }}
                  className="
                    rounded-xl
                    bg-rose-100
                    p-2
                    text-rose-600
                    transition
                    hover:bg-rose-200
                  "
                >
                  <TrashIcon className="h-5 w-5" />
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      <TeacherModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        teacher={selectedTeacher}
        onSuccess={fetchTeachers}
      />

      <DeleteTeacherModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        teacher={selectedTeacher}
        onSuccess={fetchTeachers}
      />

    </>
  );
}

export default TeacherManager;