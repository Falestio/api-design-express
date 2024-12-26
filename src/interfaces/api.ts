import { Router } from "express";
import { UserController } from "@/domain/user/user.controller"; // Adjust the path as necessary
import { TransactionController } from "@/domain/transaction/transaction.controller"; // Adjust the import as necessary

const router = Router();
const userController = new UserController();
const transactionController = new TransactionController();

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

router.get("/transactions", transactionController.getAllTransactions);
router.post("/transactions", transactionController.createTransaction); // Create a new transaction
router.get("/transactions/:id", transactionController.getTransactionById); // Get transaction by ID
router.put("/transactions/:id", transactionController.updateTransaction); // Update transaction
router.delete("/transactions/:id", transactionController.deleteTransaction); // Delete transaction

export default router;
