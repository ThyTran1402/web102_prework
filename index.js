/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    games.forEach((game) => {
        // create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // add the class game-card to the list
        gameCard.classList.add('game-card');

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img"/>
            <h3>${game.name}</h3>
            <p>${game.description}</p>
             <p>Funded: ${game.pledged}/${game.goal}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    });

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString("en-US")}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString("en-US")}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
// set inner HTML using template literal
gamesCard.innerHTML = `${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter((game) =>  {
        return game.pledged < game.goal});

    console.log("Number of unfunded games:", unfundedGames.length);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter((game) =>  {
        return game.pledged >= game.goal});

    console.log("Number of funded games:", fundedGames.length);
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
    console.log(GAMES_JSON.length);


}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");


// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/


// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
// const unfundedGamesCount = GAMES_JSON.filter((game) => {
//     return game.goal > game.pledged;
//   });
// const totalUnfundedGames = unfundedGamesCount.length;

const unfundedGamesCount = GAMES_JSON.filter((game) => game.pledged < game.goal).length;
const fundedGamesCount = GAMES_JSON.filter((game) => game.pledged >= game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
//const displayStr = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames} games. Currently, ${unfundedGamesCount} ${unfundedGamesCount === 1 ? 'game remains' : 'games remain'} unfunded. We need your help to fund these amazing games!`;
//console.log(displayStr);

const displayStr = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames} games. 
Currently, ${unfundedGamesCount} ${unfundedGamesCount === 1 ? 'game remains' : 'games remain'} unfunded, and 
${fundedGamesCount} ${fundedGamesCount === 1 ? 'game is' : 'games are'} fully funded. We need your help to fund these amazing games!`;
console.log(displayStr);

// create a new DOM element containing the template string and append it to the description container
const descriptionParagraph = document.createElement('p');
descriptionParagraph.textContent = displayStr;
descriptionContainer.appendChild(descriptionParagraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUp, ...restOfGames] = sortedGames;
console.log(topGame.name);   // Most funded game name
console.log(runnerUp.name);  // Second most funded game name

const firstWordTopGame = topGame.name.split(" ")[0];
const firstWordRunnerUp = runnerUp.name.split(" ")[0];

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement('div');
topGameElement.textContent = `${topGame.name}`;
// Append it to the correct element
firstGameContainer.appendChild(topGameElement);

// do the same for the runner up item
const runnerUpElement = document.createElement('div');
runnerUpElement.textContent = `${runnerUp.name}`;
secondGameContainer.appendChild(runnerUpElement);


//FEATURE 1: SEARCH FUNCTIONALITY
// Function to search games based on search input
function searchGames() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    
    if (searchInput.trim() === "") {
      // If search box is empty, show all games
      showAllGames();
      return;
    }
    
    deleteChildElements(gamesContainer);
    
    // Filter games that match the search query in name or description
    const searchResults = GAMES_JSON.filter((game) => {
      return (
        game.name.toLowerCase().includes(searchInput) || 
        game.description.toLowerCase().includes(searchInput)
      );
    });
    
    //Remove existing search result indicator (if any)
    const existingIndicator = document.querySelector(".search-results-indicator");
    if (existingIndicator) existingIndicator.remove();
    // Display search results count
    const resultsIndicator = document.createElement('p');
    resultsIndicator.classList.add('search-results-indicator');
    
    if (searchResults.length === 0) {
      resultsIndicator.textContent = `No games found matching "${searchInput}"`;
      gamesContainer.appendChild(resultsIndicator);
    } else {
      const trimmedSearch = searchInput.trim();
      resultsIndicator.textContent = `Found ${searchResults.length} game${searchResults.length === 1 ? '' : 's'} matching "${searchInput}"`;
      gamesContainer.appendChild(resultsIndicator);
      
      // Add matching games to the page
      addGamesToPage(searchResults);
    }
  }
  
  // Add this after you've defined all the other event listeners
  const searchBtn = document.getElementById("search-btn");
  searchBtn.addEventListener("click", searchGames);
  
  // Add event listener for pressing Enter in the search box
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchGames();
    }
  });


//FEATURE 2: SMOOTH SCROLL NAVIGATION 

// Add this function to enable smooth scrolling
function setupSmoothScroll() {
    // Select all anchor links in the navigation
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Get the target section's ID from the href attribute
        const targetId = this.getAttribute('href');
        
        // Only handle internal links (starts with #)
        if (targetId.startsWith('#')) {
          e.preventDefault();
          
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
            // Scroll smoothly to the target section
            targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Update URL without causing a page jump
            history.pushState(null, null, targetId);
          }
        }
      });
    });
    
    // Add "back to top" button functionality if needed
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      
      // Show/hide back-to-top button based on scroll position
      window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
          backToTopBtn.style.display = 'block';
        } else {
          backToTopBtn.style.display = 'none';
        }
      });
    }
  }
  
  // Add the back to top button HTML somewhere in your page
  // <button id="back-to-top" title="Go to top">↑</button>
  
  // Initialize smooth scrolling after the page has loaded
  document.addEventListener('DOMContentLoaded', setupSmoothScroll);