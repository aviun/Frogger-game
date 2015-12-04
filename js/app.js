var TILE_HEIGHT = 83;
var TILE_WIDTH = 101;
var COL_NUMBER = 5;
var ROW_NUMBER = 7;

Object.prototype.renderCharacter = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy = function () {
    this.sprite = 'images/enemy-bug-mini.png';
    this.x = 0;
    this.y = this.findRandomY();
    this.finalXLocation = ROW_NUMBER * TILE_WIDTH;
    this.speed = this.findRandomSpeed();
};

Enemy.prototype.findRandomY = function () {
    var rowsForEnemies = ROW_NUMBER - 3;
    var random = Math.floor((Math.random() * rowsForEnemies) + 2);
    return (random * TILE_HEIGHT) - (0.1 * TILE_HEIGHT);
};

Enemy.prototype.findRandomSpeed = function () {
    return Math.floor((Math.random() * 400) + 100);
};

Enemy.prototype.update = function (dt) {
    if (this.x >= this.finalXLocation) {
        this.reset();
    }
    else {
        this.x += this.speed * dt;
    }

    this.checkCollisions();
};

Enemy.prototype.checkCollisions = function () {
    if (player.y === this.y) {
        if (player.x + 30 > this.x && player.x - 30 < this.x) {

            if (player.lives > 1) {
                alert("Oh no, you lost 1 life!");
                setTimeout(function () {
                    player.lives--;
                }, 50);
            }
            else {
                player.resetLives();
                (alert("GAME OVER!"));
            }

            player.reset();
        }
    }
};

Enemy.prototype.reset = function () {
    this.x = -80;
    this.y = this.findRandomY();
    this.speed = this.findRandomSpeed();
};

Enemy.prototype.render = function () {
    this.renderCharacter();
};


var Player = function () {
    this.sprite = 'images/char-cat-girl-mini.png';
    this.startingXPosition = (COL_NUMBER - 1) * TILE_WIDTH / 2;
    this.startingYPosition = (ROW_NUMBER - 1) * TILE_HEIGHT - 0.1 * TILE_HEIGHT;

    this.x = this.startingXPosition;
    this.y = this.startingYPosition;

    this.lives = 5;
    this.victories = 0;
    this.bestResult = 0;

    this.waterLineY = TILE_HEIGHT;
};

Player.prototype.update = function () {

    if (this.y < this.waterLineY) {

        alert("Victory!");
        player.victories++;
        updateBestResult();

        return player.reset();
    }
};

Player.prototype.reset = function () {
    this.x = this.startingXPosition;
    this.y = this.startingYPosition;
};

Player.prototype.resetLives = function () {
    this.lives = 5;
    this.victories = 0;
};

Player.prototype.render = function () {
    this.renderCharacter();
    this.setFonts();
    renderLives();
    renderVictories();
    renderBestResult();
};

var renderLives = function () {
    ctx.drawImage(Resources.get('images/Heart.png'), 0, -30);
    var livesString = player.lives.toString();
    ctx.fillText(livesString, TILE_WIDTH / 2, TILE_HEIGHT);
    ctx.strokeText(livesString, TILE_WIDTH / 2, TILE_HEIGHT);
};
var renderVictories = function () {
    ctx.drawImage(Resources.get('images/Star.png'), TILE_WIDTH * (COL_NUMBER - 1), -40);
    var victoriesString = player.victories.toString();
    ctx.fillText(victoriesString, TILE_WIDTH * (COL_NUMBER - 0.5), TILE_HEIGHT);
    ctx.strokeText(victoriesString, TILE_WIDTH * (COL_NUMBER - 0.5), TILE_HEIGHT);
};
var renderBestResult = function () {
    ctx.drawImage(Resources.get('images/emptyBanner.png'), 0, (ROW_NUMBER + 1.10) * TILE_HEIGHT);
    var resultsString = player.bestResult.toString();

    ctx.fillText("Best Result:", 1.4 * TILE_WIDTH, (ROW_NUMBER + 1.8) * TILE_HEIGHT);
    ctx.strokeText("Best Result:", 1.4 * TILE_WIDTH, (ROW_NUMBER + 1.8) * TILE_HEIGHT);

    ctx.fillText(resultsString, 3.5 * TILE_WIDTH, (ROW_NUMBER + 1.8) * TILE_HEIGHT);
    ctx.strokeText(resultsString, 3.5 * TILE_WIDTH, (ROW_NUMBER + 1.8) * TILE_HEIGHT);

};

var updateBestResult = function () {
    if (player.victories > player.bestResult) {
        player.bestResult = player.victories;
    }
};

Player.prototype.handleInput = function (key) {
    if (key === 'left') {
        if (this.x > 0) {
            this.moveOneTileLeft();
        }
    }

    if (key === 'right') {
        if (this.x <= (COL_NUMBER - 2) * TILE_WIDTH) {
            this.moveOneTileRight();
        }
    }

    if (key === 'up') {
        if (this.y > this.waterLineY) {
            this.moveOneTileUp();
        }
    }

    if (key === 'down') {
        if (this.y < this.startingYPosition) {
            this.moveOneTileDown();
        }
    }
};

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

Player.prototype.moveOneTileRight = function () {
    this.x += TILE_WIDTH;
};
Player.prototype.moveOneTileLeft = function () {
    this.x -= TILE_WIDTH;

};
Player.prototype.moveOneTileUp = function () {
    this.y -= TILE_HEIGHT;
};
Player.prototype.moveOneTileDown = function () {
    this.y += TILE_HEIGHT;
};


var player = new Player();
var allEnemies = [];
for (var i = 0; i < (ROW_NUMBER + 0.5 * ROW_NUMBER); i++) {
    allEnemies.push(new Enemy());
}

Object.prototype.setFonts = function () {
    ctx.font = "50px Comic Sans MS";
    ctx.fillStyle = "#FFF9CC";
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
};

