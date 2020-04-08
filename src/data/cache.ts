import { ExpirationStrategy, MemoryStorage } from "node-ts-cache";

const myCache = new ExpirationStrategy(new MemoryStorage());

interface RoomUser {
  // id: string;
  socketId: string;
}

interface IRoom {
  // name: string;
  // type: string;
  users: RoomUser[];
}

export class RoomSessions {

  public async getRoom(roomId: string) {
    const cachedRooms = await myCache.getItem<IRoom>(roomId);
    if (cachedRooms) {
      return cachedRooms;
    }
    return null;
  }

  public async setRomm(roomId: string, room: IRoom) {
    await myCache.setItem(roomId, room, {ttl: 86400});
  }

  public async setUserToRoom(roomId: string, user:RoomUser){
    const cachedRooms: IRoom = await myCache.getItem<IRoom>(roomId);
    if (cachedRooms) {
      const existingRoom: IRoom = { ...cachedRooms };
    
      existingRoom.users.push(user);
      await myCache.setItem(roomId, existingRoom, {ttl: 86400});
    }
  }

}
