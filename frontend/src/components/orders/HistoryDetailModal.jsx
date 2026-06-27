import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

function HistoryDetailModal({
  open,
  onClose,
  order,
}) {

  if (!order) return null;

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

          <div className="border-b p-5">

            <DialogTitle className="text-2xl font-bold">
              Resit
            </DialogTitle>

            <p className="mt-1 text-slate-500">
              {order.receiptNo}
            </p>

          </div>

          {/* Teacher */}

          <div className="border-b p-5">

            <h3 className="font-bold">
              {order.teacher.name}
            </h3>
          </div>

          {/* Items */}

          <div className="max-h-80 overflow-y-auto p-5">

            <div className="space-y-3">

              {order.items.map((item) => (

                <div
                  key={item.id}
                  className="flex justify-between"
                >

                  <div>

                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {item.quantity} × RM {Number(item.unitPrice).toFixed(2)}
                    </p>

                  </div>

                  <p className="font-semibold">
                    RM {Number(item.subtotal).toFixed(2)}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* Total */}

          <div className="border-t p-5">

            <div className="mb-5 flex justify-between">

              <span className="text-lg font-bold">
                Jumlah
              </span>

              <span className="text-lg font-bold">
                RM {Number(order.total).toFixed(2)}
              </span>

            </div>

            <button
              onClick={onClose}
              className="
                w-full
                rounded-2xl
                bg-indigo-600
                py-3
                font-semibold
                text-white
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

export default HistoryDetailModal;