import { AnyAaaaRecord } from 'dns';
import Year from './year.model';

const checkYearExists = async (year: number) => {
  const existingYear = await Year.findOne({ year });
  return !!existingYear;
};

const createYear = async (year: number) => {
  const newYear = await Year.create({ year });
  return newYear;
};

const getYearId = async (year: number) => {
  try {
    const foundYear = await Year.findOne({ year });
    
    if (foundYear) {
      return foundYear._id; // Return the ID of the found year
    }

    // If the year does not exist, you might handle it by creating the year here.
    // For example:
    const newYear = new Year({ year });
    const savedYear = await newYear.save();
    return savedYear._id;
  } catch (error:any) {
    throw new Error(error.message);
  }
};

export default {
  checkYearExists,
  createYear,
  getYearId
};
