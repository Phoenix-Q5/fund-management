const BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:8081/api";

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

export async function fetchInvestmentsForFund(fundId) {
    const res = await fetch(
        `${BASE_URL}/funds/${encodeURIComponent(fundId)}/investments`
    );
    return handleResponse(res);
}

export async function fetchInvestment(investmentId) {
    const res = await fetch(
        `${BASE_URL}/investments/${encodeURIComponent(investmentId)}`
    );
    return handleResponse(res);
}

export async function createInvestment(fundId, payload) {
    const res = await fetch(
        `${BASE_URL}/funds/${encodeURIComponent(fundId)}/investments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    return handleResponse(res);
}

export async function updateInvestment(investmentId, payload) {
    const res = await fetch(
        `${BASE_URL}/investments/${encodeURIComponent(investmentId)}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    return handleResponse(res);
}

export async function deleteInvestment(investmentId) {
    const res = await fetch(
        `${BASE_URL}/investments/${encodeURIComponent(investmentId)}`,
        {
            method: "DELETE",
        }
    );

    await handleResponse(res);
}