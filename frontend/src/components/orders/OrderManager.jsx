import { useEffect, useMemo, useState } from "react";
import api from "../../api/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import OrderCard from "./OrderCard";
import OrderDetailModal from "./OrderDetailModal";

function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await api.get("/orders");

      setOrders(res.data.data);

    } catch (err) {
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

const filteredOrders = useMemo(() => {
  const keyword = search.toLowerCase();

  return orders.filter((order) => {
    return (
      order.teacher.name
        .toLowerCase()
        .includes(keyword) ||
      order.teacher.phone.includes(keyword)
    );
  });
}, [orders, search]);

  return (
    <>
 

      {/* Search */}

      <div className="mb-6">

        <div className="flex items-center rounded-2xl border border-slate-300 bg-white px-4 shadow-sm">

          <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />

          <input
            type="text"
            placeholder="Cari pesanan atau guru..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent px-3 py-3 outline-none"
          />

        </div>

      </div>

      {/* Orders */}

      {loading ? (

        <div className="rounded-3xl bg-white p-8 text-center shadow">

          Memuatkan pesanan...

        </div>

      ) : filteredOrders.length === 0 ? (

        <div className="rounded-3xl bg-white p-8 text-center shadow">

          Tiada Pesanan

        </div>

      ) : (

        <div className="space-y-4">

{filteredOrders.map((order) => (
  <OrderCard
    key={order.teacher.id}
    order={order}
    onView={(order) => {
      setSelectedUserId(order.teacher.id);
      setDetailOpen(true);
    }}
  />
))}

        </div>

      )}

<OrderDetailModal
  open={detailOpen}
  onClose={() => setDetailOpen(false)}
  userId={selectedUserId}
  onSent={fetchOrders}
/>

    </>
  );
}

export default OrderManager;