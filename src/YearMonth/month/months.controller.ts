import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import monthService from './months.service';

const createMonth = async (req: Request, res: Response) => {
  try {
    const { month, yearId } = req.body;
    const newMonth = await monthService.createMonth(month, yearId);
    res.status(StatusCodes.CREATED).json(newMonth);
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

// Other controller methods for fetching, updating, deleting months, if needed

export default {
  createMonth,
};
