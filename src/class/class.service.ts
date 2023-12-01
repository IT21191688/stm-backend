import Class from './class.model';

const createClass = async (classData: any) => {
  try {
    const newClass = new Class(classData);
    const savedClass = await newClass.save();
    return savedClass;
  } catch (error) {
    throw error;
  }
};

const getAllClasses = async () => {
  try {
    return await Class.find({});
  } catch (error) {
    throw error;
  }
};

const getClassById = async (classId: string) => {
  try {
    return await Class.findById(classId);
  } catch (error) {
    throw error;
  }
};

const updateClass = async (classId: string, classData: any) => {
  try {
    return await Class.findByIdAndUpdate(classId, classData, { new: true });
  } catch (error) {
    throw error;
  }
};

const deleteClass = async (classId: string) => {
  try {
    return await Class.findByIdAndDelete(classId);
  } catch (error) {
    throw error;
  }
};

export default {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};
