import express from "express";
import * as auth from "../controllers/auth";
import {catchAsync} from "../errors";
import authenticate from "../middlewares/authenticate";
import admin from "../middlewares/admin";



const router = express.Router();

router.post("/register", catchAsync(auth.register));
router.post("/log-in", catchAsync(auth.logIn));
router.post("/log-out", catchAsync(auth.logOut));
router.get("/", authenticate, catchAsync(auth.authenticate));
router.get("/admin", authenticate, admin, catchAsync(auth.admin));

export default router;