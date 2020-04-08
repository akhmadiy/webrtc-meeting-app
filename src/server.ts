import "reflect-metadata"; // this shim is required
import { useSocketServer } from "socket-controllers";
import express from "express";
import { createServer } from "http";
import socketIo from "socket.io";
import path from "path";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

import controllers from "./socketControllers";

import { createUser, IUser } from "./data/users";
import { createRoom, IRoom, getRooms, findByUserRoom } from "./data/rooms";
import { RoomSessions } from "./data/cache";

const app: any = express();
const server = createServer(app);
const io = socketIo(server);

app.io = io;

server.listen(3001, () => {
  console.log("Server was starting on http://localhost:3001 PORT");
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", function (req: any, res: any) {
  res.send("Welcome");
});

app.post("/rooms", (req: any, res: any) => {
  const room: IRoom = {
    ...req.body,
    password: "",
    id: uuidv4(),
  };
  const newRoom = createRoom(room);
  res.json({ msg: "ok", data: newRoom });
});

app.get("/rooms/:id", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "..", "public", "room.html"));
});

app.get("/users/register", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "..", "public", "register.html"));
});
app.get("/users/login", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "..", "public", "login.html"));
});
app.get("/users/:id", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "..", "public", "user.html"));
});

app.get("/users/:id/rooms", (req: any, res: any) => {
  const userRooms = findByUserRoom(req.params.id);

  res.json({
    msg: "ok",
    data: {
      items: userRooms,
    },
  });
});

app.post("/users/register", (req: any, res: any) => {
  const user: IUser = req.body;
  const newUser: IUser = createUser({ ...user, id: uuidv4() });
  res.json({ msg: "ok", data: newUser });
});
io.use((socket: any, next: Function) => {
  console.log("Custom middleware");
  next();
});
useSocketServer(io, {
  controllers,
});
