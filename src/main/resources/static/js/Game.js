(function () {
    let Game = window.Game = function () {
        this.resUrl = "./res.json";//资源路径
        let that = this;
        // this.init();
        this.load(function () {
            that.start();
        });
    }
    Game.prototype.start = function(){
        window.app = new PIXI.Application({width: 600, height: 520});
        document.body.appendChild(app.view);
        let land = new Land();
        land.render();
        let player = new Player();
        player.render();
        app.ticker.add(delta => gameLoop(delta));
        function gameLoop(delta){

            //Move the cat 1 pixel
            // player.player.x+=1;
            // player.render();
            player.player.x+=player.vx;
            player.player.y+=player.vy;
        }
    }


    Game.prototype.load = function(callback){
        //发出请求，请求JSON文件
        let that = this;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                let resObj = JSON.parse(xhr.responseText);
                console.log(resObj.images);
                PIXI.Loader.shared
                    .add(resObj.images)
                    .on("progress", loadProgressHandler)
                    .load(setup);
                function loadProgressHandler(loader, resource) {
                    console.log("loading: " + resource.url);
                    console.log("progress: " + loader.progress + "%");
                }
                function setup() {
                    console.log("All files loaded");
                    callback();
                }
            }
        }
        xhr.open("get",this.resUrl,true);
        xhr.send(null);
    }

})();