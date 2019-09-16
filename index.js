$(document).keydown
(
  function()
  {
    $(document).off("keydown");
    levelStart(1);
  }
)

var array = [];
var numOfClicks = 0;
var level = 1;

function levelStart(num)
{
  $("h1").text("Level " + num);
  for (let i = 1; i <= num; i++)
  {
    array.push(randomNum());
    setTimeout(()=> {animateButton(whichButton(array[i - 1]));}, 1000 * i);
  }

  $("button").click(
  function(e)
  {
    if (e.target.classList[1] === "box")
    {
      animateButton(e.target.classList[0]);
      if (whichNum(e.target.classList[0]) !== array[numOfClicks])
      {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        numOfClicks = 0;
        array.length = 0;
        level = 1;
        $("button").off("click");

        $("h1").text("Game Over, Press A Key to Restart");
        $("body").addClass("red-background");
        setTimeout(()=>{$("body").removeClass("red-background");}, 100);


        $(document).keydown
        (
          function()
          {
            $(document).off("keydown");
            levelStart(1);
          }
        )
      }
      else
      {
        var audio = new Audio("sounds/" + e.target.classList[0] + ".mp3");
        audio.play();

        numOfClicks++;

        if (numOfClicks === array.length)
        {
          numOfClicks = 0;
          array.length = 0;
          $("button").off("click");
          setTimeout(function(){levelStart(++level);}, 500);
        }
        else
        {
        }
      }
    }
  });
}

function randomNum()
{
  var num = Math.floor(Math.random() * 4) + 1;
  return (num);
}

function animateButton(name)
{
  $("." + name).animate({opacity:0.5});
  $("." + name).animate({opacity:1});
}

function whichButton(num)
{
  switch (num)
  {
    case 1:
      return "green";
    case 2:
      return "red";
    case 3:
        return "blue";
    case 4:
        return "yellow";
  }
}

function whichNum(className)
{
  switch (className)
  {
    case "green":
      return 1;
    case "red":
      return 2;
    case "blue":
      return 3;
    case "yellow":
      return 4;
  }
}
