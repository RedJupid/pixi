(function () {
    let Wall = window.Wall = function (x,y) {
        this.wall = new PIXI.Sprite(
            PIXI.Loader.shared.resources["wall"].texture
        );
        this.wall.x = x;
        this.wall.y = y;
        this.wall.xx = x;
        this.wall.yy = y;
        app.stage.addChild(this.wall);
    }

})();