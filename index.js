let inptsearch = document.getElementById("searchInput");
let search_results_container = document.getElementById("searchResults");

function createAndAppend(each_result) {
    console.log(each_result.title);
    console.log(each_result.description);
    console.log(each_result.link);
    let lineBreak = document.createElement('br');
    let result_item_container = document.createElement('div');
    result_item_container.classList.add("result-item");
    let anchor_result_title = document.createElement('a');
    anchor_result_title.classList.add('result-title');
    anchor_result_title.href = each_result.link;
    anchor_result_title.target = "_blank";
    anchor_result_title.textContent = each_result.title;
    result_item_container.appendChild(anchor_result_title);
    result_item_container.appendChild(lineBreak);
    let linkanchor = document.createElement('a');
    linkanchor.classList.add("result-url");
    linkanchor.href = each_result.link;
    linkanchor.target = "_blank";
    linkanchor.textContent = each_result.link;
    result_item_container.appendChild(linkanchor);
    // result_item_container.appendChild(lineBreak);
    let descriptionpara = document.createElement('p');
    descriptionpara.classList.add("link-description");
    descriptionpara.textContent = each_result.description;
    result_item_container.appendChild(descriptionpara);
    search_results_container.appendChild(result_item_container);
}

function display_dynamic(display_dynamic) {
    let spinner_div = document.getElementById("spinner");
    spinner_div.classList.toggle("d-none");
    for (let each_result of display_dynamic) {
        createAndAppend(each_result);
    }
}

function wikipediasearch(event) {
    if (event.key === "Enter") {
        let spinner_div = document.getElementById("spinner");
        spinner_div.classList.toggle("d-none");
        search_results_container.textContent = "";
        let inptsearchval = inptsearch.value;
        let options = {
            method: "Get"
        };
        let url = "https://apis.ccbp.in/wiki-search?search=" + inptsearchval;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                display_dynamic(search_results);
            });
    }
}
inptsearch.addEventListener('keydown', wikipediasearch);