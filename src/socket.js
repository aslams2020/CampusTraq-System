import { io } from "socket.io-client";

const socket = io("http://localhost:5000");  // Ensure this matches your backend port

export default socket;
