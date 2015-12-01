var tileHeight = 83;

var tileWidth = 101;

var Enemy = function () {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = this.findRandomY();
    this.finalXLocation = 485;
    this.speed = this.findRandomSpeed();


};
Enemy.prototype.findRandomY = function () {
    var random = Math.floor((Math.random() * 4) + 1);
    if (random === 1) return 322;
    if (random === 2) return (322 - tileHeight);
    if (random === 3) return (322 - 2 * tileHeight);
    else return (322 - 3 * tileHeight);
};

Enemy.prototype.findRandomSpeed = function () {
    return Math.floor((Math.random() * 200) + 100);
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
            setTimeout(function () {
                alert("Oh no, you lost!")
            }, 10);
            setTimeout(function () {
                player.reset()
            }, 50);
        }
    }
};

Enemy.prototype.reset = function () {
    this.x = -80;
    this.y = this.findRandomY();
    this.speed = this.findRandomSpeed();
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function () {
    this.sprite = 'images/char-cat-girl.png';

    this.maxY = 405;
    this.maxX = 400;

    this.x = 200;
    this.y = this.maxY;

    this.waterLineY = 0;
};


Player.prototype.update = function () {

    if (this.y < this.waterLineY) {
        setTimeout(function () {
            alert("Victory!");
            return player.reset();
        }, 10);
    }
};

Player.prototype.reset = function () {
    this.x = 200;
    this.y = this.maxY;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    if (key === 'left') {
        if (this.x > 0) {
            this.moveOneTileLeft();
        }
    }

    if (key === 'right') {
        if (this.x <= this.maxX) {
            this.moveOneTileRight();
        }
    }

    if (key === 'up') {
        if (this.y > this.waterLineY) {
            this.moveOneTileUp();
        }
    }

    if (key === 'down') {
        if (this.y < this.maxY) {
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
    this.x += tileWidth;
};
Player.prototype.moveOneTileLeft = function () {
    this.x -= tileWidth;

};
Player.prototype.moveOneTileUp = function () {
    this.y -= tileHeight;
};
Player.prototype.moveOneTileDown = function () {
    this.y += tileHeight;
};


var player = new Player();
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];