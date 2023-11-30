import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
const config =require("../config");
import User from '../auth/auth.model';

const googleAuth = (passport: any) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_REDIRECT_URL,
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        cb: any
      ) {
        const userObject = {
          googleid: profile.id,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          role: 'user',
        };

        console.log(userObject);
        try {
          const user = await User.findOne({ googleid: profile.id });

          if (user) {
            return cb(null, user);
          }

          await User.create(userObject);
          return cb(null, user);
        } catch (err:any) {
          return cb(err.message);
        }
      }
    )
  );

  passport.serializeUser(function (user: any, cb: any) {
    cb(null, user.id);
  });

  passport.deserializeUser(function (id: any, cb: any) {
    User.findById(id, function (err: any, user: any) {
      cb(err, user);
    });
  });
};

export default googleAuth;
