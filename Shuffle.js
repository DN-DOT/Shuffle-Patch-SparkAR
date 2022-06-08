
//==============================================================================
// Author DN Cherry @dn.cherry | 2022
// Shuffle Patch Script for Spark AR
//==============================================================================

// How to load in modules
const Patches = require('Patches');
const Scene = require('Scene');
const Random = require('Random');
const Reactive = require('Reactive');


(async function () {  // Enables async/await in JS


// Question List  ***
function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
};
//_____________________________________________

// shuffle question list ***
function shuffle(array) {
  var i = array.length,
  j = 0,
  temp;

  while (i --){

    j = Math.floor(Math.random() * (i+1));

    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
//____________________________________________

// Creates list ranging from the provided minium and max number
var questionList = range(0, 29);
Diagnostics.log("question list = " + questionList);

// Shuffles the created Question List
var ranList = shuffle(questionList);
Diagnostics.log("rand question list = " + ranList);

var CurrentQ = 0;
var Pulsed;
Diagnostics.log(CurrentQ);


// ||***** Function to create random uniique value list based on number of questions picked ********||
// can use this to pull the first X amount of numbers needed from produced random list

Patches.outputs.getScalar('numOfQ').then(event=> {
     event.monitor().subscribe(function (choice) {
          Diagnostics.log("# of questions chosen = " + choice.newValue);
          var c = choice.newValue + 1;
          // index
          var i = 0
          var gameList = [];
          Diagnostics.log(" questions chosen c = " + c );

// create new list, add index from random list to game list

          while (c --)

          {

          gameList.push(ranList[i]);
          i ++;
        };

        Diagnostics.log("game list = " + gameList);

        var p = 0;

    //     ||***** Function to step through the created list ********|
    // reads in the selected nuumber of questions the user wants asked
        Patches.outputs.getPulse('nextQ').then(event => {
             Pulsed = event.subscribe(function () {
                  // code to execute when pulse happen

                    CurrentQ = gameList[p];
                    p ++;

                    Diagnostics.log("new queston =" + CurrentQ);

                    // triggers next question
                    Patches.inputs.setScalar('currentQ', CurrentQ);
                    
                  });

             });
        });


    });

})();
