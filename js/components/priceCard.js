import { getColor } from "../../utils/getColor.js"

export const priceCard = (price) => {
    const {moms} = JSON.parse(localStorage.getItem("settings"))
    
    return `
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
                ${moms ? parseFloat(price.DKK_per_kWh.toFixed(3) * 1.25).toFixed(3) : price.DKK_per_kWh.toFixed(3)} kr
            </span>
        </li>
    `
}