const BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "https://fund-management-3me1.onrender.com/api";

async function handleResponse(res) {
    if (!res.ok) {
        let errorBody = null;
        try {
            errorBody = await res.json();
        } catch (e) {

        }

        const message =
            (errorBody && errorBody.message) ||
            `Request failed with status ${res.status} ${res.statusText}`;

        throw new Error(message);
    }

    if (res.status === 204) {
        return undefined;
    }

    return res.json();
}

export async function fetchFunds() {
    const res = await fetch(`${BASE_URL}/funds`);
    return handleResponse(res);
}

export async function fetchFund(id) {
    const res = await fetch(`${BASE_URL}/funds/${encodeURIComponent(id)}`);
    return handleResponse(res);
}

export async function createFund(payload) {
    const res = await fetch(`${BASE_URL}/funds`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    return handleResponse(res);
}

export async function updateFund(id, payload) {
    const res = await fetch(`${BASE_URL}/funds/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    return handleResponse(res);
}

export async function deleteFund(id) {
    const res = await fetch(`${BASE_URL}/funds/${encodeURIComponent(id)}`, {
        method: "DELETE",
    });

    await handleResponse(res);
}