

import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  days: [{
    date: {
      type: Date,
      required: true,
    },
    attended: {
      type: Boolean,
      default: false,
    },
  }],
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;
