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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentMonth',
    required: true,
  },
  paymentYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentYear',
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Other necessary fields specific to your use case
}, {
  timestamps: true,
});

export default mongoose.model('Payment', PaymentSchema);
