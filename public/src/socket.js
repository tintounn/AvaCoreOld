import io from 'socket.io-client';

let socket = null;

export function getSocket() {
  if(socket == null) {
    socket = io("/ws");
  }

  return socket;
}