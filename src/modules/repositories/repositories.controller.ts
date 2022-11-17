import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IRepositoriesService, RepositoryGetRequest } from './interfaces/repositories.service';
import { Repository } from './models/repository';

@ApiTags('github')
@Controller('repositories')
export class RepositoriesController {
  constructor(@Inject('IRepositoriesService') private repositoriesService: IRepositoriesService) {}

  @Get('list')
  @ApiOperation({
    summary: 'Get a list of repositories',
    description:
      'Get a list of github trending repositories by giving a date, language and limit',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of repositories',
    type: Repository,
    isArray: true
  })
  @ApiResponse({
    status: 400,
    description: 'An input is malformed',
  })
  @ApiResponse({
    status: 404,
    description: 'Could not retrieve repositories for this date from github',
  })
  getRepositories(@Query() request: RepositoryGetRequest): Promise<Repository[]> {
    return this.repositoriesService.getRepositories(request);
  }
}
