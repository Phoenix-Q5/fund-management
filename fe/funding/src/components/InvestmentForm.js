import React, { useState } from "react";

function InvestmentForm({ initialValues, onSubmit, onCancel }) {
    const [values, setValues] = useState({
        name: initialValues?.name || "",
        assetClass: initialValues?.assetClass || "",
        purchaseDate: initialValues?.purchaseDate || "",
        quantity: initialValues?.quantity || 0,
        purchasePricePerUnit: initialValues?.purchasePricePerUnit || 0,
        currentMarketValue: initialValues?.currentMarketValue || 0,
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    function validate() {
        const newErrors = {};

        if (!values.name.trim()) newErrors.name = "Investment name is required.";
        if (!values.assetClass.trim())
            newErrors.assetClass = "Asset class is required.";
        if (!values.purchaseDate)
            newErrors.purchaseDate = "Purchase date is required.";
        if (values.quantity <= 0)
            newErrors.quantity = "Quantity must be greater than zero.";
        if (values.purchasePricePerUnit < 0)
            newErrors.purchasePricePerUnit = "Purchase price cannot be negative.";
        if (values.currentMarketValue < 0)
            newErrors.currentMarketValue = "Market value cannot be negative.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]:
                name === "quantity" ||
                name === "purchasePricePerUnit" ||
                name === "currentMarketValue"
                    ? Number(value)
                    : value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        Promise.resolve(onSubmit(values))
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium mb-1">
                    Investment Name<span className="text-red-500">*</span>
                </label>
                <input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
                {errors.name && (
                    <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Asset Class<span className="text-red-500">*</span>
                </label>
                <input
                    name="assetClass"
                    value={values.assetClass}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
                {errors.assetClass && (
                    <p className="text-xs text-red-600 mt-1">{errors.assetClass}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Purchase Date<span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    name="purchaseDate"
                    value={values.purchaseDate}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
                {errors.purchaseDate && (
                    <p className="text-xs text-red-600 mt-1">{errors.purchaseDate}</p>
                )}
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Quantity<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        step="0.0001"
                        name="quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.quantity && (
                        <p className="text-xs text-red-600 mt-1">{errors.quantity}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Purchase Price / Unit
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="purchasePricePerUnit"
                        value={values.purchasePricePerUnit}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.purchasePricePerUnit && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.purchasePricePerUnit}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Current Market Value
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="currentMarketValue"
                        value={values.currentMarketValue}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.currentMarketValue && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.currentMarketValue}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
                {onCancel && (
                    <button
                        type="button"
                        className="px-3 py-1 border rounded"
                        onClick={onCancel}
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
                    disabled={submitting}
                >
                    {submitting
                        ? "Saving..."
                        : initialValues
                            ? "Update Investment"
                            : "Add Investment"}
                </button>
            </div>
        </form>
    );
}

export default InvestmentForm;