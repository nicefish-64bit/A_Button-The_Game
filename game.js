function game()
{
    var g = document.getElementById('game');
    var b = document.createElement('input');
    b.type = 'button';
    b.value = "A Button";
    b.onclick = function () {
        this.value = "Am clicked";
    };
    g.appendChild(b);
}
