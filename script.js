var characterRequest = new XMLHttpRequest();
if (!characterRequest) {
alert('Giving up :( Cannot create an XMLHTTP instance');
}
characterRequest.open('GET','chardata.json', true);


characterRequest.onload = function() {
    // parse data
    var characterData = JSON.parse(characterRequest.responseText);
    var charLength = characterData.length;
    var factOnRight = true;

    var i = 1;
    var randomizer = $(".randomizer");
    $(randomizer).on("click",function(){
        i = getRandomWithOneExclusion(charLength, i);
        shuffleAnimation();
        renderCard(i, 1200);
        // console.log(i);
    })

    var r = 1;
    var randomFact = $(".randomFact");
    $(randomFact).on("click",function(){
        var charFactLength = characterData[i].Fact.length;
        r = getRandomWithOneExclusion(charFactLength, r);
        renderCard(i, 400);
        // console.log(r);
    })

    // make DOM elements variables
    var charPicDiv = $(".charPic");
    var charNameDiv = $(".charName");
    var charFactDiv = $(".charFact");
    var charFactR = $("#turdR");
    var charFactL = $("#turdL");
    var shuffleGIF = $("#shuffleGIF");

    function shuffleAnimation(){
      $(shuffleGIF).css("display","block");
      setTimeout(function(){$(shuffleGIF).css("display","none")}, 1100);
    }

    function renderCard(num, time){
    // pulling data and defining contents from JSON
    var charImage = "url('images/villains/" + characterData[num].Image + "') no-repeat";
    var charNameString = characterData[num].Name;
    var charFactString = characterData[num].Fact[r];

    function updateCard(){
    // generate CSS and HTML elements
    $(charPicDiv).css("background",charImage);
    $(charPicDiv).css("background-size","cover");
    $(charNameDiv).html(charNameString);
    $(charFactDiv).html(charFactString);
    }

    //If desktop, excute fact bill animation
    if(innerWidth > 801) {
      if(factOnRight){
        $(charFactR).css("transform", "translate(-50%, -50%)");
        $(charFactL).css("transform", "translate(50%, -50%)");
        setTimeout(updateCard, time);
        setTimeout(function(){$(charFactR).css("transform", "translate(50%, -50%)")}, time);
      } else {
        $(charFactR).css("transform", "translate(-50%, -50%)");
        $(charFactL).css("transform", "translate(50%, -50%)");
        setTimeout(updateCard, time);
        setTimeout(function(){$(charFactL).css("transform", "translate(-50%, -50%)")}, time);
      }
      factOnRight = !factOnRight;
    } else {
      updateCard();
    }
    }
    shuffleAnimation();
    renderCard(i, 1200);

    function getRandomWithOneExclusion(lengthOfArray,indexToExclude){
        var rand = null;  //an integer
          while(rand === null || rand === indexToExclude){
             rand = Math.round(Math.random() * (lengthOfArray - 1));
          }
        return rand;
      }
    };

characterRequest.send();


