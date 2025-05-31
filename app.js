// Get reference to the brand dropdown element from HTML
let brandDropdown = document.getElementById("brandDropdown");

// Populate the brand dropdown with options from the mobiles object
for (let i = 0; i < Object.keys(mobiles).length; i++) {
    let option = document.createElement("option");
    option.value = Object.keys(mobiles)[i];    // Set option value to brand name
    option.text = Object.keys(mobiles)[i];     // Set visible text to brand name
    brandDropdown.appendChild(option);          // Add option to dropdown
}

// Function to display models when a brand is selected
function showModels() {
    // Clear previous model dropdown content
    modelDropdownDiv.innerHTML = "";
    let selectedBrand = brandDropdown.value;
    
    // Create new dropdown for models
    let modelDropdown = document.createElement("select");
    // Add default "Select Model" option
    let modelDefault = document.createElement("option");
    modelDefault.text = "Select Model";
    modelDefault.value = "";
    modelDropdown.appendChild(modelDefault);
    let div = document.getElementById("modelDropdownDiv");
    
    div.appendChild(modelDropdown);
    
    // Populate model dropdown with options based on selected brand
    for (let i = 0; i < Object.keys(mobiles[selectedBrand]).length; i++) {
        let option = document.createElement("option");
        option.value = Object.keys(mobiles[selectedBrand])[i];
        option.text = Object.keys(mobiles[selectedBrand])[i];
        modelDropdown.appendChild(option);
    };

    // Create and add Select button
    button = document.createElement("button");
    button.innerText = "Select";
    modelDropdownDiv.appendChild(button);

    // Add click event listener to the Select button
    button.addEventListener("click", function() {
        let selectedModel = modelDropdown.value;
        if (selectedModel) {
            // Clear previous model details
            let modelDetailsdiv = document.getElementById("modelDetails");
            modelDetailsdiv.innerHTML = "";

            // Get model specifications
            let modelDetailsValue = Object.values(mobiles[selectedBrand][selectedModel]);
            let modelDetailsValueKeys = Object.keys(mobiles[selectedBrand][selectedModel]);

            // Display each specification
            for (let i = 0; i < modelDetailsValueKeys.length ; i++) {
                let p = document.createElement("p");
                p.innerHTML = '<b>' + modelDetailsValueKeys[i] + ':</b> ';
                
                // Check if the specification is a nested object
                if (typeof modelDetailsValue[i] === 'object' && modelDetailsValue[i] !== null && !Array.isArray(modelDetailsValue[i])) {
                    
                    // Handle nested object (e.g., camera specifications)
                    let insidekey = Object.keys(modelDetailsValue[i]);
                    let insidevalue = Object.values(modelDetailsValue[i]);
                    let ul = document.createElement("ul");
                    ul.style.marginLeft = "20px"; 
                    ul.className = 'specs-list';

                    // Create list items for each nested specification
                    for (let j = 0; j < insidekey.length; j++) {
                        let li = document.createElement("li");
                        
                        // Handle doubly nested objects (e.g., camera details)
                        if (typeof insidevalue[j] === 'object' && insidevalue[j] !== null && !Array.isArray(insidevalue[j])) {
                            li.innerHTML = '<b>' + insidekey[j] + ':</b> ';
                            let nestedUl = document.createElement("ul");
                            nestedUl.style.marginLeft = "20px"; 
                            let nestedKeys = Object.keys(insidevalue[j]);
                            let nestedValues = Object.values(insidevalue[j]);

                            // Create list items for doubly nested specifications
                            for (let k = 0; k < nestedKeys.length; k++) {
                                let nestedLi = document.createElement("li");
                                nestedLi.innerHTML = '<b>' + nestedKeys[k] + ':</b> ' + nestedValues[k];
                                nestedUl.appendChild(nestedLi);
                            }
                            li.appendChild(nestedUl);
                        } else {
                            // Handle single level nested specifications
                            li.innerHTML = '<b>' + insidekey[j] + ':</b> ' + insidevalue[j];
                        }
                        ul.appendChild(li);
                    }
                    p.appendChild(ul);
                    modelDetailsdiv.appendChild(p);

                } else {
                    // Handle non-nested specifications (e.g., price, color)
                    p.innerHTML += modelDetailsValue[i];
                    modelDetailsdiv.appendChild(p);
                }
            }
        }
    });

    // Add classes to elements
    modelDropdown.className = 'model-dropdown';
    button.className = 'select-button';
}

