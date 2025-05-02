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
        const response = await fetch('challenges.json');
        const data = await response.json();
        
        // Get the day of the year (1-365)
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        
        // Get the challenge for today (using modulo to cycle through challenges)
        const challengeIndex = dayOfYear % data.challenges.length;
        currentChallenge = data.challenges[challengeIndex];
        
        // Update the image source
        const mapImage = document.querySelector('#today-image');
        if (mapImage) {
            mapImage.src = currentChallenge.imageUrl;
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
            link.href = currentChallenge.wikipediaLink;
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