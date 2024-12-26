import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        type: "enum",
        enum: ["pemasukan", "pengeluaran"],
        default: "pengeluaran"
    })
    type: "pemasukan" | "pengeluaran";

    @Column("decimal", { precision: 10, scale: 2 })
    amount: number;

    @Column()
    description: string;

    @Column()
    category: string;

    @ManyToOne(() => User, user => user.transactions)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(type: "pemasukan" | "pengeluaran", amount: number, description: string, category: string, user: User) {
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.category = category;
        this.user = user;
    }
}
