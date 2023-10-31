
export const loadingBigClock = () => {
    return `
        <div
        class="bg-black w-full max-w-[275px] aspect-square mx-auto mt-10 rounded-full p-3"
        >
            <div
            class="bg-black border border-dashed border-2 border-green aspect-square mx-auto  rounded-full w-full p-3"
            >
                <div
                class="bg-black border border-dashed border-2 border-green aspect-square mx-auto  rounded-full w-full p-3 grid place-content-center text-center font-medium"
                id="clock"
                >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                class="animate-spin text-green"            
                >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                </div>
            </div>
        </div>

        <p
        class="text-center mt-3 text-lg text-green"
        id="time"
        >
            loading...
        </p>
    `
}