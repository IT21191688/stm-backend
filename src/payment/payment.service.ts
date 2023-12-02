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

const findAllPaymentsByStudentAndYear = async (studentId:String, year:any, month:any) => {
  try {
    const payments = await Payment.find({
      studentId:studentId,
      paymentYear: year,
      paymentMonth: month, // Assuming month is the specific month you want to search for
    }) 

    //console.log(year,month)

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
