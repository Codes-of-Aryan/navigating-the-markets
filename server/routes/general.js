import express from "express";
import { getUser } from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser); // TODO: change to stock information

export default router;
