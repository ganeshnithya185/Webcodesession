

function createHTMLElement(tag, attributes, content) {
  const element = document.createElement(tag);
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  if (content) {
    element.textContent = content;
  }
  return element;
}

function processAPIResponse(data, searchName) {
  const resultsElement = document.getElementById('results');
  resultsElement.innerHTML = '';

  if (data && data.country && data.country.length > 0) {
    const topCountries = data.country.slice(0, 2);

    topCountries.forEach((country) => {
      const { country_id, probability } = country;
      const countryElement = createHTMLElement('div', {}, `${country_id} (${probability.toFixed(2)})`);
      resultsElement.appendChild(countryElement);
    });

    
    highlightText(resultsElement, searchName);
  } else {
    const noDataElement = createHTMLElement('div', { class: 'no-data' }, 'No nationality data found.');
    resultsElement.appendChild(noDataElement);
  }
}

// Function to fetch data from the Nationalize API
async function fetchAPI(name) {
  const url = `https://api.nationalize.io/?name=${encodeURIComponent(name)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Function to handle search button click
async function search() {
  const nameInput = document.getElementById('nameInput');
  const name = nameInput.value.trim();

  if (name !== '') {
    try {
      const data = await fetchAPI(name);
      processAPIResponse(data, name);
    } catch (error) {
      console.error(error);
      
    }
  }
}

// Attach event listener to the search button
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', search);

const Element = document.getElementById("element");
const paragraph = document.createElement("p");
let names = "";
names +="Name: Micheal<br>"
names +="Name: Mathew<br>"
names+="Name: Jane<br>"
paragraph.innerHTML=names;
Element.appendChild(paragraph);


