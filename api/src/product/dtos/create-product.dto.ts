import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @Min(0)
    @Type(() => Number)
    price: number

    @IsArray()
    @IsInt({ each: true })
    @Type(() => Number)
    categories: number[]
}