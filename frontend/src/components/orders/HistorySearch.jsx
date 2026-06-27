function HistorySearch({
  search,
  setSearch,
  date,
  setDate,
}) {
  return (
    <div className="mb-5 rounded-2xl bg-white p-5 shadow-sm">

      <div className="grid gap-4 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Search Teacher
          </label>

          <input
            type="text"
            placeholder="Cari Guru..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              p-3
              outline-none
              transition
              focus:border-indigo-500
            "
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Tarikh
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              p-3
              outline-none
              transition
              focus:border-indigo-500
            "
          />

        </div>

      </div>

    </div>
  );
}

export default HistorySearch;