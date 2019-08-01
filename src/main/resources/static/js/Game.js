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
        console.log("All files loaded");
        window.app = new PIXI.Application({width: 600, height: 520});
        document.body.appendChild(app.view);
        // let land = new PIXI.Sprite(
        //     PIXI.Loader.shared.resources["land"].texture
        // );
        // app.stage.addChild(land);
        let land = new Land();
        land.render();
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
                    // window.app = new PIXI.Application({width: 600, height: 520});
                    // document.body.appendChild(app.view);
                    // let land = new PIXI.Sprite(
                    //     PIXI.Loader.shared.resources["land"].texture
                    // );
                    // app.stage.addChild(land);
                    callback();

                }
            }
        }
        xhr.open("get",this.resUrl,true);
        xhr.send(null);
    }

})();