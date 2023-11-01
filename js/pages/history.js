import { fetchPrice } from "../../utils/fetchPrice.js";
import { getColor } from "../../utils/getColor.js";
import { title } from "../components/title.js";

const app = document.getElementById("app");

// set start html
app.innerHTML = `
    ${title("Historie")}

    <div
    class="px-[30px] py-3"
    >
        <input 
        type="date" 
        name="" 
        id="date"
        class="bg-black text-white p-2 rounded-md w-full"
        >
    </div>
    <div
    class="flex flex-col gap-2 px-[30px] py-3"
    id="prices"
    >
        <p
        class="text-center font-medium text-green"
        >
            Vælg en dato
        </p>
    </div>
`

// after start html is inserted get html elements needed
const pricesElement = document.getElementById("prices")
const datePicker = document.getElementById("date")

const fetchData = async (date) => {

    // set loading state
    pricesElement.innerHTML = `
        <p
        class="text-center font-medium text-green"
        >
            Loading...
        </p>
    `
    

    const choosenDate = new Date(date)
    console.log(choosenDate);
    //check if choosen date is in the furtue
    if(choosenDate.getTime() > new Date().getTime()){
        pricesElement.innerHTML = `
            <p
            class="text-center font-medium text-red"
            >
                Can't read the future🔮🧙‍♂️
            </p>
        `
        return 
    }

    const data = await fetchPrice(choosenDate, "DK1")

    if(!data){
        pricesElement.innerHTML = `
        <p
        class="text-center font-medium text-red"
        >
            Could not get the data
        </p>
        `
        return
    }

    // clear loading state
    pricesElement.innerHTML = ""

    // insert all prices
    data.map(price => {
        const {moms} = JSON.parse(localStorage.getItem("settings"))

        pricesElement.innerHTML += `
        <li
        class="bg-black px-[20px] py-2 rounded flex justify-between"
        >
            <span>
                kl ${new Date(price.time_start).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit"
                })}
            </span>
            <span
            class="text-${getColor(price.DKK_per_kWh)}"
            >
                ${moms ? parseFloat(price.DKK_per_kWh * 1.25).toFixed(3)  : price.DKK_per_kWh.toFixed(3)} kr
            </span>
        </li>
    `
    })
}

datePicker.addEventListener("change", async (e) => {
    
    fetchData(e.target.value)

})

addEventListener("storage", (event) => {
    fetchData(datePicker.value)
});