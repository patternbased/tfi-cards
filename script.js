var characterRequest = new XMLHttpRequest();
if (!characterRequest) {
alert('Giving up :( Cannot create an XMLHTTP instance');
}
characterRequest.open('GET','chardata.json', true);


characterRequest.onload = function() {

    // parse data
    var characterData = JSON.parse(characterRequest.responseText);
    var charLength = characterData.length;

    var i = 1;
    var randomizer = $(".randomizer");
    $(randomizer).on("click",function(){
        i = getRandomWithOneExclusion(charLength, i);
        renderCard(i);
        // console.log(i);
    })

    var r = 1;
    var randomFact = $(".randomFact");
    $(randomFact).on("click",function(){
        var charFactLength = characterData[i].Fact.length;
        r = getRandomWithOneExclusion(charFactLength, r);
        renderCard(i);
        // console.log(r);
    })

    // make DOM elements variables
    var charPicDiv = $(".charPic");
    var charNameDiv = $(".charName");
    var charFactDiv = $(".charFact");

    function renderCard(num){
    // pulling data and defining contents from JSON
    var charImage = "url('images/" + characterData[num].Image + "') no-repeat";
    var charNameString = characterData[num].Name;
    var charFactString = characterData[num].Fact[r];

    // generate CSS and HTML elements
    $(charPicDiv).css("background",charImage);
    $(charPicDiv).css("background-size","cover");
    $(charNameDiv).html(charNameString);
    $(charFactDiv).html(charFactString);
    }
    renderCard(i);

    function getRandomWithOneExclusion(lengthOfArray,indexToExclude){
        var rand = null;  //an integer
          while(rand === null || rand === indexToExclude){
             rand = Math.round(Math.random() * (lengthOfArray - 1));
          }
        return rand;
      }
    };

characterRequest.send();


