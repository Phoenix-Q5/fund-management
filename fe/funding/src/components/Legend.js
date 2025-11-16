import React, { useState } from "react";

function Legend() {
    const [open, setOpen] = useState(false);

    return (
        <div className="mt-2 flex justify-end">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-400 text-[10px]">
          i
        </span>
                <span className="font-medium">Abbreviations</span>
            </button>

            {open && (
                <div className="absolute mt-8 right-4 w-64 bg-white border border-gray-200 rounded-md shadow-md text-xs p-3 z-10">
                    <p className="mb-1">
                        <span className="font-semibold">AUM</span> – Assets Under Management (total value of all assets in the fund).
                    </p>
                    <p>
                        <span className="font-semibold">YTD</span> – Year-to-Date return (performance of the fund from the start of the year until now).
                    </p>
                </div>
            )}
        </div>
    );
}

export default Legend;