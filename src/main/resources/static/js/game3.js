(function(){
    let Game = window.Game = function(){
        this.resUrl = "./res.json";
        let that = this;

        // PIXI.Loader.shared
        //     .add([
        //         "img/land.jpg"
        //     ])
        //     .load(setup);
        //
        // function setup() {
        //     window.app = new PIXI.Application({width: 600, height: 520});
        //     let land = new PIXI.Sprite(
        //         PIXI.Loader.shared.resources["img/land.jpg"].texture
        //     );
        //     document.body.appendChild(app.view);
        //     app.stage.addChild(land);
        // }

        // PIXI.loader
        //     .add("./res.json")
        //     .load(setup);
        // function setup() {
        //     console.log("加载完成");
        //     let id = PIXI.loader.resources["./res.json"].textures;
        //     let sprite = new PIXI.Sprite(id["img/land.jpg"]);
        //     window.app = new PIXI.Application({width: 256, height: 256});
        //     document.body.appendChild(app.view);
        //     app.stage.addChild(sprite);
        // }
        this.load(function () {

        });

    }


    Game.prototype.start = function(){
        window.app = new PIXI.Application({width: 256, height: 256});
        let land = new PIXI.Sprite(
            PIXI.Loader.shared.resources["img/land.jpg"].texture
        );
        app.stage.addChild(land);
    }


    Game.prototype.load = function (callback) {
        this.res = {};

        //发出请求，请求JSON文件
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                let resObj = JSON.parse(xhr.responseText);
                //遍历数组
                console.log(resObj.images);
                PIXI.Loader.shared
                    .add(
                        ["img/land.jpg"]
                    )
                    .on("progress", loadProgressHandler)
                    .load(setup);

                function loadProgressHandler(loader, resource) {

                    //Display the file `url` currently being loaded
                    console.log("loading: " + resource.url);

                    //Display the percentage of files currently loaded
                    console.log("progress: " + loader.progress + "%");

                    //If you gave your files names as the first argument
                    //of the `add` method, you can access them like this
                    //console.log("loading: " + resource.name);
                }

                function setup() {
                    console.log("All files loaded");
                    window.app = new PIXI.Application({width: 600, height: 520});
                    document.body.appendChild(app.view);
                    let land = new PIXI.Sprite(
                        PIXI.Loader.shared.resources["img/land.jpg"].texture
                    );
                    app.stage.addChild(land);
                    callback();

                }
            }
        }
        xhr.open("get",this.resUrl,true);
        xhr.send(null);

    }
})();


