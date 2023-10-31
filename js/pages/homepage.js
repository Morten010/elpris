import { fetchPrice } from "../../utils/fetchPrice.js";
import { getColor } from "../../utils/getColor.js";
import { priceCard } from "../components/priceCard.js";
import { smallClocks } from "../components/smallClocks.js";
import { title } from "../components/title.js";

const app = document.getElementById("app");

// set start html
app.innerHTML = `
    ${title("Oversigt")}
    
    ${smallClocks()}
`

const start = async () => {
    const {moms} = JSON.parse(localStorage.getItem("settings"))
    const data = await fetchPrice(Date.now());

    const sortedPrice = data.sort((a, b) => { return a.DKK_per_kWh - b.DKK_per_kWh })
    const sortedTime = data.sort((a, b) => { 
        return new Date(a.time_start).getTime() - new Date(b.time_start).getTime()
    })


    const max = Math.max(...sortedPrice.map(item => item.DKK_per_kWh)).toFixed(3)
    const min = Math.min(...sortedPrice.map(item => item.DKK_per_kWh)).toFixed(3)
    const html = `
        ${title("Oversigt")}

        <div
        class="grid grid-cols-2 gap-3 mt-3 mx-[30px]"
        >
            <div>
                <div class="bg-black rounded-full border-2 border-dashed aspect-square border-green max-w-[200px] mx-auto grid place-content-center text-center">
                    <h2
                    class="text-2xl"
                    >
                        ${moms ? parseFloat(min * 1.25).toFixed(3) : min} kr
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
                <div class="bg-black rounded-full border-2 border-dashed aspect-square border-green max-w-[200px] mx-auto place-content-center grid place-content-center text-center">
                    <h2
                    class="text-2xl"
                    >       
                        ${moms ? parseFloat(max * 1.25).toFixed(3) : max} kr
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
        <ul
        class="flex flex-col gap-3 px-[30px] py-4"
        id="prices"
        >
            
        </ul>
    `
    
    app.innerHTML = html

    const priceElement = document.getElementById("prices")

    sortedTime.map(price => {
        priceElement.innerHTML += `
            ${priceCard(price)}
        `
    })
}

start()

addEventListener("storage", (event) => {
    start()
});