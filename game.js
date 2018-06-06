let currentFn;

function insertDivWithChildren(children)
{
    var game = document.getElementById('game');

    var div = document.createElement('div');
    div.className += 'gameSection';
    for (child of children) {
        div.appendChild(child);
    }

    if (game.hasChildNodes()) {
        game.insertBefore(div, game.firstChild);
    } else {
        game.appendChild(div);
    }
}

function disableButtons(buttons)
{
    for (button of buttons) {
        button.disabled = true;
    }
}

function template(buttons)
{
    var buttonNodes = [];

    const actions = {
        changeState: (newState, ...rest) => {
            disableButtons(buttonNodes);
            newState.apply(this, rest);
        },
    };

    for (button of buttons) {
        var b = document.createElement('input');
        b.type = 'button';
        b.value = button.value;
        b.gamecounter = 0;
        buttonNodes.push(b);
        b.onclick = function () {
            var myAction = button.actions[this.gamecounter];
            myAction.call(this, actions);
        };
    }

    insertDivWithChildren([b]);
}

function stage0()
{
    template([
        {
            value: "A Button",
            actions: [
                function () {
                    this.value = "Am clicked",
                    this.gamecounter++;
                },
                function () {
                    this.value = "I hunger",
                    this.gamecounter++;
                },
                function ({changeState}) {
                    changeState(stage1, (msg) => {this.value = msg;});
                },

            ],
        },
    ]);
}

function stage1(messageWriterFn)
{
    template([
        {
            value: "Another Button",
            actions: [
                function () {
                    messageWriterFn("We are all connected");
                    this.gamecounter++;
                },
                function () {
                    messageWriterFn("I am still hungry");
                    this.gamecounter++;
                },
                function () {
                    this.value = "Feed";
                    messageWriterFn("Will you feed me now?");
                    this.gamecounter++;
                },
                function ({changeState}) {
                    this.value = "Here, eat these: (((())))";
                    messageWriterFn("Thank.");
                    changeState(stage2);
                },
            ],
        },
    ]);
}

function stage2()
{
    template([
        {
            value: "Hi Again",
            actions: [

            ],
        },
    ]);
}

currentFn = stage0;

function game()
{
    currentFn();
}
