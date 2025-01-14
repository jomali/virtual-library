import express from "express";
import { getAnotherTest, getTest } from "@/controllers/controller";

export const router = express.Router();

router.get("/test", getTest);
router.get("/another-test", getAnotherTest);
