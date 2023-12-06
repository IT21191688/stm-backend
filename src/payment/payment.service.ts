import Payment from './payment.model';

const createPayment = async (paymentData:any) => {
  try {
    const existPayment = await findExistPaymentsByStudentAndYear(
      paymentData.studentId,
      paymentData.paymentYear,
      paymentData.paymentMonth,
      paymentData.classId
    );

    //console.log('Existing Payment:', existPayment);
    //console.log('Payment:', paymentData);

    if (!existPayment) {
      const newPayment = new Payment(paymentData);
      const createdPayment = await newPayment.save();
      return createdPayment;
    } else {
      //console.log('Payment already exists for this student in this month and year');
      // Handle the case where payment already exists (maybe throw an error or return a specific message)
      return null;
    }
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

const findAllPaymentsByStudentAndYear = async (studentId:String, year:String, month:String) => {
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

const findExistPaymentsByStudentAndYear = async (studentId:String, year:String, month:String,classId:String) => {
  try {
    const payments = await Payment.findOne({
      studentId: studentId,
      paymentYear: year,
      paymentMonth: month,
      classId:classId
       // Assuming month is the specific month you want to search for
    }) // Use .exec() to ensure the query is executed

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
  findAllPaymentsByStudentAndYear,
findExistPaymentsByStudentAndYear

};
