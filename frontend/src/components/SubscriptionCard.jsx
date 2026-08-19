function SubscriptionCard({ subscription, onEdit, onDelete }) {
  const statusColors = {
    active: "bg-green-100 text-green-700",
    cancelled: "bg-gray-100 text-gray-700",
    expired: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{subscription.name}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${statusColors[subscription.status]}`}
        >
          {subscription.status}
        </span>
      </div>

      <p className="text-2xl font-bold">
        {subscription.currency} {subscription.price}
        <span className="text-sm font-normal text-gray-500">
          {" "}
          / {subscription.frequency}
        </span>
      </p>

      <div className="text-sm text-gray-600 space-y-1 mt-2">
        <p>Category: {subscription.category}</p>
        <p>Payment: {subscription.paymentMethod}</p>
        <p>
          Renews: {new Date(subscription.renewalDate).toLocaleDateString()}
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(subscription)}
          className="flex-1 bg-blue-100 text-blue-700 py-1.5 rounded hover:bg-blue-200 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(subscription._id)}
          className="flex-1 bg-red-100 text-red-700 py-1.5 rounded hover:bg-red-200 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default SubscriptionCard;