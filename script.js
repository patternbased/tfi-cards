/////// FINANCE WORLD
var financeRequest = new XMLHttpRequest();
if (!financeRequest) {alert('Giving up :( Cannot create an XMLHTTP instance');}
financeRequest.open('GET','finances.json', true);

financeRequest.onload = function() {
    var financeData = JSON.parse(financeRequest.responseText);
    var charLength = financeData.length;
    var factOnRight = true; // Is the fact card on the right?

    var i = 1; // Character ID
    var randomizer = $("#fandomCardF");
    $(randomizer).on("click",function(){
        i = getRandomWithOneExclusion(charLength, i);
        shuffleAnimation();
        renderCard(i, 2000);
    });
    var r = 1; // Fact ID
    var randomFact = $("#fandomFactF");
    $(randomFact).on("click",function(){
        var charFactLength = financeData[i].Fact.length;
        r = getRandomWithOneExclusion(charFactLength, r);
        renderCard(i, 400);
        financeFactAudio.start();
    });

    // DOM elements
    var charPicDiv = $(".charImg");
    var charNameDiv = $(".charName");
    var charFactDiv = $(".charFact");
    var charFactR = $("#turdR");
    var charFactL = $("#turdL");
    var shuffleGIF = $("#shuffleGIF");
    var defaultName = "Turdof DaWorld";
    var defaultFact = "This turd is the turdest turd in da world.";

    // Shuffle Card Audio and GIF
    function shuffleAnimation(){
      $(charNameDiv).html(defaultName);
      $(charFactDiv).html(defaultFact);
      shuffleFinanceAudio.start();
      $(shuffleGIF).css("display","block");
      setTimeout(function(){$(shuffleGIF).css("display","none")}, 2000);
    };

    function renderCard(num, time){
    // Pulling contents from JSON
    var charImage = "images/finance/" + financeData[num].Image;
    var charNameString = financeData[num].Name;
    var charFactString = financeData[num].Fact[r];
    function updateCard(){
    $(charPicDiv).attr('src', charImage);
    $(charPicDiv).css("background-size","cover");
    $(charNameDiv).html(charNameString);
    $(charFactDiv).html(charFactString);
    }
    // If desktop, play transition animations
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
      setTimeout(updateCard, time);    }
    };
    // Start modal
      $(document).ready(function(){
        $('.startModal').on('click', function(){
          $('.startModal').css('display','none');
          $('.blackScreen').css('display','none');
          shuffleAnimation();
          renderCard(i, 2000);
          controlHandler()
        })
      });
    };
financeRequest.send();

//////// SHUFFLE Function
function getRandomWithOneExclusion(lengthOfArray,indexToExclude){
  var rand = null;
    while(rand === null || rand === indexToExclude){
       rand = Math.round(Math.random() * (lengthOfArray - 1));
    }
  return rand;
}

//////// HUMAN WORLD
var humanRequest = new XMLHttpRequest();
if (!humanRequest) {alert('Giving up :( Cannot create an XMLHTTP instance');}
humanRequest.open('GET','humans.json', true);

humanRequest.onload = function() {
    var humanData = JSON.parse(humanRequest.responseText);
    var charLengthH = humanData.length;
    var factOnRightH = true; // Is the fact card on the right?

    var i = 1; // Character ID
    var randomizerH = $("#fandomCardH");
    $(randomizerH).on("click",function(){
        i = getRandomWithOneExclusion(charLengthH, i);
        renderCardH(i, 2000);
        shuffleAnimationH();
    });
    var r = 1; // Fact ID
    var randomFactH = $("#fandomFactH");
    $(randomFactH).on("click",function(){
        var charFactLengthH = humanData[i].Fact.length;
        r = getRandomWithOneExclusion(charFactLengthH, r);
        renderCardH(i, 400);
        humanFactAudio.start();
    });

    // DOM elements
    var charPicDivH = $(".charImgH");
    var charNameDivH = $(".charNameH");
    var charFactDivH = $(".charFactH");
    var charFactRH = $("#factR");
    var charFactLH = $("#factL");
    var shuffleGIFH = $("#shuffleGIFH");

    // Shuffle Card Audio and GIF
    function shuffleAnimationH(){
      $(charNameDivH).css({"opacity":0});
      shuffleHumanAudio.start();
      $(charPicDivH).css({ "transform": "scale(0, 0)", "opacity": 0});
      setTimeout(function(){
        $(charPicDivH).css({ "transform": "scale(1, 1)", "opacity": 1});
        $(charNameDivH).css({"opacity":1});
      }, 2000);
      $(shuffleGIFH).css("display","block");
      setTimeout(function(){$(shuffleGIFH).css("display","none")}, 2000);
    };

    function renderCardH(num, time){
    // Pulling contents from JSON
    var charImageH = "images/human/" + humanData[num].Image;
    var charNameStringH = humanData[num].Name;
    var charFactStringH = humanData[num].Fact[r];
    function updateCardH(){
    $(charPicDivH).attr('src', charImageH);
    $(charPicDivH).css("background-size","cover");
    $(charNameDivH).html(charNameStringH);
    $(charFactDivH).html(charFactStringH);
    }
    // If desktop, play transition animations
    if(innerWidth > 801) {
      if(factOnRightH){
        $(charFactRH).css({ "transform": "translate(-50%, 0) scale(0.1, 0.1)", "opacity": 0});
        $(charFactLH).css({ "transform": "translate(50%, 0) scale(0.1, 0.1)", "opacity": 0});
        setTimeout(updateCardH, time);
        setTimeout(function(){$(charFactRH).css({"transform": "translate(50%, 0)", "opacity": 1})}, time);
      } else {
        $(charFactRH).css({"transform": "scale(0.1, 0.1)", "opacity": 0});
        $(charFactLH).css({"transform": "scale(0.1, 0.1)", "opacity": 0});
        setTimeout(updateCardH, time);
        setTimeout(function(){$(charFactLH).css({"transform": "translate(-50%, 0) scale(1, 1)", "opacity": 1})}, time);
      }
      factOnRightH = !factOnRightH;
    } else {
      $(charFactLH).css({ "transform": "scale(0.1, 0.1)", "opacity": 0});
      updateCardH();
      setTimeout(function(){$(charFactLH).css({ "transform": "scale(1, 1)", "opacity": 1})}, time);
    }
    };
        renderCardH(i, 2000);
    };
humanRequest.send();

//////// AUDIOs
const shuffleFinanceAudio = new Tone.Player({
  url: 'sounds/VillianRandomizer.mp3',
  loop: false
}).toDestination();

const shuffleHumanAudio = new Tone.Player({
  url: 'sounds/HeroRandomizer.mp3',
  loop: false
}).toDestination();

const financeFactAudio = new Tone.Player({
  url: 'sounds/VillianClick.mp3',
  loop: false
}).toDestination();

const humanFactAudio = new Tone.Player({
  url: 'sounds/HeroClick.mp3',
  loop: false
}).toDestination();

//////// BACKGROUND AUDIO
var controlMain = $(".controlMain");
var worldSwitch = $(".stems");
var toHuman = $("#human");
var toFinance = $("#finance");

function makeChannel(name, url, pan=0) {
  const channel = new Tone.Channel({
    pan
  }).toDestination();
  const player = new Tone.Player({
    url: `sounds/${url}.mp3`,
    loop: true
  }).sync().start(0);
  player.connect(channel);
  // Play Finance audio + Mute Human audio as default
  if (name == 'finance') { channel.mute = false;} 
  else { channel.mute = true;}
  // When triggered, channel switches
  $(worldSwitch).on('click', function(){
    channel.mute = !channel.mute;
  });
};
// Create 2 Stems/Channels
makeChannel('finance', 'VillianLoop');
makeChannel('human', 'HeroLoop');


////////// Controller
var financeElements = $("#financeCard, #financeHeader, .financeBtn");
var humanElements = $("#humanCard, #humanHeader, .humanBtn, .patternH");

// Play/Pause Button
function controlHandler() {
  if($(controlMain).hasClass("paused")) {
    if (!Tone) {Tone.start();}
    $(controlMain).removeClass("paused");
    $(controlMain).addClass("playing");
    $("#controlF").attr("src","images/Pause_btn.svg");
    $("#controlH").attr("src","images/Pause_btn_H.svg");
    Tone.Transport.start();
  } else {
    $(controlMain).removeClass("playing");
    $(controlMain).addClass("paused");
    $("#controlF").attr("src","images/Play_btn.svg");
    $("#controlH").attr("src","images/Play_btn_H.svg");
    Tone.Transport.stop();
  }
};
// World switches
$(toHuman).on('click', function(){
  $(toHuman).removeClass("muted");
  $(toHuman).addClass("unmuted");
  $(toFinance).removeClass("unmuted");
  $(toFinance).addClass("muted");
  $(financeElements).css("display", "none");
  $(humanElements).css("display", "block");
  $('body').removeClass("financeBody");
  $('body').addClass("humanBody");
});
$(toFinance).on('click', function(){
  $(toFinance).removeClass("muted");
  $(toFinance).addClass("unmuted");
  $(toHuman).removeClass("unmuted");
  $(toHuman).addClass("muted");
  $(humanElements).css("display", "none");
  $(financeElements).css("display", "block");
  $('body').removeClass("humanBody");
  $('body').addClass("financeBody");
});