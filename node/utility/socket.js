
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
          messages: [],
          teacherRead: 0,
          studentRead: 0
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
      else {
        if (roomId.role == 'student') {
          await MassagesModel.updateOne({
            teacherId: roomId.teacher_id,
            student_id: roomId.user_id
          }, {
            studentRead: 0,
          })
        }
        else {
          await MassagesModel.updateOne({
            teacherId: roomId.teacher_id,
            student_id: roomId.user_id
          }, {
            teacherRead: 0,
          })
        }

      }
      socket.join(roomId.user_id);
      console.log(`⚡: User ${roomId.user_id} joined room ${socket.id}`);

    });

    socket.on("new-message", async (messageData) => {
      console.log(messageData)
      socket.join(messageData.teacherId_id);

      try {
        let room = await MassagesModel.findOne({ student_id: messageData.student_id });

        room.messages.push({ id: messageData.teacher_id, message: messageData.msg , role: messageData.role });
        if (messageData.role == 'student') {
          room.teacherRead = room.teacherRead + 1;
        }
        else {
          room.studentRead = room.studentRead + 1;
        }
        await room.save();

        io.to(messageData.student_id).emit('new-message', messageData);

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
