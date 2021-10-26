let quotesArray = [];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
function showLoadingSpinner() {
   loader.hidden = false;
   // While we see the loader, the quote container is hidden
   quoteContainer.hidden = true;
}

// Hide loading
function hideLoadingSpinner() {
   loader.hidden = true;
   quoteContainer.hidden = false;
}

// Get quotes from API
async function getQuotesArrayFromAPI() {
   showLoadingSpinner();
   const apiUrl = 'https://type.fit/api/quotes';

   try {
      const response = await fetch(apiUrl);
      quotesArray = await response.json();
      newQuote(quotesArray);
   } catch (err) {
      console.error("Couldn't retrieve quotes. Error : ", err);
   }
}

// Show new quote
function newQuote() {
   showLoadingSpinner();
   // Selecting a random quote.
   const singleQuote =
      quotesArray[Math.floor(Math.random() * quotesArray.length)];

   updateText(singleQuote);
   updateAuthor(singleQuote);
   hideLoadingSpinner();
}

// Update author
function updateAuthor(quote) {
   // Check if the author field is empty.
   if (!quote.author) {
      authorText.textContent = 'Unknown';
   } else {
      authorText.textContent = quote.author;
   }
}

// Update author
function updateText(quote) {
   // Check quote length for styling
   if (quote.text.length > 120) {
      // Add class
      quoteText.classList.add('long-quote');
   } else {
      // Remove class
      quoteText.classList.remove('long-quote');
   }
   quoteText.textContent = quote.text;
}

// Tweet quote
function tweetQuote() {
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
   // Open a new tab
   window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotesArrayFromAPI();
