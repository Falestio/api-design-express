import { Router } from "express";
import { UserController } from "@/domain/user/user.controller"; // Adjust the path as necessary

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: Mengembalikan daftar user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get("/users", userController.getAllUsers);

router.post("/users", userController.createUser); // Create a new user
router.get("/users/:id", userController.getUserById); // Get user by ID
router.put("/users/:id", userController.updateUser); // Update user
router.delete("/users/:id", userController.deleteUser); // Delete user

export default router;
