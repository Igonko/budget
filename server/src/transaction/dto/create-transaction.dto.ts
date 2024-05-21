import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { TRANSACTION } from 'src/enums/enums';
import { User } from 'src/user/entities/user.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsEnum(TRANSACTION)
  type: TRANSACTION;

  @ValidateNested()
  @Type(() => Category)
  category: Category;

  @ValidateNested()
  @Type(() => User)
  user: User;
}
