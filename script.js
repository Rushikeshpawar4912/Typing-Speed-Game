const paragraphs = [
    "Plastic bags are a major cause of environmental pollution. Plastic as a substance is non-biodegradable and thus plastic bags remain in the environment for hundreds of years polluting it immensely. It has become very essential to ban plastic bags before they ruin our planet completely. Many countries around the globe have either put a ban on the plastic bag or Levi tax on it. However, the problem hasn’t been solved completely because the implementation of these measures has",
    "Many people travel for different purposes. Whether it is for a business trip or a holiday trip, we see people travelling often. Some people prefer a hilly area for travelling while the others like travelling to places with beaches. In this travelling essay, we will look at the importance of travelling and how it has changed ever since the old times.    ",
    "India, our country is the finest example of ‘unity in diversity. People from different backgrounds and religions live here in peace and harmony. Moreover, our country is known for having a variety of languages. So much so that you will find a different language at every 100 kilometres in our country. Through our country essay, we will take you through what India is.",
    "We entered this world because of our parents. It is our parents who have given us life and we must learn to be pleased with it. I am grateful to my parents for everything they do for me. Through my parents essay, I wish to convey how valuable they are to me and how much I respect and admire them.",
    "Knowledge is the most substantial element in the world. It can make or break your life alone. Moreover, knowledge is what differentiates humans from animals. With knowledge, one can utilize their skills and make their lives better. When you have knowledge at your disposal, you can accomplish a lot in your life. The essay on knowledge is power will help you learn more about it",
    "Guru Nanak Jayanti is an essential festival for Sikhs. On this day, Guru Nanak was born thus it is important for Sikhism. It is popularly known as Gurpurab and the Sikhs celebrate it with great joy and enthusiasm all over the world. Let us learn more about the festival of Gurpurab",
    "Sports are an essential part of our society. They help us in many ways and play a vital role too. People who play sports from an early age can learn discipline, teamwork, leadership and many other beneficial activities. Similarly, they also unite people. There are different types of sports that have different rules and equipment. Let’s look at the different types and their benefits",
    "Plastic bags are a major cause of environmental pollution. Plastic as a substance is non-biodegradable and thus plastic bags remain in the environment for hundreds of years polluting it immensely. It has become very essential to ban plastic bags before they ruin our planet completely. Many countries around the globe have either put a ban on the plastic bag or Levi tax on it. However, the problem hasn’t been solved completely because the implementation of these measures has",

];


let timer,
maxTime = 120;

// Function to update maxTime based on difficulty level
function updateMaxTime(difficulty) {
    switch (difficulty) {
        case 'easy':
            maxTime = 120;
            break;
        case 'medium':
            maxTime = 90;
            break;
        case 'hard':
            maxTime = 60; // Example: set maxTime to 120 for hard difficulty
            break;
        default:
            maxTime = 120; // Set default to medium if no valid difficulty provided
            break;
    }
}
document.getElementById('easyBtn').addEventListener('click', () => {
    updateMaxTime('easy');
    resetGame(); // Reset the game with the new maxTime
});

document.getElementById('mediumBtn').addEventListener('click', () => {
    updateMaxTime('medium');
    resetGame(); // Reset the game with the new maxTime
});

document.getElementById('hardBtn').addEventListener('click', () => {
    updateMaxTime('hard');
    resetGame(); // Reset the game with the new maxTime
});
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;




const typingText = document.querySelector(".typingpara p"),
Useinfield = document.querySelector(".Container .input-field"),
UseTrybtn = document.querySelector(".content button"),
UseTimetag = document.querySelector(".time span b"),
Usemistake = document.querySelector(".mistake span"),
UseWpm = document.querySelector(".wpm span"),
cpm = document.querySelector(".cpm span");


function Paraloader() {
    const Index = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[Index].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => Useinfield.focus());
    typingText.addEventListener("click", () => Useinfield.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = Useinfield.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        UseWpm.innerText = wpm;
        Usemistake.innerText = mistakes;
        cpm.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        Useinfield.value = "";
    }   
}

function resetGame() {
    Paraloader();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    Useinfield.value = "";
    UseTimetag.innerText = timeLeft;
    UseWpm.innerText = 0;
    Usemistake.innerText = 0;
    cpm.innerText = 0;
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        UseTimetag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        UseWpm.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}


Paraloader();
Useinfield.addEventListener("input", initTyping);
UseTrybtn.addEventListener("click", resetGame);