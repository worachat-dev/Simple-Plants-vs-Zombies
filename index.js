document.addEventListener("DOMContentLoaded", () => {
  var zombies = [
    {
      health: 60,
      type: 1,
      x: 1050,
      y: 0,
      animation: 0,
    },
    {
      health: 80,
      type: 3,
      x: 950,
      y: 1,
      animation: 0,
    },
    {
      health: 90,
      type: 4,
      x: 920,
      y: 2,
      animation: 0,
    },
    {
      health: 70,
      type: 2,
      x: 1080,
      y: 3,
      animation: 0,
    },
    {
      health: 95,
      type: 4,
      x: 1020,
      y: 4,
      animation: 0,
    },
  ];
  var plantAnimation = 0;
  var plants = [
    {
      x: 0,
      y: 0,
    },
    {
      x: 1,
      y: 1,
    },
    {
      x: 2,
      y: 2,
    },
    {
      x: 1,
      y: 3,
    },
    {
      x: 0,
      y: 4,
    },
  ];

  var bullets = [];
  var counter = 0;
  function gameLoop() {
    counter++;
    if (counter % 5 == 0) {
      moveZombies();
      drawZombies();
    }
  }
  setInterval(gameLoop, 30);
  setInterval(fireBullets, 3000);
  setInterval(() => {
    moveBullets();
    drawBullets();
    drawPlants();
  }, 10);
  setInterval(() => {
    if (plantAnimation < 7) {
      plantAnimation += 1;
    } else if (plantAnimation == 7) {
      plantAnimation = 0;
    }
  }, 120);

  function playSound(path) {
    var audio = new Audio(path);
    audio.play();
  }

  function fireBullets() {
    for (var i = 0; i < plants.length; i++) {
      if (plants[i].y == zombies[i].y && zombies[i].x < 950) {
        bullets.push({
          x: plants[i].x * 80 + 300,
          y: plants[i].y,
        });
      }
    }
    playSound("puff.mp3");
  }

  function moveZombies() {
    for (var i = 0; i < zombies.length; i++) {
      if (zombies[i].x > 150 && zombies[i].health > 0) {
        zombies[i].x--;
        if (zombies[i].animation > 4) {
          zombies[i].animation = 0;
        } else {
          zombies[i].animation++;
        }
      } else {
        zombies[i].x = 1000;
      }
    }
  }

  function moveBullets() {
    if (bullets.length > 0) {
      for (var i = 0; i < bullets.length; i++) {
        if (bullets[i].x < 1000) {
          bullets[i].x += 1;
          for (var j = zombies.length - 1; j >= 0; j--) {
            if (
              bullets[i].x > zombies[j].x - 3 &&
              bullets[i].y == zombies[j].y &&
              zombies[j].health >= 10
            ) {
              playSound("puff.mp3");
              zombies[j].health -= 10;

              if (zombies[j].health <= 0) {
                playSound("die.mp3");
                zombies[j].x = 1000;
                zombies[j].health = zombies[j].type * 20;
              }

              bullets[i] = bullets[bullets.length - 1];
              bullets.pop();
              break;
            }
          }
        } else {
          bullets[i] = bullets[bullets.length - 1];
          bullets.pop();
        }
      }
    }
  }

  function drawBullets() {
    var html = "";
    for (var i = 0; i < bullets.length; i++) {
      html += `<div class="bullet" style='top: ${
        bullets[i].y * 100 + 85
      }px; left: ${bullets[i].x}px;'></div>`;
    }
    document.getElementById("bullets").innerHTML = html;
  }

  function drawZombies() {
    var html = "";
    for (var i = 0; i < zombies.length; i++) {
      if (zombies[i].health >= 10 && zombies[i].x < 950) {
        html +=
          "<div class='zombie" +
          zombies[i].type +
          "' style='top:" +
          (zombies[i].y * 100 + 20) +
          "px; left:" +
          zombies[i].x +
          "px; background-position-x: -" +
          zombies[i].animation * 128 +
          "px;'></div>";
      }
    }

    document.getElementById("zombies").innerHTML = html;
  }

  function drawPlants() {
    var html = "";
    for (var i = 0; i < plants.length; i++) {
      html += `<div class="plant1" style="top: ${
        plants[i].y * 100 + 85
      }px; left: ${plants[i].x * 80 + 265}; background-position-x: -${
        plantAnimation * 60 - 3
      }px;"></div>`;
    }

    document.getElementById("plants").innerHTML = html;
  }
  drawZombies();
  drawPlants();
});
