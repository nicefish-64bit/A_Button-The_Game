let currentFn;

function insertDivWithChildren(children)
{
    var game = document.getElementById('game');

    var div = document.createElement('div');
    for (child of children) {
        div.appendChild(child);
    }

    if (game.hasChildNodes()) {
        game.insertBefore(div, game.firstChild);
    } else {
        game.appendChild(div);
    }
}

function stage0()
{
    var b = document.createElement('input');
    b.type = 'button';
    b.value = "A Button";
    b.derpstate = 1;
    b.onclick = function () {
        switch (this.derpstate) {
        case 0:
            this.value = "Am clicked";
            this.derpstate++;
            break;
        case 1:
            this.value = "Feed me";
            this.derpstate++;
            break;
        case 2:
            this.value = "Please?";
            this.derpstate++;
            stage1((msg) => {this.value = msg;});
            break;
        default:
        }
    };

    insertDivWithChildren([b]);
}

function stage1(messageWriterFn)
{
    var b = document.createElement('input');
    b.type = 'button';
    b.value = "Hi Again";
    b.onclick = function () {
        messageWriterFn("We are all connected");
    };

    insertDivWithChildren([b]);
}

currentFn = stage0;

function game()
{
    currentFn();
}
