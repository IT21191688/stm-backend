import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  paymentMonth: {
    type: String,
    required: true,
  },
  paymentYear: {
    type: String,
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  paymentStatus:{
    type:String,
    required:true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  // Other necessary fields specific to your use case
}, {
  timestamps: true,
});

export default mongoose.model('Payment', PaymentSchema);
