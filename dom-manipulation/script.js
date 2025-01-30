// Load quotes from localStorage or use default quotes
const storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" },
    { text: "Do what you can, with what you have, where you are.", category: "Action" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" }
];

// Select necessary DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const categoryFilter = document.getElementById("categoryFilter");

//  Function to save quotes to localStorage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(storedQuotes));
}

//  Populate categories dynamically
function populateCategories() {
    // Extract unique categories
    const uniqueCategories = [...new Set(storedQuotes.map(q => q.category))];

    // Clear and update the dropdown menu
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
    uniqueCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected category
    const lastSelectedCategory = localStorage.getItem("selectedCategory");
    if (lastSelectedCategory) {
        categoryFilter.value = lastSelectedCategory;
    }
}

//  Function to filter and display quotes
function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem("selectedCategory", selectedCategory); // Save filter selection

    quoteDisplay.innerHTML = ""; // Clear current quotes

    const filteredQuotes = selectedCategory === "all" 
        ? storedQuotes 
        : storedQuotes.filter(q => q.category === selectedCategory);

    filteredQuotes.forEach(q => {
        const quoteText = document.createElement("p");
        quoteText.textContent = `"${q.text}" - ${q.category}`;
        quoteDisplay.appendChild(quoteText);
    });
}

//  Function to add a new quote
function createAddQuoteForm() {
    const quote = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (quote === "" || category === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    storedQuotes.push({ text: quote, category: category }); // Add new quote
    saveQuotes(); // Save to localStorage

    newQuoteText.value = "";
    newQuoteCategory.value = "";

    populateCategories(); // Refresh categories
    filterQuotes(); // Refresh displayed quotes
}

//  Event listener for "Show New Quote" button
newQuoteButton.addEventListener("click", () => {
    categoryFilter.value = "all"; // Reset filter
    filterQuotes();
});

//  Initialize the page
populateCategories();
filterQuotes();
