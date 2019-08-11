(function () {
    let Game = window.Game = function () {
        this.resUrl = "./res.json";//资源路径
        let that = this;
        // this.init();
        this.load(function () {
            that.start();
        });
    };
    Game.prototype.start = function(){
        window.app = new PIXI.Application({width: 640, height: 560});
        document.body.appendChild(app.view);
        let land = new Land();
        let player = new Player();
        player.addListen();
        let wall = new Wall(4,8);
        app.ticker.add(delta => gameLoop(delta));
        function gameLoop(delta){
            app.stage.children.sort(function(a,b) {
                if (a.yy > b.yy) return 1;
                if (a.yy < b.yy) return -1;
                if (a.xx> b.xx) return 1;
                if (a.xx < b.xx) return -1;
                return 0;
            });

            //Move the cat 1 pixel
            // player.player.x+=1;
            // player.render();
            let directions = player.directions;
            if (directions.length>0){
                let dic = directions[directions.length-1];
                if (dic==0){
                    player.vx=-3;
                    player.vy=0;
                    player.player.textures = player.textures[0];
                }else if (dic == 1){
                    player.vx = 0;
                    player.vy = -3;
                    player.player.textures = player.textures[1];
                }else if (dic == 2){
                    player.vx = 3;
                    player.vy = 0;
                    player.player.textures = player.textures[2];
                }else if (dic ==3){
                    player.vx = 0;
                    player.vy = 3;
                    player.player.textures = player.textures[3];
                }
                if (player.needUpdateStatus()){
                    player.player.gotoAndPlay(1);
                }
            }else{
                player.vx = 0;
                player.vy = 0;
                if (player.needUpdateStatus()){
                    player.player.gotoAndStop(0);
                }

            }
            player.player.x+=player.vx;
            player.player.xx +=player.vx;
            player.player.y+=player.vy;
            player.player.yy +=player.vy;
        }
    };


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