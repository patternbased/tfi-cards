var characterRequest = new XMLHttpRequest();
if (!characterRequest) {
alert('Giving up :( Cannot create an XMLHTTP instance');
}
characterRequest.open('GET','chardata.json', true);


characterRequest.onload = function() {

    // parse data
    var characterData = JSON.parse(characterRequest.responseText);

    var i = 1;
    var randomizer = $(".randomizer");
    $(randomizer).on("click",function(){
        var charNumber = characterData.length;
        var charRandomNum = Math.random() * (charNumber - 1);
        var charRoundedNum = Math.round(charRandomNum);
        i = charRoundedNum;
        renderCard();
        // console.log(charRoundedNum);
    })

    var r = 1;
    var randomFact = $(".randomFact");
    $(randomFact).on("click",function(){
        var charFactNumber = characterData[i].Fact.length;
        var charFactRandomNum = Math.random() * (charFactNumber - 1);
        var charFactRoundedNum = Math.round(charFactRandomNum);
        r = charFactRoundedNum;
        renderCard();
        console.log(charFactRoundedNum);
    })

    // make DOM elements variables
    var charPicDiv = $(".charPic");
    var charNameDiv = $(".charName");
    var charFactDiv = $(".charFact");

    function renderCard(){
    // pulling data and defining contents from JSON
    var charImage = "url('images/" + characterData[i].Image + "') no-repeat";
    var charNameString = characterData[i].Name;
    var charFactString = characterData[i].Fact[r];

    // generate CSS and HTML elements
    $(charPicDiv).css("background",charImage);
    $(charPicDiv).css("background-size","cover");
    $(charNameDiv).html(charNameString);
    $(charFactDiv).html(charFactString);
    }
    renderCard();
    };

characterRequest.send();


