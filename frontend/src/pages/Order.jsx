import AppLayout from "../layouts/AppLayout";
import OrderManager from "../components/orders/OrderManager";
import {useState} from "react";
import HistoryManager from "../components/orders/HistoryManager";

function Orders() {

  const [activeTab, setActiveTab] = useState("pending");
  return (
    <AppLayout
      title="Pesanan"
      subtitle="Ringkasan dan sejarah pesanan"
      status="Today"
    >
      <div className="mb-5 grid grid-cols-2 gap-3">

  <button
    onClick={() => setActiveTab("pending")}
    className={`rounded-2xl py-3 font-semibold transition ${
      activeTab === "pending"
        ? "bg-indigo-600 text-white"
        : "bg-slate-100"
    }`}
  >
    Resit Tertunda
  </button>

  <button
    onClick={() => setActiveTab("history")}
    className={`rounded-2xl py-3 font-semibold transition ${
      activeTab === "history"
        ? "bg-indigo-600 text-white"
        : "bg-slate-100"
    }`}
  >
    Sejarah Pesanan
  </button>

</div>
      {activeTab === "pending" && (
    <OrderManager />
)}

{activeTab === "history" && (
    <HistoryManager />
)}
    </AppLayout>
  );
}

export default Orders;