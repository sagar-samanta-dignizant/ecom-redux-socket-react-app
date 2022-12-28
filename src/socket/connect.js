import { io } from "socket.io-client"

let socket = io("http://localhost:3001", {
  transports: ["websocket", "polling", "flashsocket"],
})
// socket.io.opts.query="token="+{"Mytoken"}
export default socket
