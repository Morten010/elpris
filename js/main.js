import { checkNavLink } from "../utils/checkNavLink.js";

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
if(window.innerWidth > 900){
    console.log("more than 700");
    window.location.href = "/pages/dashboard.html"
}
addEventListener("resize", () => {
    console.log("Window Resized");
    if(window.innerWidth > 900){
        console.log("more than 700");
        window.location.href = "/pages/dashboard.html"
    }
});

const nav = document.querySelector("nav")
console.log(nav);
const footer = document.querySelector("footer")
const setting = document.getElementById("setting")
const modal = document.getElementById("modal")

// Check if local storafe exist
// if not then create
const settings = localStorage.getItem("settings");
console.log(JSON.parse(settings));
if(!settings){
    const defaultSettings =  {
        region: "DK1",
        moms: false,
        notification: false,
    }
    localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// insert settings
setting.innerHTML = `
    <div
    class="flex justify-end mx-[30px] pt-3 text-2xl cursor-pointer"
    id="setting"
    >
        <i class="fa-solid fa-gear"></i>
    </div>
`

// insert nav
nav.innerHTML = `
<!-- logo -->
<img 
src="/assets/nav-logo.svg" 
alt="El Prisen logo"
width="35px"
>
<!-- list -->
<ul
class="font-medium uppercase flex gap-2"
>
    <li>
        <a 
        href="/index.html"
        class="hover:text-green ${checkNavLink("index") ? "text-green" : ""}"
        >
            Oversigt
        </a>
    </li>
    <li>
        <a 
        href="/pages/now.html"
        class="hover:text-green ${checkNavLink("now") ? "text-green" : ""}"
        >
            Lige nu
        </a>
    </li>
    <li>
        <a 
        href="/pages/history.html"
        class="hover:text-green ${checkNavLink("history") ? "text-green" : ""}"
        >
            Historik
        </a>
    </li>
</ul>
`
// get settings
const userSettings = JSON.parse(localStorage.getItem("settings"))
console.log(userSettings.region === "DK1");
console.log(userSettings.region);

// insert footer

footer.innerHTML = `
    alle priser er <span class="text-green">${userSettings.moms ? "inkl." : "eksl."} moms</span> og afgifter. 

    Du vises lige nu priserne for region <span class="text-green">${userSettings.region === "DK1" ? "vest danmark" : "øst danmark"}</span>
`



// insert modal for settings
modal.innerHTML = `
    <h2
    class="text-3xl text-center"
    >
        Indstillinger
    </h2>
    
    <div
    class="flex gap-2 items-center justify-between my-3" 
    >
        <h3
        class="text-xl"
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
        class="text-xl"
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
    class="flex gap-2 items-center justify-between my-3 67"
    >
        <h3
        class="text-xl"
        >
            Vælg region
        </h3>
        <select 
        name="region" 
        id="region"
        class="bg-black p-2 rounded-md"
        >
            <option value="" disabled selected>Ændre din region</option>
            <option value="DK1">Vest for Storebælt</option>
            <option value="DK2">Øst for Storebælt</option>
        </select>
    </div>
`

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
notificationElement.addEventListener("click", (e) => {
    const oldSettings = JSON.parse(localStorage.getItem("settings"))
    const newSettings = {
        ...oldSettings,
        notification: e.target.checked
    }
    localStorage.setItem("settings", JSON.stringify(newSettings))
    window.dispatchEvent( new Event('storage') )
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
    
    if(modal.style.display !== "block"){
        modal.style.display = "block"
        app.style.display = "none"
    }else{
        modal.style.display = "none"
        app.style.display = "block"
    }
})

addEventListener("storage", (event) => {
    console.log("Storage changes");
    const newSettings = JSON.parse(localStorage.getItem("settings"));
    footer.innerHTML = `
        alle priser er <span class="text-green">${newSettings.moms ? "inkl." : "eksl."} moms</span> og afgifter. 

        Du vises lige nu priserne for region <span class="text-green">${newSettings.region === "DK1" ? "vest danmark" : "øst danmark"}</span>
    `
});