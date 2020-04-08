import {
  OnConnect,
  SocketController,
  ConnectedSocket,
  OnDisconnect,
  MessageBody,
  OnMessage,
  NspParams
} from 'socket-controllers';

import { RoomSessions } from '../data/cache';
const roomSession = new RoomSessions();

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
    // console.log(socket.id)
    // this.clients.push({client: socket.id, roomId: message.roomId})
    const existingRoom = await roomSession.getRoom(message.roomId);
    if(!existingRoom){
      await roomSession.setRomm(message.roomId, {users: [{socketId: socket.id}]});
    }
    else {
      await roomSession.setUserToRoom(message.roomId, {socketId: socket.id});
    }
    
    const getRoom = await roomSession.getRoom(message.roomId);

    getRoom?.users.forEach( (user) => {
      if(user.socketId !== socket.id){
        socket.to(user.socketId).emit('joined', { joined: socket.id, roomId: message.roomId })
      }
    });
  }

}
