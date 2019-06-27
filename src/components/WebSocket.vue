<template>
  <div>
    <span>readyState表示连接有四种状态：</span>
    <ul>
      <li>CONNECTING (0)：表示还没建立连接；</li>
      <li>OPEN (1)： 已经建立连接，可以进行通讯；</li>
      <li>CLOSING (2)：通过关闭握手，正在关闭连接；</li>
      <li>CLOSED (3)：连接已经关闭或无法打开；</li>
    </ul>
    <input type="text" v-model="text" name="message" value="Netty 最佳实践"/>
    <br>
    <button @click="onSend()">发送消息</button>
    <br>
    <button @click="close()">关闭websocket连接</button>
    <br>
    <div>{{data}}</div>
  </div>
</template>


<!-- readyState表示连接有四种状态：
CONNECTING (0)：表示还没建立连接；
OPEN (1)： 已经建立连接，可以进行通讯；
CLOSING (2)：通过关闭握手，正在关闭连接；
CLOSED (3)：连接已经关闭或无法打开； -->

<script>
  export default {
    name: "WebSocket",
    data() {
      return {
        text: '',
        data: '',
        socket: null
      }
    },
    created() {
      this.initWebSocket();
    },
    destroyed: function () {
      this.close();
    },
    methods: {
      initWebSocket() {
        this.socket = new WebSocket("ws://192.168.1.104:8080/websocket");
        this.socket.onopen = this.onOpen;
        this.socket.onerror = this.onError;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.close;
      },
      onOpen() {
        this.data = "WebSocket连接成功" + '   状态码：' + this.socket.readyState;
        console.log("WebSocket连接成功");
      },
      onError(e) {
        //错误
        this.data = "WebSocket连接发生错误" + '   状态码：' + this.socket.readyState;
        console.log("WebSocket连接发生错误");
      },
      onMessage(e) { //数据接收
        const redata = e.data;
        //注意：长连接我们是后台直接1秒推送一条数据，
        //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
        //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
        this.data = '服务端返回：' + redata;
        console.log(redata);
      },
      onSend() {
        //数据发送
        this.socket.send(this.text);
        this.text = ''
      },
      close(e) {
        //关闭
        this.data = "WebSocket连接关闭" + '   状态码：' + this.socket.readyState;
        console.log("connection closed (" + this.socket.readyState + ")");
      },
    }
  }
</script>

<style scoped>

</style>
