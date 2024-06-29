import express from "express";
import * as users from "../controllers/users";
import {catchAsync} from "../errors";
import authenticate from "../middlewares/authenticate";



const router = express.Router();

router.get("/", catchAsync(users.getUsersList));
router.get("/:id", catchAsync(users.getUser));
router.put("/:id", authenticate, catchAsync(users.updateUser));
router.delete("/:id", authenticate, catchAsync(users.deleteUser));

export default router;