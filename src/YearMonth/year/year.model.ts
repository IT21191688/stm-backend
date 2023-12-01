import mongoose from 'mongoose';

const YearSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    unique: true,
  },
  // Add other necessary fields specific to your use case
}, {
  timestamps: true,
});

export default mongoose.model('Year', YearSchema);
