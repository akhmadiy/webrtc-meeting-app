import {
  OnConnect,
  SocketController,
  ConnectedSocket,
  OnDisconnect,
  MessageBody,
  OnMessage,
  NspParams
} from 'socket-controllers';

@SocketController()
export class RoomController {

  private clients: any = [];

  @OnConnect()
  connection(@ConnectedSocket() socket: any) {
    console.log('client connected');
  }

  @OnDisconnect()
  disconnect(@ConnectedSocket() socket: any) {
    console.log('client disconnected');
  }

  @OnMessage('join')
  async join(@ConnectedSocket() socket: any, @MessageBody() message: any) {
    console.log('received message:', message);
    // console.log('setting id to the message and sending it back to the client');
    // message.id = 1;
    console.log(socket.id)
    this.clients.push({client: socket.id, roomId: message.roomId})
    
    
    socket.emit('joined', { joined: socket.id, roomId: message.roomId });
  }

}
