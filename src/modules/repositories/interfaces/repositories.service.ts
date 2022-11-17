import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString, Min } from "class-validator";
import { Repository } from "../models/repository";

export class RepositoryGetRequest {
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date
  
  @ApiProperty()
  @IsString()
  language: string

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  limit: number
}

export interface IRepositoriesService {
  getRepositories (request: RepositoryGetRequest): Promise<Repository[]>
}