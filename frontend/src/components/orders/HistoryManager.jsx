import { useEffect, useState } from "react";
import { getOrderHistory } from "../../api/order.api";

import HistorySearch from "./HistorySearch";
import HistoryCard from "./HistoryCard";
import HistoryDetailModal from "./HistoryDetailModal";

function HistoryManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

const fetchHistory = async () => {
  try {
    setLoading(true);

    const params = {};

    if (search.trim()) {
      params.search = search.trim();
    }

    if (date) {
      params.date = date;
    }

    const res = await getOrderHistory(params);

    setOrders(res.data.data);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>

      <HistorySearch
        search={search}
        setSearch={setSearch}
        date={date}
        setDate={setDate}
      />

      <div className="mb-5">
        <button
          onClick={fetchHistory}
          className="
            rounded-2xl
            bg-indigo-600
            px-5
            py-3
            font-semibold
            text-white
          "
        >
          Cari
        </button>
      </div>

      {loading ? (

        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          Memuatkan...
        </div>

      ) : orders.length === 0 ? (

        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          Tiada Sejarah
        </div>

      ) : (

        <div className="space-y-3">

          {orders.map((order) => (

            <HistoryCard
              key={order.id}
              order={order}
              onClick={(order) => {
                setSelectedOrder(order);
                setIsDetailModalOpen(true);
              }}
            />

          ))}

        </div>

      )}

      <HistoryDetailModal
        open={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        order={selectedOrder}
      />

    </div>
  );
}

export default HistoryManager;