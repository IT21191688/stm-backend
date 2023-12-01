import Month from './months.model';

const createMonth = async (month: string, yearId: any) => {
  try {
    const newMonth = new Month({ month, year: yearId });
    return await newMonth.save();
  } catch (error:any) {
    throw new Error(error.message);
  }
};

// Other service methods for month-related operations

export default {
  createMonth,
};
