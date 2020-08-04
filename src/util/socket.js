import socketIOClient from "socket.io-client";

const endpoint = 'http://localhost:2500/';

export const socket = socketIOClient(endpoint);