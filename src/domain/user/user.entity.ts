import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name: string;

  @Column()
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
