import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import path from 'path';
export interface IRoom {
  id: string;
  userId: string;
  name: string;
  type: string;
  password: string;
}
const filePath = path.join(__dirname, 'roomData.json');
export function getRooms() {
  try {
    return JSON.parse(JSON.stringify(readFileSync(filePath, 'utf-8')));
  } catch (error) {
    throw Error(error);
  }

}

export const findRoom = (roomdata: string) => {

  try {
    return JSON.parse(getRooms()).filter((room: any) => (
      room.id === roomdata ||
      room.userId === roomdata ||
      room.name === roomdata
    ));
  } catch (error) {
    throw Error(error);
  }

}


export const findByUserRoom = (roomdata: string) => {
  const roomsList = JSON.parse(getRooms());

  try {
    return roomsList.filter((room: any) => (
      room.userId == roomdata 
    ));
  } catch (error) {
    throw Error(error);
  }

}

export const createRoom = (room: IRoom) => {
  const roomsF: any | any[] = getRooms();
  if (roomsF && roomsF.length) {
    const rooms = JSON.parse(roomsF);
    rooms.push(room);
    console.log(rooms);
    unlinkSync(filePath);
    writeFileSync(filePath, JSON.stringify(rooms));
  }
}

