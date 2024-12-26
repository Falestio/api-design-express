import { IsNotEmpty, IsDecimal, IsEnum } from 'class-validator';

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsEnum(["pemasukan", "pengeluaran"])
    type: "pemasukan" | "pengeluaran";

    @IsNotEmpty()
    @IsDecimal()
    amount: number;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    userId: string;
}
