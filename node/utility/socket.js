
const { MassagesModel, validMessages } = require("../models/messages.model");
const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🔥: A user connected");

    socket.on("join-room", async (roomId) => {
      console.log("roomId: " + JSON.stringify(roomId));
      let data = await MassagesModel.find({
        teacherId: roomId.teacher_id,
        student_id: roomId.user_id,
      })
      console.log("data", data);
      if (data.length == 0) {
        console.log(data);
        let room = {
          teacherId: roomId.teacher_id,
          student_id: roomId.user_id,
          room_id: socket.id,
          messages: []
        }
        let validBody = validMessages(room);
        if (validBody.error) {
          console.log(validBody.error.details);
        }
        try {
          let message = new MassagesModel(room);
          await message.save();
          console.log(message);
        }
        catch (err) {
          console.log(); ({ err: err.message });
        }
      }
      socket.join(roomId);
      console.log(`⚡: User ${roomId.user_id} joined room ${socket.id}`);

    });

    socket.on("new-message", async (messageData) => {
      console.log(messageData)


      try {
        const room = await MassagesModel.findOne({ student_id: messageData._id });
        room.messages.push({id: messageData._id, message: messageData.msg});
        await room.save();


        io.to().emit('new-message', messageData.msg);


        console.log(`🚀: new message ${messageData.msg}`);
      } catch (err) {
        console.error(err);
        socket.emit('error', { type: 'ServerError', msg: 'Internal server error' });
      }
    });

    // socket.on("disconnect", () => {
    //   console.log(`Room ${socket.id} disconnected`);
    // });
  });
};

module.exports = { initSocket };
