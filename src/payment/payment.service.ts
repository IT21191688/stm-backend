import Payment from './payment.model';

const createPayment = async (paymentData:any) => {
  try {
    const newPayment = new Payment(paymentData);
    const createdPayment = await newPayment.save();
    return createdPayment;
  } catch (error) {
    throw error;
  }
};

const getPaymentById = async (paymentId:String) => {
  try {
    return await Payment.findById(paymentId).populate('studentId classId paymentMonth paymentYear userId');
  } catch (error) {
    throw error;
  }
};

const updatePayment = async (paymentId:String, updatedPaymentData:any) => {
  try {
    return await Payment.findByIdAndUpdate(paymentId, updatedPaymentData, { new: true });
  } catch (error) {
    throw error;
  }
};

const deletePayment = async (paymentId:String) => {
  try {
    return await Payment.findByIdAndDelete(paymentId);
  } catch (error) {
    throw error;
  }
};

const findAllPaymentsByStudentAndYear = async (studentId:String, year:any) => {
  try {
    const payments = await Payment.find({
      studentId,
      paymentYear: year, // Assuming paymentYear contains the ObjectId of the specific year
    }).populate('paymentMonth'); // Assuming you want to populate the paymentMonth field

    return payments;
  } catch (error) {
    console.error('Error retrieving payments:', error);
    throw error;
  }
};


export default {
  createPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
  findAllPaymentsByStudentAndYear
};
