
const quotes = [
    { text:"text.", category:"category" },
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
  
  // Function to display a random quote
  function showRandomQuote() {
    // Clear current quote display
    quoteDisplay.innerHTML = "";
  
    // Pick a random quote
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
  function addQuote() {
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
  
    //  Display a confirmation message or update the quote display
    alert("New quote added successfully!");
  
    // Optionally show the new quote immediately
    showRandomQuote();
  }
  