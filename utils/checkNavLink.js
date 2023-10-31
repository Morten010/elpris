// check if link is same as page
export const checkNavLink = (name) => {
    const filePath = window.location.pathname.split("/")
    const fileName = filePath[filePath.length - 1].replace(".html", "")
    console.log(fileName);

    //check if name given is window file is same
    if(fileName === name){ 
        return true
    }else {
        return false
    }
}