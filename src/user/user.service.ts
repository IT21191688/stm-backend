import User from '../user/user.model';


const findByEmail = async (email: string) => {
  return await User.findOne({ email: email });
};






export default{

    findByEmail

};
