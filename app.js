const API_KEY = "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";
const submitButton = document.querySelector("#submit");
const outPutElement = document.querySelector("#output");
const inputElement = document.querySelector("input");
const historyElement = document.querySelector(".history");
const buttonElement = document.querySelector("button");

function changeInput(value) {
  const inputElement = document.querySelector("input");
  inputElement.value = value;
}
// Initialize new SpeechSynthesisUtterance object
let speech = new SpeechSynthesisUtterance();

// Set Speech Language
speech.lang = "en";

let voices = []; // global array of available voices
document.getElementById("hides").style.display = "none";
window.speechSynthesis.onvoiceschanged = () => {
  // Get List of Voices
  voices = window.speechSynthesis.getVoices();

  // Initially set the First Voice in the Array.
  speech.voice = voices[0];

  // Set the Voice Select List. (Set the Index as the value, which we'll use later when the user updates the Voice using the Select Menu.)
  let voiceSelect = document.querySelector("#voices");
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

document.querySelector("#rate").addEventListener("input", () => {
  // Get rate Value from the input
  const rate = document.querySelector("#rate").value;

  // Set rate property of the SpeechSynthesisUtterance instance
  speech.rate = rate;

  // Update the rate label
  document.querySelector("#rate-label").innerHTML = rate;
});

document.querySelector("#volume").addEventListener("input", () => {
  // Get volume Value from the input
  const volume = document.querySelector("#volume").value;

  // Set volume property of the SpeechSynthesisUtterance instance
  speech.volume = volume;

  // Update the volume label
  document.querySelector("#volume-label").innerHTML = volume;
});

document.querySelector("#pitch").addEventListener("input", () => {
  // Get pitch Value from the input
  const pitch = document.querySelector("#pitch").value;

  // Set pitch property of the SpeechSynthesisUtterance instance
  speech.pitch = pitch;

  // Update the pitch label
  document.querySelector("#pitch-label").innerHTML = pitch;
});

document.querySelector("#voices").addEventListener("change", () => {
  // On Voice change, use the value of the select menu (which is the index of the voice in the global voice array)
  speech.voice = voices[document.querySelector("#voices").value];
});
let mains=document.querySelector("#inputs"); 
re1.addEventListener("click",()=>{
  mains.value="book_flight";
})
re2.addEventListener("click",()=>{
  mains.value="book_hotel";
})
re3.addEventListener("click",()=>{
  mains.value="vacation_";
})
re4.addEventListener("click",()=>{
  mains.value="travel_insurance";
})
re5.addEventListener("click",()=>{
  mains.value="car_rental";
})
re6.addEventListener("click",()=>{
  mains.value="cruise_deals";
})
re7.addEventListener("click",()=>{
  mains.value="things_to_do";
})
re8.addEventListener("click",()=>{
  mains.value="plan_a_trip";
})
re9.addEventListener("click",()=>{
  mains.value="book_train";
})
re10.addEventListener("click",()=>{
  mains.value="book_bus";
})


async function getMessage() {

  window.speechSynthesis.cancel();
  console.log("clicked");
  const inputText = inputElement.value.trim().toLowerCase();
  if(inputText.includes("wheather")){window.open("https://www.accuweather.com/");}
  const phrases = {
    "book_flight": "https://www.google.com/flights/",
    "book_hotel": "https://www.google.com/travel/hotels",
    "vacation_": "https://www.google.com/travel/",
    "travel_insurance": "https://www.google.com/search?q=travel+insurance",
    "car_rental": "https://www.tripadvisor.com/RentalCars",
    "cruise_deals": "https://www.tripadvisor.in/Cruises",
    "things_to_do": "https://www.google.com/travel/things-to-do",
    "plan_a_trip":"https://tripplanner.ai/",
    "book_train":"https://www.goibibo.com/trains/",
    "book_bus":"https://www.goibibo.com/bus/",


  };

  if (inputText in phrases) {
    window.open(phrases[inputText]);
  } else {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: inputElement.value,
          },
        ],
      }),
    };
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
      );
      const data = await response.json();
      console.log(data);

      outPutElement.textContent = data.choices[0].message.content;
      
       // Set the text property with the value of the textarea
       speech.text = outPutElement.textContent;

       // Start Speaking
       window.speechSynthesis.speak(speech);
      if (data.choices[0].message.content && inputElement.value) {
        const pElement = document.createElement("p");
        pElement.textContent = inputElement.value;
           
        pElement.addEventListener("click", () =>
          changeInput(pElement.textContent)
        );
        historyElement.append(pElement);
        
      }
    } catch (error) {
      console.error(error);
    }
  }
}

submitButton.addEventListener("click", getMessage);

function clearInput() {
  inputElement.value = "";
}

buttonElement.addEventListener("click", clearInput);








document.querySelector("#pause").addEventListener("click", () => {
  // Pause the speechSynthesis instance
  window.speechSynthesis.pause();
});

document.querySelector("#resume").addEventListener("click", () => {
  // Resume the paused speechSynthesis instance
  window.speechSynthesis.resume();
});

// document.querySelector("#cancel").addEventListener("click", () => {
//   // Cancel the speechSynthesis instance
//   window.speechSynthesis.cancel();
// });