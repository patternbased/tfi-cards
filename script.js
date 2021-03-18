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
        renderCard(i, 2000);
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
      shuffleVillanAudio.start();
      $(shuffleGIF).css("display","block");
      setTimeout(function(){$(shuffleGIF).css("display","none")}, 2000);
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

    function getRandomWithOneExclusion(lengthOfArray,indexToExclude){
        var rand = null;  //an integer
          while(rand === null || rand === indexToExclude){
             rand = Math.round(Math.random() * (lengthOfArray - 1));
          }
        return rand;
      }

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

characterRequest.send();

//////// SHUFFLE AUDIO
const shuffleVillanAudio = new Tone.Player({
  url: 'sounds/VillianRandomizer.mp3',
  loop: false
}).toDestination();

//////// BACKGROUNF AUDIO

var controlMain = $(".controlMain");
var villanSide = true;

function makeChannel(name, url, pan=0) {
  const channel = new Tone.Channel({
    pan
  }).toDestination();
  const player = new Tone.Player({
    url: `sounds/${url}.mp3`,
    loop: true
  }).sync().start(0);
  player.connect(channel);

  if (name == 'villan') {channel.mute = false;}
  else {channel.mute = true;}

  const thisMuteButton = document.getElementById(name);
  thisMuteButton.addEventListener('click', function(){
    const checkMuted = thisMuteButton.classList.contains("muted") ? true : false;
    if (checkMuted) {
      channel.mute = false;
    } else {
      channel.mute = true;
    }
  });
}

makeChannel('villan', 'VillianLoop');
makeChannel('hero', 'HeroLoop');

////////// Controller
var stems = $('.stems');

// Play/Pause Button
function controlHandler() {
  if($(controlMain).hasClass("paused")) {
    if (!Tone) {Tone.start();}
    $(controlMain).removeClass("paused");
    $(controlMain).addClass("playing");
    $('#hero').removeClass("unmuted");
    $('#hero').addClass("muted");
    $('#villan').removeClass("muted");
    $('#villan').addClass("unmuted");
    Tone.Transport.start();
  } else {
    $(controlMain).removeClass("playing");
    $(controlMain).addClass("paused");
    stems.removeClass("unmuted");
    stems.addClass("muted");
    Tone.Transport.stop();
  }
};

// Stem buttons
stems.on('click', function() {
  if($(this).hasClass("unmuted")) {
    $(this).removeClass("unmuted");
    $(this).addClass("muted");
  } else {
    $(this).removeClass("muted");
    $(this).addClass("unmuted");
  }
});