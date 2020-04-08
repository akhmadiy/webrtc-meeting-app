import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import path from 'path';
export interface IUser {
  id: string;
  username: string;
  fullname: string;
  password: string;
}
const filePath = path.join(__dirname, 'userData.json');
export function getUsers(){
  try {
    return JSON.parse(JSON.stringify(readFileSync(filePath, 'utf-8')));
  } catch (error) {
    throw Error(error);
  }
  
}

export const findUser = (userdata: string)=> {

  try {
    return getUsers().filter((user: any)=>  (user.id === userdata || user.username || userdata));
  } catch (error) {
    throw Error(error);
  }
  
}

export const createUser = (user: IUser) => {
  const usersF: any | any[] = getUsers();
  if(usersF && usersF.length){
    const users = JSON.parse(usersF);
    users.push(user);
    console.log(users);
    unlinkSync(filePath);
    writeFileSync(filePath, JSON.stringify(users));
  }
  return user;
}

