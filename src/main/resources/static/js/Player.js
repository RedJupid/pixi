(function () {
    let Player = window.Player = function () {
        this.vx = 0;
        this.vy = 0;
        this.textures = this.getTextures();
        //创建动画精灵
        this.player = new PIXI.AnimatedSprite(this.textures[3]);
        //设置动画精灵的速度
        this.player.animationSpeed=0.1;

        // this.player = new PIXI.Sprite(
        //     PIXI.Loader.shared.resources["role1_1_1"].texture
        // );
        this.player.xx = 23;
        this.player.yy = 58;
        app.stage.addChild(this.player);
    };

    Player.prototype.getTextures = function(){
        let t = new Array(4);
        for (let i=0;i<4;i++){
            t[i] = new Array(4);
        }
        for (let i=0;i<4;i++){
            for(let j=0;j<4;j++){
                t[i][j] = PIXI.Loader.shared.resources["role1_"+(i+1)+"_"+(j+1)].texture;
            }
        }
        return t;
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
            this.player.textures = this.textures[0];
            this.player.gotoAndPlay(1);
        };
        left.release = () => {
            //If the left arrow has been released, and the right arrow isn't down,
            //and the cat isn't moving vertically:
            //Stop the cat
            if (!right.isDown && this.vy === 0) {
                this.vx = 0;
            }
            this.player.gotoAndStop(0);
        };
        //Up
        up.press = () => {
            this.vy = -3;
            this.vx = 0;
            this.player.textures = this.textures[1];
            this.player.gotoAndPlay(1);
        };
        up.release = () => {
            if (!down.isDown && this.vx === 0) {
                this.vy = 0;
            }
            this.player.gotoAndStop(0);
        };

        //Right
        right.press = () => {
            this.vx = 3;
            this.vy = 0;
            this.player.textures = this.textures[2];
            this.player.gotoAndPlay(1);
        };
        right.release = () => {
            if (!left.isDown && this.vy === 0) {
                this.vx = 0;
            }
            this.player.gotoAndStop(0);
        };

        //Down
        down.press = () => {
            this.vy = 3;
            this.vx = 0;
            this.player.textures = this.textures[3];
            this.player.gotoAndPlay(1);
        };
        down.release = () => {
            if (!up.isDown && this.vx === 0) {
                this.vy = 0;
            }
            this.player.gotoAndStop(0);
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