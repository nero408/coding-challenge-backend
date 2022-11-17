import { Module } from '@nestjs/common';
import { GithubApiService } from './data/github';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';

@Module({
  imports: [],
  controllers: [RepositoriesController],
  providers: [{ provide: 'IGithubApiService', useClass: GithubApiService}, {
    provide: 'IRepositoriesService',
    useClass: RepositoriesService
  }],
})
export class RepositoriesModule {}
