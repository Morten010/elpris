import React from 'react'

export const footerHtml = (moms, region) => {
    return `
        alle priser er <span class="text-green">${moms ? "inkl." : "eksl."} moms</span> og afgifter. 

        Du vises lige nu priserne for region <span class="text-green">${region === "DK1" ? "vest danmark" : "øst danmark"}</span>
    `
}
