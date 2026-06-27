import { useState } from "react";

import AppLayout from "../layouts/AppLayout";

import FoodManager from "../components/admin/FoodManager";
import TeacherManager from "../components/admin/TeacherManager";

function Admin() {
  const [activeTab, setActiveTab] = useState("food");
  const [menuCategory, setMenuCategory] = useState("FOOD");
  const [foodType, setFoodType] = useState("NASI");

  return (
    <AppLayout
      title="Admin"
      subtitle="Pengurusan menu dan guru"
      status="Manage"
    >
      {/* Tabs */}

      <div className="flex gap-3">

        <button
          onClick={() => setActiveTab("food")}
          className={`flex-1 rounded-2xl py-4 font-semibold transition ${
            activeTab === "food"
              ? "bg-indigo-600 text-white"
              : "bg-white text-slate-700 shadow-sm hover:bg-slate-50"
          }`}
        >
           Menu
        </button>

        <button
          onClick={() => setActiveTab("teacher")}
          className={`flex-1 rounded-2xl py-4 font-semibold transition ${
            activeTab === "teacher"
              ? "bg-indigo-600 text-white"
              : "bg-white text-slate-700 shadow-sm hover:bg-slate-50"
          }`}
        >
           Guru
        </button>

      </div>

      {/* Content */}

{/* Content */}

<div className="mt-5 rounded-3xl bg-white p-6 shadow-sm">

{activeTab === "food" && (
  <>
    {/* Category */}

    <div className="mb-4 flex gap-3">

      <button
        onClick={() => setMenuCategory("FOOD")}
        className={`flex-1 rounded-2xl py-3 font-semibold transition ${
          menuCategory === "FOOD"
            ? "bg-emerald-600 text-white"
            : "bg-slate-100"
        }`}
      >
        Makanan
      </button>

      <button
        onClick={() => setMenuCategory("DRINK")}
        className={`flex-1 rounded-2xl py-3 font-semibold transition ${
          menuCategory === "DRINK"
            ? "bg-sky-600 text-white"
            : "bg-slate-100"
        }`}
      >
        Minuman
      </button>

    </div>

    {/* Food Type */}

    {menuCategory === "FOOD" && (

      <div className="mb-5 flex gap-3">

        <button
          onClick={() => setFoodType("NASI")}
          className={`flex-1 rounded-xl py-2 font-medium transition ${
            foodType === "NASI"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100"
          }`}
        >
          Lauk Pauk
        </button>

        <button
          onClick={() => setFoodType("GORENG")}
          className={`flex-1 rounded-xl py-2 font-medium transition ${
            foodType === "GORENG"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100"
          }`}
        >
          Goreng-goreng
        </button>

      </div>

    )}

    <FoodManager
      category={menuCategory}
      type={foodType}
    />

  </>
)}

  {activeTab === "teacher" && (
    <TeacherManager />
  )}

</div>

    </AppLayout>
  );
}

export default Admin;