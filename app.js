const btn = document.querySelector('.talk')
const content = document.querySelector('.content')


function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour>=0 && hour<12){
        speak("Good Morning Boss...")
    }

    else if(hour>12 && hour<17){
        speak("Good Afternoon Master...")
    }

    else{
        speak("Good Evenining Sir...")
    }

}

window.addEventListener('load', ()=>{
    speak("Initializing ELLIOT..");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition =  new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', ()=>{
    content.textContent = "Listening...."
    recognition.start();
})

function takeCommand(message){
    if (message.includes("hey") || message.includes("hello")) {
      speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
      window.open("https://google.com", "_blank");
      speak("Opening Google...");
    } else if (message.includes("open youtube")) {
      window.open("https://youtube.com", "_blank");
      speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
      window.open("https://facebook.com", "_blank");
      speak("Opening Facebook...");
    } else if (
      message.includes("what is") ||
      message.includes("who is") ||
      message.includes("what are")
    ) {
      window.open(
        `https://www.google.com/search?q=${message.replace(" ", "+")}`,
        "_blank"
      );
      const finalText = "This is what i found on internet regarding " + message;
      speak(finalText);
    } else if (message.includes("wikipedia")) {
      window.open(
        `https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`,
        "_blank"
      );
      const finalText =
        "This is what i found on wikipedia regarding " + message;
      speak(finalText);
    } else if (message.includes("time")) {
      const time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      const finalText = time;
      speak(finalText);
    } else if (message.includes("date")) {
      const date = new Date().toLocaleString(undefined, {
        month: "short",
        day: "numeric",
      });
      const finalText = date;
      speak(finalText);
    } else if (message.includes("calculator")) {
      window.open("Calculator:///");
      const finalText = "Opening Calculator";
      speak(finalText);
    }
    // 1. Tells a joke
    else if (message.includes("joke")) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the computer get cold? Because it forgot to close its Windows!",
        "Why was the math book sad? Because it had too many problems.",
      ];
      const joke = jokes[Math.floor(Math.random() * jokes.length)];
      speak(joke);
    }

    // 2. Weather information
    else if (message.includes("weather")) {
      window.open("https://www.google.com/search?q=weather", "_blank");
      speak("Checking the weather for you.");
    }

    // 3. Plays music on YouTube
    else if (message.includes("play music")) {
      window.open(
        "https://www.youtube.com/results?search_query=lofi+music",
        "_blank"
      );
      speak("Playing some relaxing music for you.");
    }

    // 4. Opens Gmail
    else if (message.includes("open gmail")) {
      window.open("https://mail.google.com", "_blank");
      speak("Opening Gmail.");
    }

    // 5. Opens Notepad (Windows only with custom protocol or via Electron Shell if packaged)
    else if (message.includes("open notepad")) {
      speak("Opening Notepad.");
      window.open("notepad://"); // only works if custom protocol is registered or use Electron
    }

    // 6. Performs a math calculation
    else if (message.match(/[\d\s\+\-\*\/]+/)) {
      try {
        const result = eval(message);
        speak("The result is " + result);
      } catch (error) {
        speak("Sorry, I couldn't calculate that.");
      }
    }

    // 7. Sends a motivational quote
    else if (
      message.includes("motivate me") ||
      message.includes("motivation")
    ) {
      const quotes = [
        "Don't watch the clock; do what it does. Keep going.",
        "Push yourself, because no one else is going to do it for you.",
        "Great things never come from comfort zones.",
      ];
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      speak(quote);
    }

    // 8. Tells a fun fact
    else if (message.includes("fun fact")) {
      const facts = [
        "Did you know? Honey never spoils.",
        "A group of flamingos is called a flamboyance.",
        "Bananas are berries, but strawberries aren't.",
      ];
      const fact = facts[Math.floor(Math.random() * facts.length)];
      speak(fact);
    }

    // 9. Opens LinkedIn
    else if (message.includes("open linkedin")) {
      window.open("https://www.linkedin.com", "_blank");
      speak("Opening LinkedIn.");
    }

    // 10. Shutdown message
    else if (message.includes("shutdown") || message.includes("goodbye")) {
      speak("Shutting down. Have a great day, Boss!");
      window.close(); // Note: This only works if the page was opened with `window.open()`
    }
    // 11. Open Instagram
    else if (message.includes("open instagram")) {
      window.open("https://www.instagram.com", "_blank");
      speak("Opening Instagram.");
    }

    // 12. Open Twitter (X)
    else if (message.includes("open twitter") || message.includes("open x")) {
      window.open("https://twitter.com", "_blank");
      speak("Opening Twitter.");
    }

    // 13. Read me the news
    else if (message.includes("news")) {
      window.open("https://news.google.com", "_blank");
      speak("Here are the latest headlines from Google News.");
    }

    // 14. Tell a riddle
    else if (message.includes("riddle")) {
      const riddles = [
        "What has keys but can’t open locks? A piano.",
        "I speak without a mouth and hear without ears. What am I? An echo.",
        "What can travel around the world while staying in the same spot? A stamp.",
      ];
      const riddle = riddles[Math.floor(Math.random() * riddles.length)];
      speak(riddle);
    }

    // 15. Give current day
    else if (
      message.includes("what day is it") ||
      message.includes("today's day")
    ) {
      const day = new Date().toLocaleString(undefined, { weekday: "long" });
      speak("Today is " + day);
    }

    // 16. Start countdown (10 seconds demo)
    else if (message.includes("countdown")) {
      speak("Starting 10 second countdown");
      let count = 10;
      let interval = setInterval(() => {
        speak(count.toString());
        count--;
        if (count === 0) {
          clearInterval(interval);
          speak("Countdown complete.");
        }
      }, 1000);
    }

    // 17. Translate hello in Spanish
    else if (message.includes("translate hello to spanish")) {
      speak("Hello in Spanish is Hola.");
    }

    // 18. Who created you?
    else if (
      message.includes("who created you") ||
      message.includes("your creator")
    ) {
      speak("I was created by my brilliant master, Safaet.");
    }

    // 19. Tell me a tongue twister
    else if (message.includes("tongue twister")) {
      const twisters = [
        "She sells sea shells by the sea shore.",
        "Peter Piper picked a peck of pickled peppers.",
        "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
      ];
      const twister = twisters[Math.floor(Math.random() * twisters.length)];
      speak(twister);
    }

    // 20. Open GitHub
    else if (message.includes("open github")) {
      window.open("https://github.com", "_blank");
      speak("Opening GitHub.");
    } else {
      window.open(
        `https://www.google.com/search?q=${message.replace(" ", "+")}`,
        "_blank"
      );
      const finalText =
        "I found some information for " + message + " on google";
      speak(finalText);
    }
}