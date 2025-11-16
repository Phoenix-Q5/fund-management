import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import {
    fetchFund,
    updateFund,
    deleteFund,
} from "../api/fundApi";
import {
    fetchInvestmentsForFund,
    createInvestment,
    updateInvestment,
    deleteInvestment,
} from "../api/investmentApi";

import FundForm from "../components/FundForm";
import InvestmentList from "../components/InvestmentList";
import InvestmentForm from "../components/InvestmentForm";

function FundDetailPage() {
    const { fundId } = useParams();
    const navigate = useNavigate();

    const [fund, setFund] = useState(null);
    const [investments, setInvestments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingFund, setEditingFund] = useState(false);

    const [showInvestmentForm, setShowInvestmentForm] = useState(false);
    const [editingInvestment, setEditingInvestment] = useState(null);

    function loadData() {
        if (!fundId) return;

        setLoading(true);
        setError(null);

        Promise.all([
            fetchFund(fundId),
            fetchInvestmentsForFund(fundId),
        ])
            .then(([fundData, investmentData]) => {
                setFund(fundData);
                setInvestments(investmentData || []);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message || "Failed to load fund details");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        loadData();
    }, [fundId]);

    function handleDeleteFund() {
        const confirmed = window.confirm(
            `Delete fund "${fund?.name}" and all its investments?`
        );
        if (!confirmed || !fundId) return;

        deleteFund(fundId)
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
                alert(err.message || "Failed to delete fund");
            });
    }

    function handleUpdateFund(values) {
        if (!fundId) return;

        return updateFund(fundId, values)
            .then((updated) => {
                setFund(updated);
                setEditingFund(false);
            })
            .catch((err) => {
                console.error(err);
                alert(err.message || "Failed to update fund");
            });
    }

    function handleCreateInvestment(values) {
        if (!fundId) return;

        return createInvestment(fundId, values)
            .then(() => {
                setShowInvestmentForm(false);
                setEditingInvestment(null);
                loadData();
            })
            .catch((err) => {
                console.error(err);
                alert(err.message || "Failed to create investment");
            });
    }

    function handleUpdateInvestment(values) {
        if (!editingInvestment) return;

        return updateInvestment(editingInvestment.id, values)
            .then(() => {
                setShowInvestmentForm(false);
                setEditingInvestment(null);
                loadData();
            })
            .catch((err) => {
                console.error(err);
                alert(err.message || "Failed to update investment");
            });
    }

    function handleSubmitInvestment(values) {
        if (editingInvestment) {
            return handleUpdateInvestment(values);
        } else {
            return handleCreateInvestment(values);
        }
    }

    function handleEditInvestment(investment) {
        setEditingInvestment(investment);
        setShowInvestmentForm(true);
    }

    function handleDeleteInvestment(investment) {
        const confirmed = window.confirm(
            `Delete investment "${investment.name}"?`
        );
        if (!confirmed) return;

        deleteInvestment(investment.id)
            .then(() => {
                loadData();
            })
            .catch((err) => {
                console.error(err);
                alert(err.message || "Failed to delete investment");
            });
    }

    if (loading) {
        return <p>Loading fund...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>Error: {error}</p>;
    }

    if (!fund) {
        return (
            <div>
                <button onClick={() => navigate("/")}>← Back to Funds</button>
                <p>Fund not found.</p>
            </div>
        );
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => navigate("/")}
                className="text-sm mb-3"
            >
                ← Back to Funds
            </button>

            <section className="mb-6 border rounded-md p-4 bg-white shadow-sm">
                {!editingFund ? (
                    <>
                        <h1 className="text-sm font-semibold mb-1">{fund.name}</h1>
                        <p className="text-lg text-gray-600 mb-1">
                            Manager: <span className="font-medium">{fund.managerName}</span>
                        </p>
                        {fund.description && (
                            <p className="text-sm text-gray-700 mb-2">
                                {fund.description}
                            </p>
                        )}
                        <p className="text-sm">
                            Inception: {fund.inceptionDate}
                        </p>
                        <p className="text-sm">
                            Total Value: {fund.totalValue}
                        </p>
                        <p className="text-sm mb-2">
                            YTD Return: {fund.ytdReturnPercentage}%
                        </p>

                        <div className="mt-2 flex gap-2">
                            <button
                                type="button"
                                className="px-3 py-1 border rounded text-sm"
                                onClick={() => setEditingFund(true)}
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                className="px-3 py-1 border rounded text-sm text-red-700"
                                onClick={handleDeleteFund}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Edit Fund</h2>
                        <FundForm
                            initialValues={fund}
                            onSubmit={handleUpdateFund}
                            onCancel={() => setEditingFund(false)}
                        />
                    </div>
                )}
            </section>

            <section className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">Investments</h2>
                    <button
                        type="button"
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                        onClick={() => {
                            setEditingInvestment(null);
                            setShowInvestmentForm(true);
                        }}
                    >
                        + Add Investment
                    </button>
                </div>

                <InvestmentList
                    investments={investments}
                    onEdit={handleEditInvestment}
                    onDelete={handleDeleteInvestment}
                />

                {showInvestmentForm && (
                    <div className="mt-4 border rounded-md p-4 bg-white shadow-sm">
                        <h3 className="text-md font-semibold mb-2">
                            {editingInvestment ? "Edit Investment" : "New Investment"}
                        </h3>
                        <InvestmentForm
                            initialValues={editingInvestment}
                            onSubmit={handleSubmitInvestment}
                            onCancel={() => {
                                setShowInvestmentForm(false);
                                setEditingInvestment(null);
                            }}
                        />
                    </div>
                )}
            </section>
        </div>
    );
}

export default FundDetailPage;