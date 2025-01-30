
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

// Load quotes from local storage or use default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" },
    { text: "Do what you can, with what you have, where you are.", category: "Action" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" }
];

// Function to save quotes to local storage
function saveQuotesToLocalStorage() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = "<p>No quotes available. Add some quotes!</p>";
        return;
    }

    quoteDisplay.innerHTML = "";
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const quoteText = document.createElement("p");
    quoteText.textContent = `"${randomQuote.text}"`;

    const quoteCategory = document.createElement("p");
    quoteCategory.textContent = `Category: ${randomQuote.category}`;

    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);

    // Store last viewed quote in session storage
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
}

// Load last viewed quote or a random one on page load
function loadLastViewedQuote() {
    const lastViewedQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));

    if (lastViewedQuote) {
        quoteDisplay.innerHTML = "";

        const quoteText = document.createElement("p");
        quoteText.textContent = `"${lastViewedQuote.text}"`;

        const quoteCategory = document.createElement("p");
        quoteCategory.textContent = `Category: ${lastViewedQuote.category}`;

        quoteDisplay.appendChild(quoteText);
        quoteDisplay.appendChild(quoteCategory);
    } else {
        showRandomQuote(); // Show a random quote if no session data exists
    }
}

// Event listener for "Show New Quote" button
newQuoteButton.addEventListener("click", showRandomQuote);

// Load last viewed quote on page load
loadLastViewedQuote();

// Function to add a new quote dynamically
function createAddQuoteForm() {
    const quote = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (quote === "" || category === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    // Add new quote to the quotes array
    quotes.push({ text: quote, category: category });

    // Save updated quotes to local storage
    saveQuotesToLocalStorage();

    // Clear input fields
    newQuoteText.value = "";
    newQuoteCategory.value = "";

    alert("New quote added successfully!");

    // Show the new quote immediately
    showRandomQuote();
}

// Function to export quotes as a JSON file
function exportToJsonFile() {
    const jsonData = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "quotes.json";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    alert("Quotes exported successfully!");
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();

    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);

            if (Array.isArray(importedQuotes) && importedQuotes.length > 0) {
                quotes.push(...importedQuotes);
                saveQuotesToLocalStorage();
                alert("Quotes imported successfully!");
                showRandomQuote(); // Show a new quote after importing
            } else {
                alert("Invalid file format. Please upload a valid JSON file.");
            }
        } catch (error) {
            alert("Error importing quotes. Please check the file format.");
        }
    };

    fileReader.readAsText(event.target.files[0]);
}
