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
const y1 = document.querySelector("#dropdown1");
const y2 = document.querySelector("#dropdown2");
const y3 = document.querySelector("#dropdown3");
const y4 = document.querySelector("#dropdown4");
const era = document.querySelector("#dropdown-era");
const score = document.querySelector("#score");
const answer = document.querySelector("#answer");


button.addEventListener("click", () => {
    const userYear = 1000*y1.value + 100*y2.value + 10*y3.value + 1*y4.value; 
    console.log(userYear);
    const userEra = era.value;
    if (userEra === "B.C.E") {
        userYear = 0 - userYear;
    }
    
    guessBox.remove();
    
    // need a better scoring algo 
    let userScore = 100 - Math.abs(rightYear-userYear);
    if (userScore < 0) {
        userScore = 0;
    }

    score.textContent = "Score: " + userScore +"/100";
    answer.textContent = "The right answer was " + rightYear +" " + rightEra + "! Check out this map and the history behind it "
    
    const link = document.createElement('a');
    link.href = "https://en.wikipedia.org/wiki/Winter_War#Soviet_invasion";
    link.textContent = "here.";

    answer.appendChild(link);
    // need to get the link working in the above
});