import React from "react";

function InvestmentList({ investments, onEdit, onDelete }) {
    if (!investments || investments.length === 0) {
        return (
            <p className="text-sm text-gray-600">
                No investments for this fund yet.
            </p>
        );
    }

    return (
        <div className="overflow-x-auto border rounded-md bg-white">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                <tr>
                    <th className="text-left px-3 py-2">Name</th>
                    <th className="text-left px-3 py-2">Asset Class</th>
                    <th className="text-left px-3 py-2">Purchase Date</th>
                    <th className="text-right px-3 py-2">Quantity</th>
                    <th className="text-right px-3 py-2">Purchase Price</th>
                    <th className="text-right px-3 py-2">Current Value</th>
                    <th className="text-right px-3 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {investments.map((inv) => (
                    <tr key={inv.id} className="border-t">
                        <td className="px-3 py-2">{inv.name}</td>
                        <td className="px-3 py-2">{inv.assetClass}</td>
                        <td className="px-3 py-2">{inv.purchaseDate}</td>
                        <td className="px-3 py-2 text-right">{inv.quantity}</td>
                        <td className="px-3 py-2 text-right">
                            {inv.purchasePricePerUnit}
                        </td>
                        <td className="px-3 py-2 text-right">
                            {inv.currentMarketValue}
                        </td>
                        <td className="px-3 py-2 text-right">
                            <button
                                type="button"
                                className="text-xs px-2 py-1 border rounded mr-1 hover:bg-gray-100"
                                onClick={() => onEdit && onEdit(inv)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="text-xs px-2 py-1 border rounded text-red-700 hover:bg-red-50"
                                onClick={() => onDelete && onDelete(inv)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default InvestmentList;
