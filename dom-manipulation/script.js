/*// Quotes array
const quotes = [
    { text: "text.", category: "category" },
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
const notification = document.getElementById("notification");  // Notification element

// Function to display a random quote
function showRandomQuote() {
    // Clear current quote display
    quoteDisplay.innerHTML = "";

    // Pick a random quote using Math.random() to select a random index
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Create elements for the quote text and category
    const quoteText = document.createElement("p");
    quoteText.textContent = `"${randomQuote.text}"`;

    const quoteCategory = document.createElement("p");
    quoteCategory.textContent = `Category: ${randomQuote.category}`;

    // Append elements to the quote display div
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// Attach event listener to the "Show New Quote" button
newQuoteButton.addEventListener("click", showRandomQuote);

// Display a random quote on page load
showRandomQuote();

// Function to add a new quote dynamically
function createAddQuoteForm() {
    // Get input values and trim any extra whitespace
    const quote = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    // Validate that both fields are filled
    if (quote === "" || category === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    // Add the new quote to the quotes array
    quotes.push({ text: quote, category: category });

    // Clear input fields
    newQuoteText.value = "";
    newQuoteCategory.value = "";

    // Display a confirmation message or update the quote display
    alert("New quote added successfully!");

    // Optionally show the new quote immediately
    showRandomQuote();

    // Save quotes to local storage
    saveQuotes();

    // Post the new quote to the server
    postData({ text: quote, category: category });
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
        quotes.length = 0; // Clear current quotes array
        quotes.push(...JSON.parse(storedQuotes)); // Populate with stored quotes
    }
}

// Load quotes from local storage on page load
loadQuotes();

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = categoryFilter.value;

    // Filter the quotes based on selected category
    const filteredQuotes = selectedCategory === "all"
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    // Clear current quote display
    quoteDisplay.innerHTML = "";

    // Display filtered quotes
    filteredQuotes.forEach(quote => {
        const quoteText = document.createElement("p");
        quoteText.textContent = `"${quote.text}"`;

        const quoteCategory = document.createElement("p");
        quoteCategory.textContent = `Category: ${quote.category}`;

        quoteDisplay.appendChild(quoteText);
        quoteDisplay.appendChild(quoteCategory);
    });
}

// Function to populate categories in the filter dropdown
function populateCategories() {
    const categories = ["all", ...new Set(quotes.map(quote => quote.category))];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Populate categories on page load
populateCategories();

// Function to fetch data from the server (simulated using async/await)
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log('Fetched Data:', data);

        // Sync the fetched data with the local storage
        syncQuotesWithServer(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Sync quotes with the server data (handling conflict resolution)
function syncQuotesWithServer(fetchedData) {
    const serverQuotes = fetchedData.map(post => ({
        text: post.title,
        category: "Random", // Example category from the server data
    }));

    let conflictsResolved = 0;

    // Merge server quotes with the existing local quotes
    serverQuotes.forEach(serverQuote => {
        const existingQuoteIndex = quotes.findIndex(quote => quote.text === serverQuote.text);

        if (existingQuoteIndex === -1) {
            // If the quote doesn't exist, add it
            quotes.push(serverQuote);
        } else {
            // If it exists, show conflict resolution options
            resolveConflict(existingQuoteIndex, serverQuote);
            conflictsResolved++;
        }
    });

    // Save updated quotes to local storage
    saveQuotes();

    // Show notification of data sync completion
    showNotification(`Quotes synced with server! ${conflictsResolved} conflict(s) resolved.`);

    // Optionally show the latest quote
    showRandomQuote();
}

// Function to resolve conflicts manually
function resolveConflict(existingQuoteIndex, serverQuote) {
    // Show a conflict resolution prompt to the user
    const userChoice = confirm(`Conflict detected: The quote "${quotes[existingQuoteIndex].text}" already exists. Do you want to keep your local data or use the server's data? Click "OK" to use server data, or "Cancel" to keep local data.`);

    // Resolve the conflict based on user's choice
    if (userChoice) {
        // User chooses to use server data
        quotes[existingQuoteIndex] = serverQuote;
    } else {
        // User keeps local data (no action needed)
        console.log(`Kept local data: "${quotes[existingQuoteIndex].text}"`);
    }
}

// Function to post data to the server (simulated)
async function postData(newQuote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: newQuote.text,
                body: newQuote.category,
                userId: 1,
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8', // Set the Content-Type header
            },
        });
        const data = await response.json();
        console.log('Posted Data:', data);
    } catch (error) {
        console.error('Error posting data:', error);
    }
}

// Function to show notifications
function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 5000);
}

// Fetch new data every 10 seconds (simulate periodic data fetching)
setInterval(fetchQuotesFromServer, 10000);*/

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
