export const fetchPrice = async (date) => {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    const month = newDate.toLocaleDateString(undefined, {
        month: "2-digit",
    }).replace(".", "")
    const day = newDate.toLocaleDateString(undefined, {
        day: "2-digit",
    }).replace(".", "")
    const {region} = JSON.parse(localStorage.getItem("settings"));

    // create fetch url
    const url = `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${region}.json`
    console.log(url);

    // try and fetch data
    try{
        const res = await fetch(url)
        const data = await res.json()
        
        // send back data
        return data
    } catch(err){
        console.log(err);
        return null
    }
}