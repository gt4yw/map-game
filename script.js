// listen for click on submit button 
// take dropdowns as the input
// delete the dropdowns
// add score / answer text

//<div id="answer-box">
//<h3 id="score">Score: xx/100</h3>
//<p id="answer">The right answer was 1940! Check out this map and the history behind it <a href="https://en.wikipedia.org/wiki/Winter_War#Soviet_invasion">here</a>.</p>



const rightYear = 1940;
const rightEra = "C.E.";
 

const guessBox = document.querySelector("#guess-box");
const button = document.querySelector("#submit");
const yearInput = document.querySelector("#year-input");
const era = document.querySelector("#dropdown-era");
const score = document.querySelector("#score");
const answer = document.querySelector("#answer");

let currentChallenge = null;

// Function to load the daily challenge
async function loadDailyChallenge() {
    try {
        
        // Get the image options from the challenges json file
        const response = await fetch('challenges.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayFormatted = `${year}-${month}-${day}`;
        
        // Convert today's date to a Date object for comparison
        const todayDate = new Date(todayFormatted);

        // Get the current page category from the URL
        const currentPage = window.location.pathname.split('/').pop();
        let category = 'Battle'; // default
        if (currentPage === 'easy.html') {
            category = 'Easy';
        } else if (currentPage === 'hard.html') {
            category = 'Hard';
        }

        // Depreciated method that requires exact date match
        // Find the challenge that matches both today's date and the current category
        // currentChallenge = data.challenges.find(challenge => 
        //     challenge.gameDate === todayFormatted && 
        //     challenge.category === category
        // );
        
        // Find the challenge that matches the category and is within 7 days after the game date
        currentChallenge = data.challenges.find(challenge => {
            if (challenge.category !== category) return false;
            
            const challengeDate = new Date(challenge.gameDate);
            const daysDifference = (todayDate - challengeDate) / (1000 * 60 * 60 * 24);
            
            // Accept challenges that are on the game date or up to 7 days after
            return daysDifference >= 0 && daysDifference <= 6;
        });
        
        if (!currentChallenge) {
            console.log("hi");
            console.error(`No ${category} challenge found for today`);
            return;
        }
        
        // Update the image source
        const mapImage = document.querySelector('#today-image');
        if (mapImage && currentChallenge.localURL) {
            mapImage.src = currentChallenge.localURL;
            mapImage.alt = currentChallenge.description || 'Historical Map';
            mapImage.style.width = '100%';
            mapImage.style.height = 'auto';
            mapImage.style.maxWidth = '800px';
            
            // Initialize medium-zoom on the image
            mediumZoom(mapImage, {
                margin: 24,
                background: 'rgba(0, 0, 0, 0.9)',
                scrollOffset: 0
            });
        }

        // Set up the button click handler after we have the challenge
        button.addEventListener("click", () => {
            let userYear = parseInt(yearInput.value);
            const userEra = era.value;
            
            if (userEra === "B.C.E.") {
                userYear = -userYear;
            }
            
            guessBox.remove();
            
            // need a better scoring algo 
            let userScore = 100 - Math.abs(currentChallenge.year-userYear);
            if (userScore < 0) {
                userScore = 0;
            }

            score.textContent = "Score: " + userScore +"/100";
            answer.textContent = " You guessed " + userYear + " " + userEra + "       ...the right answer was " + currentChallenge.year +" " + currentChallenge.era + "! Check out this map and the history behind it "
            
            const link = document.createElement('a');
            link.href = currentChallenge.linkToBackground;
            link.textContent = "here.";

            answer.appendChild(link);
            
            // Show the answer box
            const answerBox = document.querySelector('#answer-box');
            if (answerBox) {
                answerBox.classList.add('visible');
            }
        });
    } catch (error) {
        console.error('Error loading challenges:', error);
    }
}

// Load the challenge when the page loads
document.addEventListener('DOMContentLoaded', loadDailyChallenge);