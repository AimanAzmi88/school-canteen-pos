import {
  ArrowUturnLeftIcon,
  TrashIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

function ActionButtons({
  onUndo,
  onReset,
  onPay,
  canUndo,
  canReset,
}) {
  return (
    <section className="px-5 py-5">

      <button
        onClick={onPay}
        disabled={!canReset}
        className="
          mb-4
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-indigo-600
          py-4
          text-lg
          font-bold
          text-white
          shadow-lg
          transition
          hover:bg-indigo-700
          active:scale-95
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <CreditCardIcon className="h-6 w-6" />

        Hantar Pesanan
      </button>

      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-amber-200
            bg-amber-50
            py-3
            font-semibold
            text-amber-700
            transition
            hover:bg-amber-100
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ArrowUturnLeftIcon className="h-5 w-5" />

          Kembali
        </button>

        <button
          onClick={onReset}
          disabled={!canReset}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-rose-200
            bg-rose-50
            py-3
            font-semibold
            text-rose-700
            transition
            hover:bg-rose-100
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <TrashIcon className="h-5 w-5" />

          Kosongkan
        </button>

      </div>

    </section>
  );
}

export default ActionButtons;