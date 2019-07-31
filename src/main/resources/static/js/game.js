(function(){
    let Game = window.Game = function(){
        this.resUrl = "./res.json";
    }

    Game.prototype.init = function(){
        console.log("init");
        window.app = new PIXI.Application({width: 256, height: 256});
        let land = new PIXI.Sprite(
            PIXI.Loader.shared.resources["img/land.jpg"].texture
        );
        app.stage.addChild(land);
    }


    Game.prototype.load = function () {
        this.res = {};
        let self = this;
        let alreadyDoneNumber = 0;

        //发出请求，请求JSON文件
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                let resObj = JSON.parse(xhr.responseText);
                //遍历数组
                PIXI.Loader.shared
                    .add(resObj.images)
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
                }
            }
        }
        xhr.open("get",this.resUrl,true);
        xhr.send(null);

    }
})();




//Create a Pixi Application
// let app = new PIXI.Application({width: 256, height: 256});

//Add the canvas that Pixi automatically created for you to the HTML document
// document.body.appendChild(app.view);
//
// PIXI.Loader.shared
//     .add([
//         "img/land.jpg"
//     ])
//     .load(setup);
//
// function setup() {
//     let land = new PIXI.Sprite(
//         PIXI.Loader.shared.resources["img/land.jpg"].texture
//     );
//     app.stage.addChild(land);
// }

