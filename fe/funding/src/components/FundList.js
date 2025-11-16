import React from "react";
import FundCard from "./FundCard";

function FundList({ funds, onSelect, onEdit, onDelete, onCreateNew }) {
    return (
        <div>
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Funds</h1>
                <button
                    type="button"
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    onClick={onCreateNew}
                >
                    + New Fund
                </button>
            </header>

            {(!funds || funds.length === 0) ? (
                <p className="text-sm text-gray-600">
                    No funds yet. Click <strong>New Fund</strong> to create one.
                </p>
            ) : (
                funds.map((fund) => (
                    <FundCard
                        key={fund.id}
                        fund={fund}
                        onSelect={onSelect}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))
            )}
        </div>
    );
}

export default FundList;
