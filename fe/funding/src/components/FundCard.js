import React from "react";

function FundCard({ fund, onSelect, onEdit, onDelete }) {
    return (
        <div
            className="border rounded-md p-4 mb-3 bg-white shadow-sm hover:shadow cursor-pointer"
            onClick={() => onSelect && onSelect(fund)}
        >
            <div className="flex justify-between items-start gap-2">
                <div>
                    <h2 className="font-semibold text-lg">{fund.name}</h2>
                    <p className="text-sm text-gray-600">
                        Manager: <span className="font-medium">{fund.managerName}</span>
                    </p>
                    {fund.description && (
                        <p className="text-sm text-gray-500 mt-1">
                            {fund.description}
                        </p>
                    )}
                </div>

                <div className="text-right text-sm">
                    <div>
                        AUM: <span className="font-medium">{fund.totalValue}</span>
                    </div>
                    <div>
                        YTD:{" "}
                        <span
                            className={
                                fund.ytdReturnPercentage >= 0
                                    ? "text-green-600 font-medium"
                                    : "text-red-600 font-medium"
                            }
                        >
              {fund.ytdReturnPercentage}%
            </span>
                    </div>

                    <div className="mt-2 flex gap-1 justify-end">
                        <button
                            type="button"
                            className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit && onEdit(fund);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="text-xs px-2 py-1 border rounded text-red-700 hover:bg-red-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete && onDelete(fund);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FundCard;
