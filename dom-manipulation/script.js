

const quotes = JSON.parse(localStorage.getItem("quotes")) || [ 
    {text:"The quick brown fox", category:"motivation"},
    {text:"Jumps over the lazy dog", category:"inspiration"},
    {text:"Positive attracts positive", category:"action"},
    {text:"stop worrying and work", category:"workout"}
];

function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset dropdown

    // Load categories from local storage (if available)
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const categories = storedCategories.length > 0 ? storedCategories : [...new Set(quotes.map(quote => quote.category.toLowerCase()))];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize first letter
        categoryFilter.appendChild(option);
    });
}

// Function to export quotes as JSON file
function exportQuotesAsJSON() {
    // Create a Blob object from the quotes array, formatted as JSON
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });

    // Create a temporary download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // Set the filename of the downloaded file
    link.download = 'quotes.json'; // The name of the exported file

    // Trigger a click event to download the file
    link.click();
}

// Function to import quotes from a JSON file with duplicate checker
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        // Remove duplicates
        const uniqueQuotes = importedQuotes.filter(importedQuote => 
            !quotes.some(existingQuote => existingQuote.text === importedQuote.text)
        );

        if (uniqueQuotes.length > 0) {
            quotes.push(...uniqueQuotes);
            saveQuotesToLocalStorage();
            alert(`${uniqueQuotes.length} new quotes imported successfully!`);
        } else {
            alert('No new quotes to import (duplicates found).');
        }
    };
    fileReader.readAsText(event.target.files[0]);

    populateCategories();
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value.toLowerCase();

    // Save the selected category to local storage
    localStorage.setItem("lastSelectedCategory", selectedCategory);

    const filteredQuotes = selectedCategory === "all" 
        ? quotes 
        : quotes.filter(quote => quote.category.toLowerCase() === selectedCategory);

    displayFilteredQuotes(filteredQuotes);
}

// Function to display the filtered quotes
function displayFilteredQuotes(quotesToShow) {
    const display = document.getElementById("quoteDisplay");

    if (quotesToShow.length === 0) {
        display.innerHTML = "<p>No quotes available for this category.</p>";
        return;
    }

    display.innerHTML = quotesToShow
        .map(quote => `<strong>${quote.text}</strong> <br><em>${quote.category}</em>`)
        .join("<hr>"); // Separates quotes with a horizontal line
}

// Function to restore the last selected category from local storage
function restoreLastSelectedCategory() {
    const savedCategory = localStorage.getItem("lastSelectedCategory");
    if (savedCategory) {
        const categoryFilter = document.getElementById("categoryFilter");
        categoryFilter.value = savedCategory; // Restore the dropdown selection
        filterQuotes(); // Apply filtering on page load
    }
}

const display = document.getElementById("quoteDisplay");
const showBtn = document.getElementById("showQuote");
const newQuoteInput = document.getElementById("newQuoteText");
const newCatInput = document.getElementById("newQuoteCategory");
const exportBtn = document.getElementById("exportQuotesBtn");

function saveQuotesToLocalStorage() {
    localStorage.setItem("quotes", JSON.stringify(quotes));

    // Update categories in local storage after adding new quotes
    const categories = [...new Set(quotes.map(quote => quote.category.toLowerCase()))];
    localStorage.setItem("categories", JSON.stringify(categories));
}

// Load the last viewed quote from session storage if available
const lastViewedQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
if (lastViewedQuote && display) {
    display.innerHTML = `<strong>${lastViewedQuote.text}</strong> <br><em>${lastViewedQuote.category}</em>`;
}

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Save the last viewed quote in session storage
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));

    display.innerHTML = `<strong>${randomQuote.text}</strong> <br><em>${randomQuote.category}</em>`;
}

function createAddQuoteForm() {
    const newQuote = newQuoteInput.value.trim();
    const newCat = newCatInput.value.trim();

    if (newQuote === "" || newCat === "") {
        alert("Please enter quote and category");
        return;
    }

    quotes.push({ text: newQuote, category: newCat });
    saveQuotesToLocalStorage();

    // Save the newly added quote in session storage (so it appears after refresh)
    sessionStorage.setItem("lastViewedQuote", JSON.stringify({ text: newQuote, category: newCat }));

    newQuoteInput.value = "";
    newCatInput.value = "";

    display.innerHTML = `<strong>${newQuote}</strong><br><em>${newCat}</em>`;
    populateCategories();
}

showBtn.addEventListener("click", showRandomQuote);
exportBtn.addEventListener("click", exportQuotesAsJSON);

// Call this function on page load to populate the dropdown
populateCategories();

// Attach filterQuotes function to category dropdown change event to save selection and filter quotes
document.getElementById("categoryFilter").addEventListener("change", filterQuotes);

// Call on page load to restore the last selected filter
restoreLastSelectedCategory();
