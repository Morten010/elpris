import { fetchPrice } from "../../utils/fetchPrice.js";
import { loadingBigClock } from "../components/loadingBigClock.js";
import { smallClocks } from "../components/smallClocks.js";
import { title } from "../components/title.js";

const app = document.getElementById("app")

//set start html
app.innerHTML = `

    ${title("Elprisen lige nu")}

    ${loadingBigClock()}

`


const placeClock = (prices) => {
    const {moms} = JSON.parse(localStorage.getItem("settings"))
    const element = document.getElementById("clock")
    const time = document.getElementById("time")

    if(prices === null){

        // create html
        const html = `
        <h2
        class="text-3xl"
        >
            Could not get data
        </h2>
        `

        //  place html
        element.innerHTML = html
        time.innerHTML= ""
        return
    }

    prices.map(price => {
        const time_start = new Date(price.time_start).getHours()
        const time_end = new Date(price.time_end).getHours()
        
        if(new Date(Date.now()).getHours() === time_start){
            // create html
            const html = `
                <h2
                class="text-3xl"
                >
                    ${moms ? parseFloat(prices[0].DKK_per_kWh * 1.25).toFixed(3) : prices[0].DKK_per_kWh.toFixed(3)} KR
                </h2>
                <p
                class="text-xl"
                >
                    PR. KWH
                </p>
            `

            const formattedStart = new Date(price.time_start).toLocaleTimeString(undefined, {
                hour: "2-digit", 
                minute: "2-digit"
            }).replace(".", ":")
            const formattedEnd = new Date(price.time_end).toLocaleTimeString(undefined, {
                hour: "2-digit", 
                minute: "2-digit"
            }).replace(".", ":")


            // place html
            element.innerHTML = html
            time.innerText = `${formattedStart} - ${ formattedEnd}`
            }

    })

}

//what to do when app is started
const start = async () => {
    //fetch data from today 
    const data = await fetchPrice(Date.now(), "DK1")
    
    //setup big clock
    placeClock(data)
}

start()

addEventListener("storage", (event) => {
    start()
});