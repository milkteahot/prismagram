import dotenv from "dotenv";
import path from "path";
import "./env";

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import passport from "passport";
import { sendSecretMail } from "./utils"; //
import "./passport";

sendSecretMail("mail@gmail.com", "123");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({schema});

server.express.use(logger("dev"));
server.express.use(passport.authenticate("jwt"));

server.start({port: PORT }, ()=> console.log(`Server running on http://localhost:${PORT}`));
