import mongoose from 'mongoose';

const MonthSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Year',
    required: true,
  },
  // Add other necessary fields specific to your use case
}, {
  timestamps: true,
});

export default mongoose.model('Month', MonthSchema);
