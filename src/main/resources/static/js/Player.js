(function () {
    let Player = window.Player = function () {
        this.vx = 0;
        this.vy = 0;
        this.player = new PIXI.Sprite(
            PIXI.Loader.shared.resources["role1_1_1"].texture
        );
        this.player.xx = 23;
        this.player.yy = 58;
        app.stage.addChild(this.player);
    };
    Player.prototype.getp = function(){
        console.log(this.player.position.x+","+this.player.position.y);
    };

    Player.prototype.addListen = function () {
        let left = keyboard(37),
            up = keyboard(38),
            right = keyboard(39),
            down = keyboard(40);
        left.press = ()=>{
            this.vx = -3;
            this.vy = 0;
        };
        left.release = () => {
            //If the left arrow has been released, and the right arrow isn't down,
            //and the cat isn't moving vertically:
            //Stop the cat
            if (!right.isDown && this.vy === 0) {
                this.vx = 0;
            }
        };
        //Up
        up.press = () => {
            this.vy = -3;
            this.vx = 0;
        };
        up.release = () => {
            if (!down.isDown && this.vx === 0) {
                this.vy = 0;
            }
        };

        //Right
        right.press = () => {
            this.vx = 3;
            this.vy = 0;
        };
        right.release = () => {
            if (!left.isDown && this.vy === 0) {
                this.vx = 0;
            }
        };

        //Down
        down.press = () => {
            this.vy = 3;
            this.vx = 0;
        };
        down.release = () => {
            if (!up.isDown && this.vx === 0) {
                this.vy = 0;
            }
        };


        function keyboard(keyCode) {
            let key = {};
            key.code = keyCode;
            key.isDown = false;
            key.isUp = true;
            key.press = undefined;
            key.release = undefined;
            //The `downHandler`
            key.downHandler = event => {
                if (event.keyCode === key.code) {
                    if (key.isUp && key.press) key.press();
                    key.isDown = true;
                    key.isUp = false;
                }
                event.preventDefault();
            };

            //The `upHandler`
            key.upHandler = event => {
                if (event.keyCode === key.code) {
                    if (key.isDown && key.release) key.release();
                    key.isDown = false;
                    key.isUp = true;
                }
                event.preventDefault();
            };

            //Attach event listeners
            window.addEventListener(
                "keydown", key.downHandler.bind(key), false
            );
            window.addEventListener(
                "keyup", key.upHandler.bind(key), false
            );
            return key;
        }
    }



})();