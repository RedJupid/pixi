(function(){
    let Land = window.Land = function(){

    }

    Land.prototype.render = function(){
        let land = new PIXI.Sprite(
            PIXI.Loader.shared.resources["land"].texture
        );
        app.stage.addChild(land);
    }

})();