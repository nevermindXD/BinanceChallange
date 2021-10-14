import { IsDate, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  public symbol: string;

  // @IsDate()
  // public createdAt: Date;
}
