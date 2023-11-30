import Auth from "./auth.model";
const config = require('../config');
const jwt = require('jsonwebtoken');
const googleauth = require('../auth/auth.middleware');


const save = async (auth: any, session: any) => {
  return await auth.save({ session });
};

const findById = async (id: string) => {
  return await Auth.findById(id);
};

const googleLogin = async (app:any, passport:any) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login'
    }),
    function (req:any, res:any) {
      const user = req.user;
      const token = jwt.sign({ userId: user._id }, config.secretKey);
      const role = user.role;

      res.send(`
        <script>
          window.opener.postMessage({ token: '${token}', role: '${role}' }, 'http://localhost:3000');
          window.close();
        </script>
      `);
    }
  );

  app.get(
    '/api/is-authenticated',
    googleauth.googleAuthenticate,
    (req:any, res:any) => {
      const user = req.user;
      const token = jwt.sign({ userId: user._id }, config.secretKey);
      const role = user.role;
      res.json({ token, role });
    }
  );
};

// Usage:
// Ensure to pass 'app' and 'passport' as arguments when calling this function
//initializeGoogleAuthRoutes(app, passport);



export default { save, findById,googleLogin };

