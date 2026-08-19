import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  getUserSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from "../api/subscriptions.js";
import SubscriptionCard from "../components/SubscriptionCard.jsx";
import SubscriptionForm from "../components/SubscriptionForm.jsx";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingSub, setEditingSub] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchSubscriptions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getUserSubscriptions(user.id || user._id);
      setSubscriptions(res.data);
    } catch (err) {
      setError("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddClick = () => {
    setEditingSub(null);
    setShowForm(true);
  };

  const handleEditClick = (subscription) => {
    setEditingSub(subscription);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (editingSub) {
        await updateSubscription(editingSub._id, formData);
      } else {
        await createSubscription(formData);
      }
      setShowForm(false);
      setEditingSub(null);
      fetchSubscriptions();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save subscription");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this subscription?")) return;
    try {
      await deleteSubscription(id);
      fetchSubscriptions();
    } catch (err) {
      alert("Failed to delete subscription");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <div className="flex gap-2">
          <button
            onClick={handleAddClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Subscription
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Log Out
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <SubscriptionForm
            initialData={editingSub}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingSub(null);
            }}
            loading={formLoading}
          />
        </div>
      )}

      {loading && <p className="text-gray-500">Loading subscriptions...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && subscriptions.length === 0 && (
        <p className="text-gray-500">
          No subscriptions yet. Click "Add Subscription" to create one.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subscriptions.map((sub) => (
          <SubscriptionCard
            key={sub._id}
            subscription={sub}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;