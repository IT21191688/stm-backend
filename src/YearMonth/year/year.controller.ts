import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import yearService from './year.service';

const addYearIfNotExists = async () => {
  try {
    const currentYear = new Date().getFullYear();
    const yearExists = await yearService.checkYearExists(currentYear);

    if (!yearExists) {
      const newYear = await yearService.createYear(currentYear);
      return newYear; // Return the created year data
    }

    return null; // Indicate that the year already exists
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { addYearIfNotExists };
