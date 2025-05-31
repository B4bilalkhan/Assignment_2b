let brandDropdown = document.getElementById("brandDropdown");

for (let i = 0; i < Object.keys(mobiles).length; i++) {
    let option = document.createElement("option");
    option.value = Object.keys(mobiles)[i];
    option.text = Object.keys(mobiles)[i];
    brandDropdown.appendChild(option);
}

function showModels() {
    modelDropdownDiv.innerHTML = "";
    let selectedBrand = brandDropdown.value;
    
    let modelDropdown = document.createElement("select");
    let modelDefault = document.createElement("option");
    modelDefault.text = "Select Model";
    modelDefault.value = "";
    modelDropdown.appendChild(modelDefault);
    let div = document.getElementById("modelDropdownDiv");
    
    div.appendChild(modelDropdown);
    
    for (let i = 0; i < Object.keys(mobiles[selectedBrand]).length; i++) {
        let option = document.createElement("option");
        option.value = Object.keys(mobiles[selectedBrand])[i];
        option.text = Object.keys(mobiles[selectedBrand])[i];
        modelDropdown.appendChild(option);
    };

    button = document.createElement("button");
    button.innerText = "Select";
    modelDropdownDiv.appendChild(button);

    button.addEventListener("click", function() {
        let selectedModel = modelDropdown.value;
        if (selectedModel) {
            let modelDetailsdiv = document.getElementById("modelDetails");
            modelDetailsdiv.innerHTML = "";

            let modelDetailsValue = Object.values(mobiles[selectedBrand][selectedModel]);
            let modelDetailsValueKeys = Object.keys(mobiles[selectedBrand][selectedModel]);

            for (let i = 0; i < modelDetailsValueKeys.length ; i++) {
                let p = document.createElement("p");
                p.innerHTML = '<b>' + modelDetailsValueKeys[i] + ':</b> ';
                
                if (typeof modelDetailsValue[i] === 'object' && modelDetailsValue[i] !== null && !Array.isArray(modelDetailsValue[i])) {
                    let insidekey = Object.keys(modelDetailsValue[i]);
                    let insidevalue = Object.values(modelDetailsValue[i]);
                    let ul = document.createElement("ul");
                    ul.style.marginLeft = "20px"; 
                    ul.className = 'specs-list';

                    for (let j = 0; j < insidekey.length; j++) {
                        let li = document.createElement("li");
                        if (typeof insidevalue[j] === 'object' && insidevalue[j] !== null && !Array.isArray(insidevalue[j])) {
                            li.innerHTML = '<b>' + insidekey[j] + ':</b> ';
                            let nestedUl = document.createElement("ul");
                            nestedUl.style.marginLeft = "20px"; 
                            let nestedKeys = Object.keys(insidevalue[j]);
                            let nestedValues = Object.values(insidevalue[j]);

                            for (let k = 0; k < nestedKeys.length; k++) {
                                let nestedLi = document.createElement("li");
                                nestedLi.innerHTML = '<b>' + nestedKeys[k] + ':</b> ' + nestedValues[k];
                                nestedUl.appendChild(nestedLi);
                            }
                            li.appendChild(nestedUl);
                        } else {
                            li.innerHTML = '<b>' + insidekey[j] + ':</b> ' + insidevalue[j];
                        }
                        ul.appendChild(li);
                    }
                    p.appendChild(ul);
                    modelDetailsdiv.appendChild(p);

                } else {
                    p.innerHTML += modelDetailsValue[i];
                    modelDetailsdiv.appendChild(p);
                }
            }
        }
    });

    modelDropdown.className = 'model-dropdown';
    button.className = 'select-button';
}
