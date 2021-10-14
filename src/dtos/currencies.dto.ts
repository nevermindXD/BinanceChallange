import { IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  public symbol: string;

}
