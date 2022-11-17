import { Inject, Injectable } from '@nestjs/common';
import { IRepositoriesService, RepositoryGetRequest } from './interfaces/repositories.service';
import { Repository } from './models/repository';
import * as CSV from 'csv-string';
import { IGithubApiService } from './data/github';
import * as _ from 'lodash';

@Injectable()
export class RepositoriesService implements IRepositoriesService {

  constructor(@Inject('IGithubApiService') private githubApiService: IGithubApiService) {

  }

  async getRepositories(request: RepositoryGetRequest): Promise<Repository[]> {
    let formattedDate: string = request.date.toISOString().split("T")[0]
    const csvData = await this.githubApiService.getTrendingRepositories(formattedDate)
    let repositories = this.parseGithubRepositories(csvData)
    const filtered = _.filter(repositories, {language: request.language})
    return filtered.slice(0, request.limit)
  }

  parseGithubRepositories(csvData: string): Repository[] {
    const repositories: Repository[] = []
    const rows = CSV.parse(csvData)
    rows.shift() // Shift once to get rid of the header row
    rows.forEach(row => {
      repositories.push({
        rank: parseInt(row[0]),
        item: row[1],
        name: row[2],
        stars: parseInt(row[3]),
        forks: parseInt(row[4]),
        language: row[5],
        repoUrl: row[6],
        username: row[7],
        issues: parseInt(row[8]),
        lastCommit: new Date(row[9]),
        description: row[10],
      })
    })
    return repositories
  }
}
