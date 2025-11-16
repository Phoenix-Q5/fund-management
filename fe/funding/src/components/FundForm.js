import React, { useState } from "react";

function FundForm({ initialValues, onSubmit, onCancel }) {
    const [values, setValues] = useState({
        name: initialValues?.name || "",
        managerName: initialValues?.managerName || "",
        description: initialValues?.description || "",
        inceptionDate: initialValues?.inceptionDate || "",
        totalValue: initialValues?.totalValue || 0,
        ytdReturnPercentage: initialValues?.ytdReturnPercentage || 0,
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    function validate() {
        const newErrors = {};

        if (!values.name.trim()) {
            newErrors.name = "Fund name is required.";
        }
        if (!values.managerName.trim()) {
            newErrors.managerName = "Manager name is required.";
        }
        if (!values.inceptionDate) {
            newErrors.inceptionDate = "Inception date is required.";
        }
        if (values.totalValue < 0) {
            newErrors.totalValue = "Total value cannot be negative.";
        }
        if (!Number.isFinite(values.ytdReturnPercentage)) {
            newErrors.ytdReturnPercentage = "YTD return must be a number.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]:
                name === "totalValue" || name === "ytdReturnPercentage"
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
                    Fund Name<span className="text-red-500">*</span>
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
                    Manager Name<span className="text-red-500">*</span>
                </label>
                <input
                    name="managerName"
                    value={values.managerName}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
                {errors.managerName && (
                    <p className="text-xs text-red-600 mt-1">{errors.managerName}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                    rows={3}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Inception Date<span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    name="inceptionDate"
                    value={values.inceptionDate}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
                {errors.inceptionDate && (
                    <p className="text-xs text-red-600 mt-1">{errors.inceptionDate}</p>
                )}
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                        Total Value (AUM)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="totalValue"
                        value={values.totalValue}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.totalValue && (
                        <p className="text-xs text-red-600 mt-1">{errors.totalValue}</p>
                    )}
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                        YTD Return (%)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="ytdReturnPercentage"
                        value={values.ytdReturnPercentage}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.ytdReturnPercentage && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.ytdReturnPercentage}
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
                            ? "Update Fund"
                            : "Create Fund"}
                </button>
            </div>
        </form>
    );
}

export default FundForm;
