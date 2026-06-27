import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

function OrderDetailModal({
  open,
  onClose,
  userId,
  onSent,
}) {
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open && userId) {
      fetchReceipt();
    }
  }, [open, userId]);

  const fetchReceipt = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/orders/user/${userId}`);

      setReceipt(res.data.receipt);

    } catch (err) {
      console.error(err);
      toast.error("Gagal memuatkan resit");
    } finally {
      setLoading(false);
    }
  };

  const handleSendReceipt = async () => {
    try {
      setSending(true);

      await api.post(`/orders/send-receipt/${userId}`);

      toast.success("Resit berjaya dihantar");

      onClose();

      if (onSent) {
        onSent();
      }

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Resit gagal dihantar"
      );

    } finally {
      setSending(false);
    }
  };

  const formatRM = (value) =>
    new Intl.NumberFormat("ms-MY", {
      style: "currency",
      currency: "MYR",
    }).format(Number(value));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">

        <DialogPanel className="w-full max-w-lg rounded-3xl bg-white shadow-xl">

          {/* Header */}

          <div className="border-b p-5">

            <DialogTitle className="text-2xl font-bold">
              Resit
            </DialogTitle>

          </div>

          {/* Body */}

          {loading ? (

            <div className="p-10 text-center">
              Memuatkan...
            </div>

          ) : !receipt ? (

            <div className="p-10 text-center">
              Tiada resit tertunda
            </div>

          ) : (

            <div className="max-h-[70vh] overflow-y-auto p-5">

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-sm text-slate-500">
                  Guru
                </p>

                <h3 className="text-lg font-bold">
                  {receipt.teacher.name}
                </h3>

              </div>

              <div className="mt-6 space-y-3">

                {receipt.items.map((item, index) => (

                  <div
                    key={index}
                    className="flex justify-between rounded-xl border p-3"
                  >

                    <div>

                      <h4 className="font-semibold">
                        {item.name}
                      </h4>

                      <p className="text-sm text-slate-500">
                        {item.quantity} × {formatRM(item.unitPrice)}
                      </p>

                    </div>

                    <div className="font-bold">
                      {formatRM(item.subtotal)}
                    </div>

                  </div>

                ))}

              </div>

              <div className="mt-6 border-t pt-5">

                <div className="flex justify-between text-xl font-bold">

                  <span>Jumlah</span>

                  <span>
                    {formatRM(receipt.total)}
                  </span>

                </div>

              </div>

            </div>

          )}

          {/* Footer */}

          <div className="border-t p-5 space-y-3">

            <button
              onClick={handleSendReceipt}
              disabled={sending || !receipt}
              className="w-full rounded-2xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              {sending
                ? "Menghantar"
                : "Hantar Resit"}
            </button>

            <button
              onClick={onClose}
              className="w-full rounded-2xl bg-indigo-600 py-3 font-semibold text-white"
            >
              Tutup
            </button>

          </div>

        </DialogPanel>

      </div>

    </Dialog>
  );
}

export default OrderDetailModal;