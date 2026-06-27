import { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

import AppLayout from "../layouts/AppLayout";

import TeacherSelect from "../components/home/TeacherSelect";
import TeacherModal from "../components/home/TeacherModal";
import TotalCard from "../components/home/TotalCard";
import SelectedList from "../components/home/SelectedList";
import FoodGrid from "../components/home/FoodGrid";
import FoodModal from "../components/home/FoodModal";
import ActionButtons from "../components/home/ActionButtons";

function Home() {
  const [foods, setFoods] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [teacherModalOpen, setTeacherModalOpen] = useState(false);
  const [foodModalOpen, setFoodModalOpen] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [selected, setSelected] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchFoods();
    fetchTeachers();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await api.get("/menus");
      setFoods(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuatkan menu");
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await api.get("/users");
      setTeachers(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuatkan guru");
    }
  };

  const total = useMemo(() => {
    return selected.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }, [selected]);

  const handleFoodClick = (food) => {
    setSelected((prev) => {
      const index = prev.findIndex((item) => item.id === food.id);

      if (index === -1) {
        return [...prev, { ...food, qty: 1 }];
      }

      const copy = [...prev];

      copy[index] = {
        ...copy[index],
        qty: copy[index].qty + 1,
      };

      return copy;
    });

    setHistory((prev) => [...prev, food.id]);

    toast.success(`${food.name} ditambahkan`);
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const lastId = history[history.length - 1];

    setSelected((prev) => {
      const index = prev.findIndex(
        (item) => item.id === lastId
      );

      if (index === -1) return prev;

      const copy = [...prev];

      if (copy[index].qty === 1) {
        copy.splice(index, 1);
      } else {
        copy[index] = {
          ...copy[index],
          qty: copy[index].qty - 1,
        };
      }

      return copy;
    });

    setHistory((prev) => prev.slice(0, -1));

    toast.success("Item terakhir dihapus");
  };

  const handleReset = () => {
    setSelected([]);
    setHistory([]);
    setSelectedTeacher(null);

    toast.success("Order dikosongkan");
  };

  const handlePay = async () => {
    if (!selectedTeacher) {
      toast.error("Sila pilih guru");
      return;
    }

    if (selected.length === 0) {
      toast.error("Sila tambah menu");
      return;
    }

    const payload = {
      teacherId: selectedTeacher.id,
      items: selected.map((item) => ({
        menuId: item.id,
        quantity: item.qty,
      })),
    };

    try {
      const res = await api.post("/orders", payload);

      toast.success("Pesanan berjaya dihantar");

      console.log(res.data);

      handleReset();

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Gagal membuat pesanan"
      );
    }
  };

     return (
    <>
      <AppLayout
        title="Tiara Sinar POS"
        subtitle="Point of Sale"
        status="Ready"
      >
        <TeacherSelect
          selectedTeacher={selectedTeacher}
          onOpenModal={() => setTeacherModalOpen(true)}
        />

        <TotalCard total={total} />

        <SelectedList foods={selected} />

        <FoodGrid
          onOpenModal={() => setFoodModalOpen(true)}
        />

        <ActionButtons
          onPay={handlePay}
          onUndo={handleUndo}
          onReset={handleReset}
          canUndo={history.length > 0}
          canReset={selected.length > 0}
        />
      </AppLayout>

      <FoodModal
        open={foodModalOpen}
        onClose={() => setFoodModalOpen(false)}
        foods={foods}
        onSelectFood={handleFoodClick}
      />

      <TeacherModal
        open={teacherModalOpen}
        onClose={() => setTeacherModalOpen(false)}
        teachers={teachers}
        onSelectTeacher={(teacher) => {
          setSelectedTeacher(teacher);
        }}
      />
    </>
  );
}

export default Home;