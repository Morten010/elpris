import { fetchPrice } from "../utils/fetchPrice.js";
import { loadingBigClock } from "./components/loadingBigClock.js";
import { priceCard } from "./components/priceCard.js";
import { smallClocks } from "./components/smallClocks.js";
import { spinner } from "./components/spinner.js";
import { title } from "./components/title.js";

const nav = document.querySelector("nav")
console.log(nav);


// make sure sw are supported
if("serviceWorker" in navigator){
    window.addEventListener("load", () => {
        // register service worker
        navigator.serviceWorker
            .register("../sw.js")
            .then(reg => console.log("Service Worker: Registered", reg))
            .catch(err => console.log(`Service Worker: Error: ${err}`))
    })
}

//check window size and redirect
if(window.innerWidth < 900){
    console.log("more than 700");
    window.location.href = "/index.html"
}
addEventListener("resize", () => {
    console.log("Window Resized");
    if(window.innerWidth < 900){
        console.log("more than 700");
        window.location.href = "/index.html"
    }
})

// insert nav
nav.innerHTML = `
    <!-- logo -->
    <img 
    src="/assets/nav-logo.svg" 
    alt="El Prisen logo"
    width="35px"
    >
    <!-- settings -->
    <div
    id="setting"
    >
    </div>

`

const setting = document.getElementById("setting")

// insert settings
setting.innerHTML = `
    <div
    class="flex justify-end mx-[30px] pt-3 text-2xl cursor-pointer"
    id="setting"
    >
        <i class="fa-solid fa-gear"></i>
    </div>
`

// get settings
const userSettings = JSON.parse(localStorage.getItem("settings"))

// insert modal for settings
modal.innerHTML = `
    <div
    class="bg-lightBlack p-3 py-14 w-[717px] mx-auto rounded-md shadow-lg h-[531px] relative"
    >
        <i class="fa-regular fa-circle-xmark absolute top-5 right-5 text-3xl text-green" id="close"></i>
        <h2
        class="text-3xl text-center"
        >
            Indstillinger
        </h2>
        
        <div
        class="max-w-[300px] mx-auto flex flex-col gap-1 mt-5"
        >
            <div
            class="flex gap-2 items-center justify-between my-3" 
            >
                <h3
                class="text-md"
                >
                    priser inkl. moms
                </h3>
                <label class="relative inline-flex items-center mr-5 cursor-pointer">
                    <input 
                    type="checkbox" 
                    value="" 
                    class="sr-only peer" 
                    id="moms"
                    ${userSettings.moms ? "checked" : ""}
                    >
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green/70 dark:peer-focus:ring-green/70 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green/70"></div>
                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 sr-only">priser inkl. moms</span>
                </label>
            </div>
            <div
            class="flex gap-2 items-center justify-between my-3" 
            >
                <h3
                class="text-md"
                >
                    laveste pris alarm
                </h3>
                <label class="relative inline-flex items-center mr-5 cursor-pointer">
                    <input 
                    type="checkbox" 
                    value="" 
                    class="sr-only peer" 
                    id="notification"
                    ${userSettings.notification ? "checked" : ""}
                    >
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green/70 dark:peer-focus:ring-green/70 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green/70"></div>
                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 sr-only">priser inkl. moms</span>
                </label>
            </div>
            <div
            class="flex gap-2 items-center justify-between my-3" 
            >
                <h3
                class="text-md"
                >
                    vælg region
                </h3>
                <select 
                name="region" 
                id="region"
                class="bg-black p-2 rounded-md"
                >
                    <option value="DK1">Vest for Storebælt</option>
                    <option value="DK2">Øst for Storebælt</option>
                </select>
            </div>
        </div>
    </div>
`

const closeButton = document.getElementById("close")

//add event listener to modal close button
closeButton.addEventListener("click", (e) => {
    e.stopPropagation()

    if(modal.style.display !== "flex"){
        modal.style.display = "flex"
    }else{
        modal.style.display = "none"
    }
})

// settings event listeners
const momsElement = document.getElementById("moms")
const notificationElement = document.getElementById("notification")
const regionElement = document.getElementById("region")
// for moms
momsElement.addEventListener("click", (e) => {
    
    const oldSettings = JSON.parse(localStorage.getItem("settings"))
    const newSettings = {
        ...oldSettings,
        moms: e.target.checked
    }
    localStorage.setItem("settings", JSON.stringify(newSettings))
    window.dispatchEvent( new Event('storage') )
})
// for notifications
notificationElement.addEventListener("click", async (e) => {
    const oldSettings = JSON.parse(localStorage.getItem("settings"))
    const newSettings = {
        ...oldSettings,
        notification: e.target.checked
    }
    
    //ask for notification permission
    Notification.requestPermission().then(perm => {
        console.log(perm);
        // if Permission denied set check back to false and 
        // set notification to false in localStorage
        if(perm === "denied"){
            notificationElement.checked = false
            localStorage.setItem("settings", JSON.stringify({
                ...oldSettings,
                notification: false
            }))
        }else if(perm === "granted"){
            // if permission granted switch localstorage notification to
            // opposite
            localStorage.setItem("settings", JSON.stringify(newSettings))
            window.dispatchEvent( new Event('storage') )
            console.log(e.target.checked);
            if(e.target.checked === true){
                new Notification("Notifikationer slået til", {
                    body: "Du vil nu modtage notifikationer når elpriserne er lavest på dagen.",
                    icon: "/assets/images/icons/icon-72x72.png",
                    tag: "notifications turned on msg"
                })
            }
        }else{
            notificationElement.checked = false
            notificationElement.checked = false
            localStorage.setItem("settings", JSON.stringify({
                ...oldSettings,
                notification: false
            }))
        }
    })
    
})
// for region
console.log(regionElement);
regionElement.addEventListener("change", (e) => {
    console.log("Ran change");
    
    const oldSettings = JSON.parse(localStorage.getItem("settings"))
    const newSettings = {
        ...oldSettings,
        region: e.target.value
    }
    console.log(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings))
    window.dispatchEvent( new Event('storage') )
})

// event listener for setting
setting.addEventListener("click", () => {
    console.log(modal.style.display)
    
    if(modal.style.display !== "flex"){
        modal.style.display = "flex"
    }else{
        modal.style.display = "none"
    }
})

const now = document.getElementById("now")
const overview = document.getElementById("overview")
const history = document.getElementById("history")

//insert start html for now
now.innerHTML = `
    ${title("Elprisen lige nu")}

    ${loadingBigClock()}

    ${smallClocks()}

    <p id="info"></p>
`
//insert start html for overview
overview.innerHTML= `
    ${title("Oversigt")}

    <ul
    class="flex flex-col gap-3 px-[30px] py-4"
    id="prices"
    >
        ${spinner()}
    </ul>
`

//insert start html for history
history.innerHTML= `
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
    id="history-prices"
    >
        <p
        class="text-center font-medium text-green"
        >
            Vælg en dato
        </p>
    </div>
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

const h = document.getElementById("highest")
const l = document.getElementById("lowest")

const placeSmallClocks = (prices) => {
    const max = Math.max(...prices.map(item => item.DKK_per_kWh)).toFixed(3)
    const min = Math.min(...prices.map(item => item.DKK_per_kWh)).toFixed(3)
    console.log(max, min);
    
    h.innerHTML = max
    l.innerHTML = min
}

const historyPrices = document.getElementById("history-prices") 
const date = document.getElementById("date") 

// handle choosen date for history
date.addEventListener("change", async (e) => {
    console.log(e.target.value);
    const chosenDatePrices = await fetchPrice(e.target.value)
    console.log(chosenDatePrices);

    // clear html
    historyPrices.innerHTML = ""

    // insert prices
    chosenDatePrices.map(p => {
        historyPrices.innerHTML += `
            ${priceCard(p)}
        `
    })
})

const info = document.getElementById("info")
const overviewPrices = document.getElementById("prices") 
const start = async () => {
    // fetchData
    let data = await fetchPrice(Date.now())
    const settings = JSON.parse(localStorage.getItem("settings"))

    // update info
    info.innerHTML = `
    <p
    class="mt-3 uppercase"
    >
        alle priser er <span class="text-green">${settings.moms ? "inkl." : "eksl."} moms</span> og afgifter. 

        Du vises lige nu priserne for region <span class="text-green">${settings.region === "DK1" ? "vest danmark" : "øst danmark"}</span>
    </p>
    `
    //place power prices now
    placeClock(data)
    placeSmallClocks(data)

    //clear overview 
    overviewPrices.innerHTML = ``
    //places overview
    data.forEach(price => {
        overviewPrices.innerHTML += `
            ${priceCard(price)}
        `
    })

    // clear history
    historyPrices.innerHTML = `
        <p
        class="text-center font-medium text-green"
        >
            Vælg en dato
        </p>
    `
}

start()

//if settings change refresh data
addEventListener("storage", (event) => {
    start()
});