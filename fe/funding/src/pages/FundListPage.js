import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    fetchFunds,
    createFund,
    updateFund,
    deleteFund,
} from "../api/fundApi";
import FundList from "../components/FundList";
import FundForm from "../components/FundForm";

function FundListPage() {
    const [funds, setFunds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [editingFund, setEditingFund] = useState(null);

    const navigate = useNavigate();

    function loadFunds() {
        setLoading(true);
        setError(null);

        fetchFunds()
            .then((data) => {
                setFunds(data || []);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message || "Failed to load funds");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        loadFunds();
    }, []);

    function handleSelectFund(fund) {
        navigate(`/funds/${fund.id}`);
    }

    function handleCreateNew() {
        setEditingFund(null);
        setShowForm(true);
    }

    function handleEditFund(fund) {
        setEditingFund(fund);
        setShowForm(true);
    }

    function handleDeleteFund(fund) {
        const confirmed = window.confirm(
            `Delete fund "${fund.name}" and all its investments?`
        );
        if (!confirmed) return;

        deleteFund(fund.id)
            .then(() => {
                loadFunds();
            })
            .catch((err) => {
                console.error(err);
                alert(err.message || "Failed to delete fund");
            });
    }

    function handleSubmitFund(values) {
        if (editingFund) {
            // update
            return updateFund(editingFund.id, values)
                .then(() => {
                    setShowForm(false);
                    setEditingFund(null);
                    loadFunds();
                })
                .catch((err) => {
                    console.error(err);
                    alert(err.message || "Failed to update fund");
                });
        } else {
            // create
            return createFund(values)
                .then(() => {
                    setShowForm(false);
                    loadFunds();
                })
                .catch((err) => {
                    console.error(err);
                    alert(err.message || "Failed to create fund");
                });
        }
    }

    if (loading) {
        return <p>Loading funds...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>Error: {error}</p>;
    }

    return (
        <div>
            <FundList
                funds={funds}
                onSelect={handleSelectFund}
                onEdit={handleEditFund}
                onDelete={handleDeleteFund}
                onCreateNew={handleCreateNew}
            />

            {showForm && (
                <div className="mt-6 border rounded-md p-4 bg-white shadow-sm">
                    <h2 className="text-lg font-semibold mb-2">
                        {editingFund ? "Edit Fund" : "New Fund"}
                    </h2>
                    <FundForm
                        initialValues={editingFund}
                        onSubmit={handleSubmitFund}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingFund(null);
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default FundListPage;