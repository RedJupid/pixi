(function () {
    let Connect = window.Connect = function(){
        this.url = "ws://localhost:8899/ws";
        this.open(this.url);
    }

    Connect.prototype.open = function (url) {
        if (window.WebSocket){
            this.socket = new WebSocket(url);
            this.socket.onmessage = function(event){
                console.log(event.data);
            }
            this.socket.onopen = function(event){
                console.log("已连接");
            }
            this.socket.onclose = function(event){
                console.log("已关闭");
            }
        } else{
            alert("浏览器不支持WebSocket");
        }

    }
})();