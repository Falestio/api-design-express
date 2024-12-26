import { Request, Response } from "express";
import { TransactionService } from "./transaction.service"; // Import the TransactionService
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateTransactionDto } from './dto/create-transaction.dto'; // Import the DTO

export class TransactionController {
    private transactionService: TransactionService;

    constructor() {
        this.transactionService = new TransactionService(); // Initialize the TransactionService
    }

    // Get all transactions
    public getAllTransactions = async (req: Request, res: Response) => {
        try {
            const transactions = await this.transactionService.getAllTransactions();
            res.send(transactions);
        } catch (error) {
            console.error("Database connection error: ", error);
            res.status(500).send("Database connection error");
        }
    };

    // Create a new transaction
    public createTransaction = async (req: Request, res: Response) => {
        const createTransactionDto = plainToClass(CreateTransactionDto, req.body);
        const errors = await validate(createTransactionDto);

        if (errors.length > 0) {
            res.status(400).send({ errors: errors.map(err => err.constraints) });
            return;
        }

        try {
            const newTransaction = await this.transactionService.createTransaction(
                createTransactionDto.type,
                createTransactionDto.amount,
                createTransactionDto.description,
                createTransactionDto.category,
                createTransactionDto.userId
            );
            res.status(201).send(newTransaction);
        } catch (error) {
            console.error("Error creating transaction: ", error);
            res.status(500).send("Error creating transaction");
        }
    };

    // Get a transaction by ID
    public getTransactionById = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        try {
            const transaction = await this.transactionService.getTransactionById(id);
            if (!transaction) {
                res.status(404).send("Transaction not found");
                return;
            }
            res.status(200).send(transaction);
        } catch (error) {
            console.error("Error fetching transaction: ", error);
            res.status(500).send("Error fetching transaction");
        }
    };

    // Update a transaction
    public updateTransaction = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        const { type, amount, description, category } = req.body;
        try {
            const updatedTransaction = await this.transactionService.updateTransaction(
                id,
                type,
                amount,
                description,
                category
            );
            if (!updatedTransaction) {
                res.status(404).send("Transaction not found");
                return;
            }
            res.send(updatedTransaction);
        } catch (error) {
            console.error("Error updating transaction: ", error);
            res.status(500).send("Error updating transaction");
        }
    };

    // Delete a transaction
    public deleteTransaction = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        try {
            const deleted = await this.transactionService.deleteTransaction(id);
            if (!deleted) {
                res.status(404).send("Transaction not found");
                return;
            }
            res.status(204).send(); // No content
        } catch (error) {
            console.error("Error deleting transaction: ", error);
            res.status(500).send("Error deleting transaction");
        }
    };
}
