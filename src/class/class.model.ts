import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    maxlength: 100,
  },
  classGrade: {
    type: String,
    required: true,
    maxlength: 50,
  },
  teacherName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
  },
  // Other necessary fields specific to your use case
}, {
  timestamps: true,
});

export default mongoose.model('Class', ClassSchema);
