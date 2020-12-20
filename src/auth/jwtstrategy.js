import { Strategy, ExtractJwt } from "passport-jwt";
import User from "./model";

function setJwtStrategy(passport) {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.TOKEN_SECRET,
    };
    passport.use(
        new Strategy(options,
            async (payload, done) => {
                try {
                    const user = await User.findById(payload.id);
                    if (user) {
                        done(null, payload);
                    } else {
                        done(null, false)
                    }
                } catch (error){
                    console.error(error);
                    done(error, false);
                }
        })
    );
};


export default setJwtStrategy;