

//code adapted from Daniel Shiffman tutorial on getting user input
//available at: https://www.youtube.com/watch?v=uNQSVU0IKec

let data;
let text;
let phrases;
let input;


function preload() {
  data = loadStrings('africa.txt');
  
}

function setup() {
    noCanvas();
    //console.log(data);
    text = data.join(' ');
    //console.log(text);
    phrases = RiTa.splitSentences(text, '.');
    //console.log(phrases);
    input = createInput();
    input.id('search');
    document.getElementById("search").placeholder = "Type a key word";
    input.changed(wordsInContext);
    //output.position(0, 550);
}

let result = '';

function wordsInContext() {
  
  //let result = '';
  
    for (let i = 0; i < phrases.length; i++) {
        let sentences = phrases[i];
        if (sentences.includes(input.value()) && sentences.length <= 500 ) {
            result = createP(sentences);
            result.class('sentence');
        } 
    }
    
    if(result.includes(input.value())) {
        result == result;
        
        } else { 
          result = createP('The term you typed is not part of the corpus');
          result.class('sentence');
    }

}


/*let ritaString;

function analyze() {
    //let senteceToAnalyze = document.querySelectorAll(".sentence");
    /*senteceToAnalyze.forEach(function(element) {
        ritaString = RiString(content);
        let words = ritaString.words();
        words.forEach(function(element) {
        let features = RiString(element).features();
        //console.log(features);

        // Parts of Speech
        if (features.pos === 'nn' || features.pos === 'nnp' || features.pos === 'nns' || features.pos === 'nnps')
            result.style('background', 'lavender');

        // Plural
        if (features.pos === 'jj' || features.pos === 'jjr' || features.pos === 'jjs')
            result.style('background', 'purple');
        });
    });
}

analyze();
*/


function reset() {
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (key === "Backspace" && input.value().length == 0) {
            let clearSentence = document.querySelectorAll(".sentence");
            console.log(clearSentence);
            clearSentence.forEach(function(element) {
                element.style.display = 'none';
            });
        } 
    });
}

reset();







