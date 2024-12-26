import AppDataSource from "@/infrastructure/db/dataSourceLocal";
import { Transaction } from "@/domain/transaction/transaction.entity";
import { Repository } from "typeorm";
import { UserService } from "@/domain/user/user.service";

export class TransactionService {
    private transactionRepository: Repository<Transaction>;
    private userService: UserService;

    constructor() {
        this.transactionRepository = AppDataSource.getRepository(Transaction);
        this.userService = new UserService();
    }

    // Create a new transaction
    public async createTransaction(type: "pemasukan" | "pengeluaran", amount: number, description: string, category: string, userId: string): Promise<Transaction> {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const transaction = this.transactionRepository.create({ type, amount, description, category, user });
        return await this.transactionRepository.save(transaction);
    }

    // Get all transactions
    public async getAllTransactions(): Promise<Transaction[]> {
        return await this.transactionRepository.find({ relations: ["user"] });
    }

    // Get a transaction by ID
    public async getTransactionById(id: string): Promise<Transaction | null> {
        return await this.transactionRepository.findOneBy({ id });
    }

    // Update a transaction
    public async updateTransaction(
        id: string,
        type: "pemasukan" | "pengeluaran",
        amount: number,
        description: string,
        category: string
    ): Promise<Transaction | null> {
        const transaction = await this.getTransactionById(id);
        if (!transaction) {
            return null; // Transaction not found
        }
        transaction.type = type;
        transaction.amount = amount;
        transaction.description = description;
        transaction.category = category;
        return await this.transactionRepository.save(transaction);
    }

    // Delete a transaction
    public async deleteTransaction(id: string): Promise<boolean> {
        const result = await this.transactionRepository.delete(id);
        return result.affected !== 0; // Return true if a transaction was deleted
    }
}
