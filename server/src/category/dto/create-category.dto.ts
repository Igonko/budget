import { Optional } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateCategoryDto {
  @IsNotEmpty()
  title: string;
  @Optional()
  user?: User;
}
