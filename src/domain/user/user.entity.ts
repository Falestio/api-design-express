import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Transaction } from "../transaction/transaction.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
