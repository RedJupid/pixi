(function () {
    let Wall = window.Wall = function (x,y) {
        this.wall = new PIXI.Sprite(
            PIXI.Loader.shared.resources["wall"].texture
        );
        this.wall.x = x*40+40;
        this.wall.y = y*40+40-10;
        this.wall.xx = this.wall.x+20;
        this.wall.yy = this.wall.y+10;
        app.stage.addChild(this.wall);
    }

})();