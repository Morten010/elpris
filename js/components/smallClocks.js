export const smallClocks = () => {
    return `
        <div
        class="grid grid-cols-2 gap-3 mt-3 mx-[30px]"
        >
            <div>
                <div class="bg-black rounded-full border-2 border-dashed aspect-square border-green max-w-[150px] mx-auto grid place-content-center text-center">
                    <h2
                    class="text-2xl"
                    id="lowest"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        class="animate-spin text-green mx-auto"            
                        >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                    </h2>
                    <p>pr. kwh</p>
                </div>
                <p
                class="text-center mt-2"
                >
                    LAVESTE PRIS
                </p>
            </div>
            <div>
                <div class="bg-black rounded-full border-2 border-dashed aspect-square border-green max-w-[150px] mx-auto place-content-center grid place-content-center text-center">
                    <h2
                    class="text-2xl"
                    id="highest"
                    >       
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        class="animate-spin text-green mx-auto"            
                        >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                    </h2>
                    <p>pr. kwh</p>
                </div>
                <p
                class="text-center mt-2"
                >
                    HØJESTE PRIS
                </p>

            </div>
        </div>
    `
}