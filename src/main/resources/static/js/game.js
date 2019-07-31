(function(){
    let Game = window.Game = function(){

    }

    Game.prototype.init = function(){
        console.log("init");
        window.app = new PIXI.Application({width: 256, height: 256});
        let land = new PIXI.Sprite(
            PIXI.Loader.shared.resources["img/land.jpg"].texture
        );
        app.stage.addChild(land);
    }

    Game.prototype.s

    Game.prototype.load = function () {
        console.log(this);
        PIXI.Loader.shared
            .add([
                "img/land.jpg",
                "img/shadow.png",
                "img/bomb1.png",
                "img/role1_1_1.png"
            ])
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

