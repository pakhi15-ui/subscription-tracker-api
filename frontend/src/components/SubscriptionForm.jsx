import { useState } from "react";

const CATEGORIES = [
  "sports",
  "news",
  "entertainment",
  "lifestyle",
  "technology",
  "finance",
  "politics",
  "other",
];
const FREQUENCIES = ["daily", "weekly", "monthly", "yearly"];
const CURRENCIES = ["USD", "EUR", "GBP", "INR"];

function SubscriptionForm({ initialData, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    price: initialData?.price || "",
    currency: initialData?.currency || "USD",
    frequency: initialData?.frequency || "monthly",
    category: initialData?.category || "entertainment",
    paymentMethod: initialData?.paymentMethod || "",
    startDate: initialData?.startDate
      ? initialData.startDate.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, price: Number(form.price) });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-3"
    >
      <h2 className="text-xl font-bold mb-2">
        {initialData ? "Edit Subscription" : "Add Subscription"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Name (e.g. Netflix)"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />

      <div className="flex gap-2">
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-1/2 border rounded p-2"
          step="0.01"
          min="0"
          required
        />
        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          className="w-1/2 border rounded p-2"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <select
        name="frequency"
        value={form.frequency}
        onChange={handleChange}
        className="w-full border rounded p-2"
      >
        {FREQUENCIES.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border rounded p-2"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="paymentMethod"
        placeholder="Payment Method (e.g. Credit Card)"
        value={form.paymentMethod}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />

      <div>
        <label className="text-sm text-gray-600">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default SubscriptionForm;