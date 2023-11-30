import User from '../user/user.model';


const findByEmail = async (email: string) => {
  return await User.findOne({ email: email });
};


const save = async (user: any, session: any) => {
  if (session) {
    return await user.save({ session });
  } else {
    return await user.save();
  }
};


const findById = async (id: string) => {
  return await User.findById(id).populate("organization");
};





export default{

    findByEmail,save,findById

};
