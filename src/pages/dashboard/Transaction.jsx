import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../hooks/GetAuth";
import useAxiosSecure from "../../hooks/AxiosSecure";
import { Copy } from "lucide-react";

const Transaction = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: transaction = [] } = useQuery({
    queryKey: ["transaction", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`payments?email=${user?.email}`);
      return res.data;
    },
  });

  const [copy, setCopy] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopy(text);
    setTimeout(() => setCopy(null), 1500);
  };

  return (
    <div className="p-4 ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Transactions</h1>

      {transaction.length === 0 ? (
        <div className="text-center text-gray-500 py-10  rounded-lg ">
          <p>No transactions found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Transaction ID
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Amount
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Payment Method
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transaction.map((txn) => (
                <tr key={txn._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800 flex items-center gap-2">
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {txn.transactionId}
                    </span>
                    <button
                      onClick={() => handleCopy(txn.transactionId)}
                      className="text-gray-400 hover:text-blue-600 transition"
                      title="Copy Transaction ID"
                    >
                      <Copy size={16} />
                    </button>
                    {copy === txn.transactionId && (
                      <span className="text-green-500 text-xs ml-2">
                        Copied!
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-green-600 font-semibold">
                    ৳ {txn.amount}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        txn.paymentMethod === "card"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {txn.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(txn.paid_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transaction;
