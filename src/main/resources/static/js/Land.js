(function(){
    let Land = window.Land = function(){

        this.land = new PIXI.Sprite(
            PIXI.Loader.shared.resources["land"].texture
        );
        this.land.x = 40;
        this.land.y = 40;
        this.land.xx = 0;
        this.land.yy = 0;
        app.stage.addChild(this.land);
    }


})();