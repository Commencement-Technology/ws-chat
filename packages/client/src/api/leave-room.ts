// export const leaveRoom = (roomId: string) => {
//     try {
//     if (!roomId) throw new Error('Room ID missing');
//     const res = await fetch(`http://localhost:4000/rooms/${roomId}/messages`, {
//       headers: { 'Content-Type': 'application/json', Authorization: token ?? '' },
//     });
//     if (!res.ok) throw new Error(res.statusText);
//   } catch (err) {
//     console.error('Failed to get messages', err);
//   }
// }
