import express from "express"
import { adminOnly, verifyToken } from "../utils/verifyUser.js"
import upload from "../utils/multer.js"
import {
  createTask,
  deleteTask,
  getDashboardData,
  getTaskById,
  getTasks,
  updateTask,
  updateTaskChecklist,
  updateTaskStatus,
  uploadAttachment,
  userDashboardData,
} from "../controller/task.controller.js"

const router = express.Router()

router.post("/create", verifyToken, adminOnly, createTask)

router.post(
  "/upload-attachment",
  verifyToken,
  adminOnly,
  upload.single("file"),
  uploadAttachment
)

router.get("/", verifyToken, getTasks)

router.get("/dashboard-data", verifyToken, adminOnly, getDashboardData)

router.get("/user-dashboard-data", verifyToken, userDashboardData)

router.get("/:id", verifyToken, getTaskById)

router.put("/:id", verifyToken, updateTask)

router.delete("/:id", verifyToken, adminOnly, deleteTask)

router.put("/:id/status", verifyToken, updateTaskStatus)

router.put("/:id/todo", verifyToken, updateTaskChecklist)

export default router
