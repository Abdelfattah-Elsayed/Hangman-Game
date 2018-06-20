function start(){
    var words = ["TITANIC","MATRIX","BASEL","ESSENTIAL","BOTTOM","LOVE","CATCH","CAIRO","SHOWTIME",
                 "MULAN","PETS","TOYS","BATMAN","JOKER","SPIDER","SCORPION","MATHEMATICS","WONDER","THOR","HITMAN","CAMEL","TOMATO","SPHINX","KINGDOM","CHRISTMAS","BIRTHDAY","SQUARE","ALAHLY","EGYPT","ELEPHANT","DINASOUR","FACEBOOK","HANGMAN"],

     hit = false,
     i = 0,
     buttons = [],
     charCodeA = 65,
     charCodeZ = 90,
     disableInput = false,
     buttonContainer = document.getElementById('buttons'),
     livesContainer  = document.getElementById('lives'),
     wordContainer   = document.getElementById('word'),
     nextButton      = document.getElementById('next'),
        start        = document.getElementById("start"), 
        score   = 0;

   
   
   var counter = 1200,end;

   function processInput(character) {
     //Loop through the word-array and check, if the given character matches 
     for (i = 0; i < length; i++) {
       if (word[i] == character) {
         letterSpan[i].innerHTML = character;
         hit = true;
       }
       //Check if there is any character left, that hasn't been guessed yet
       if(letterSpan[i].innerHTML == "_"){
         finished = false;
       }
     }

     //After the for-loop is finished, check if there was a hit
     if (hit === true) {
       //Set hit back to false
       hit = false;
     } else {
       //Decrease lives and display them
       lives--;
       livesContainer.style.width = lives * 40 + "px";
         
      //Check, if there are lives left
       if (lives == 0) {
         gameOver();
       }
     }

     //After the for-loop is finished, check if every character is already guessed
     if(finished === true){
         
       document.getElementsByTagName("html")[0].className = "finished";
         score++;
       document.getElementById("time").innerHTML += "<br/>" + "Great";
       document.getElementById("time").innerHTML += "<br/>" + "Score : " + score;
       
       disableInput = true;
         clearTimeout(end);
     }else{
       finished = true;
     }
   }

   function echoButtons() {
     i = 0;

     for (var letter = charCodeA; letter <= charCodeZ; letter++) {
       //Create button for every char
       buttons[i] = document.createElement("button");
       buttons[i].innerHTML = String.fromCharCode(letter);

       //Create EventListener for every button
       buttons[i].addEventListener("click", function() {
         if(disableInput === false){  
           if (this.className.indexOf("disabled") == -1) {
             processInput(this.innerHTML);
             this.className = "disabled";
           }
         }
       });

       //Insert every button into the buttonContainer
       buttonContainer.appendChild(buttons[i]);
       i++;
     }
   }
   
   

   //Get new random word and set back various stuff
   function newWord() {
     selected = Math.floor(Math.random() * words.length);
     word = words[selected].split('');
     length = word.length;
     letterSpan = [];
     lives = 10;
     letterString = "";
     finished = true,
     disableInput = false;

     livesContainer.style.width = lives*40 +"px"
     wordContainer.innerHTML = "";
     document.getElementsByTagName("html")[0].className = "";

     //Remove the disabled-class from all buttons
     for(i = 0; i <= 25; i++){
       buttons[i].className = "";
     }

     //Create a <span> for each char of the word and replace it with _
     for (i = 0; i < length; i++) {
       letterSpan[i] = document.createElement("span");
       letterSpan[i].innerHTML = "_";
       wordContainer.appendChild(letterSpan[i]);
     }
   }
   // count down timer
   function timer(){
       
       document.getElementById("time").innerHTML = "Time left : " + counter;
       end = setTimeout(timer,1000);
       counter--
       if (counter < 0){
           gameOver();
           clearTimeout(end);
           document.getElementById("time").innerHTML += "<br/>" +"Time Finished";
           document.getElementById("result").innerHTML = "your score is : " + score;
           nextButton.style.display = "none";
       }
       if (lives == 0) {
         clearTimeout(end);
         document.getElementById("time").innerHTML += "<br/>" + "Game over";
           nextButton.style.display = "none";
           document.getElementById("result").innerHTML = "your score is : " + score;
       }
       
   }
       //This function to show the remaining chars
       
       function gameOver() {
     
     for (i = 0; i < length; i++) {
       if (letterSpan[i].innerHTML == "_") {
         letterSpan[i].innerHTML = word[i];
         letterSpan[i].className = "missing";
       }
         
     }

     disableInput = true
     document.getElementsByTagName("html")[0].className = "gameOver";
   }
   
   timer();
   nextButton.addEventListener("click", newWord);
   nextButton.addEventListener("click", timer);
   echoButtons();
   newWord();
       document.getElementById("startpage").style.display = "none";
   } //end start
