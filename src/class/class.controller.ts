import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import classService from '../class/class.service';
import CustomResponse from '../util/response';


const createClass = async (req: Request, res: Response) => {
  try {
    const { className, classGrade, teacher, price } = req.body;

    //should impliment if valid teacher id



    

    const classData = { className, classGrade, teacher, price };

    const newClass = await classService.createClass(classData);

    CustomResponse(res, true, StatusCodes.CREATED, 'Class created successfully!', newClass);

  } catch (error: any) {

    CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
    
  }
};

const getAllClasses = async (req: Request, res: Response) => {
  try {


    const allClasses = await classService.getAllClasses();


    CustomResponse(res, true, StatusCodes.OK, 'Classes retrieved successfully!', allClasses);


  } catch (error: any) {


    CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const getClassById = async (req: Request, res: Response) => {
  try {
    const classId = req.params.classId;
    const classFound = await classService.getClassById(classId);
    if (!classFound) {

      CustomResponse(res, false, StatusCodes.NOT_FOUND, 'Class not found!', null);


    } else {

      CustomResponse(res, true, StatusCodes.OK, 'Class retrieved successfully!', classFound);


    }
  } catch (error: any) {
    CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const updateClass = async (req: Request, res: Response) => {
  try {
    const classId = req.params.classId;
    const updatedClass = await classService.updateClass(classId, req.body);
    if (!updatedClass) {
      CustomResponse(res, false, StatusCodes.NOT_FOUND, 'Class not found!', null);
    } else {
      CustomResponse(res, true, StatusCodes.OK, 'Class updated successfully!', updatedClass);
    }
  } catch (error: any) {
    CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const deleteClass = async (req: Request, res: Response) => {
  try {
    const classId = req.params.classId;
    const deletedClass = await classService.deleteClass(classId);
    if (!deletedClass) {
      CustomResponse(res, false, StatusCodes.NOT_FOUND, 'Class not found!', null);
    } else {
      CustomResponse(res, true, StatusCodes.OK, 'Class deleted successfully!', deletedClass);
    }
  } catch (error: any) {
    CustomResponse(res, false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

export {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};
