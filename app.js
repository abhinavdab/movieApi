const form = document.querySelector("#searchform");
const myNode = document.querySelector("#search-results");
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log("submitted");
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
    }
    // allMovie.innerHTML = "";
    const searchterm = form.elements.query.value;
    const config = { params: { q: searchterm }, headers: {} }
    const response = await axios.get(`https://api.tvmaze.com/search/shows`, config)
    console.log(response.data[0])
    makeImages(response.data)
    console.log(response.data[0].show.image.medium);
    form.elements.query.value = "";


})

const makeImages = (shows) => {
    const el2 = document.createElement("div");
    el2.style.display = "flex";
    el2.style.flexWrap = "wrap";
    for (let result of shows) {
        const el = document.createElement("div");
        el.style.display = "inline";
        el.style.color = 'white';
        el.style.background = "grey";
        el.style.border = "grey";
        el.style.margin = "5px";
        el.style.display = "flex";
        el.style.flexDirection = "column"
        el.style.flexWrap = "wrap";
        // el.style.justifyContent = "center"
        el.style.textAlign = "center"
        if (result.show.image) {
            // document.body.innerHTML = "";
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            el.appendChild(img)
            if (result.show.name) {
                const para = document.createElement('HEADER');
                para.innerHTML = result.show.name;
                el.appendChild(para);
            };
            if (result.show.genres) {
                const para = document.createElement('HEADER');
                para.innerHTML = result.show.genres;
                el.appendChild(para);
            }
            if (result.show.rating) {
                const para = document.createElement('HEADER');
                para.innerHTML = result.show.rating.average;
                el.appendChild(para);
            }
            if (result.url) {
                const para = document.createElement('HEADER');
                para.innerHTML = result.url;
                el.appendChild(para);
            }
            el2.appendChild(el);
        }

    }
    myNode.appendChild(el2);
}