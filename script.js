const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function newQuote(){
    // show loader, hide quoteContainer 
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // if long quote, apply 'long-quote' css class. 
    // else : remove 'long-quote' css class. 
    if(quote.text.length > 80) {
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // show quoteContainer, hide loader 
    complete(); 
    quoteText.textContent = quote.text; 
}

// get quote from api 
async function getQuote(){
    const apiURL = 'https://type.fit/api/quotes';
    loading();
    try{
        const response = await fetch(apiURL);
        //parse as json: 
        apiQuotes = await response.json();
        newQuote();
    }catch(err){
        console.log("no quote", err);
    }
    
}

// Tweet quote 
function tweetQuote() {
    // template string : uses backticks `` not '' , allows passing in variable
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent}`;
    window.open(twitterURL);
}

// show loader, hide quoteContainer 
function loading() {
    loader.hidden = false; 
    quoteContainer.hidden = true; 
}
// show quoteContainer, hide loader 
function complete() {
    loader.hidden = true; 
    quoteContainer.hidden = false; 
}

// event listerns
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// on load
getQuote();


