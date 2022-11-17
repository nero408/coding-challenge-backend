import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';
import {IGithubApiService} from './data/github'
import { Injectable } from '@nestjs/common';


const mockData: string = `rank,item,repo_name,stars,forks,language,repo_url,username,issues,last_commit,description
1,top-100-stars,freeCodeCamp,341078,28027,JavaScript,https://github.com/freeCodeCamp/freeCodeCamp,freeCodeCamp,131,2022-02-22T02:44:45Z,freeCodeCamp.org's open-source codebase and curriculum. Learn to code for free.
2,top-100-stars,996.ICU,260982,21485,Dart,https://github.com/996icu/996.ICU,996icu,0,2022-02-09T10:53:20Z,Repo for counting stars and contributing. Press F to pay respect to glorious developers.
3,top-100-stars,free-programming-books,222293,47329,Dart,https://github.com/EbookFoundation/free-programming-books,EbookFoundation,27,2022-02-21T16:39:31Z,:books: Freely available programming books
4,top-100-stars,coding-interview-university,210009,56905,Dart,https://github.com/jwasham/coding-interview-university,jwasham,36,2022-02-21T14:48:00Z,A complete computer science study plan to become a software engineer.`

@Injectable()
class GithubMockApiService implements IGithubApiService{

  async getTrendingRepositories(date: string): Promise<string> {
    return mockData
  }
}

describe('RepositoriesController', () => {
  let repositoriesController: RepositoriesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RepositoriesController],
      providers: [{ provide: 'IGithubApiService', useClass: GithubMockApiService }, {
        provide: 'IRepositoriesService',
        useClass: RepositoriesService
      }],
    }).compile(); 
    repositoriesController = app.get<RepositoriesController>(RepositoriesController);
  });

  describe('root', () => {
    
    test('should return an Empty List', async () => {
      const result = await repositoriesController.getRepositories({date: new Date(),language: "Dart",limit: 0})
      expect(result.length).toEqual(0)
    })

    test('should return Dart Repositories (3)', async () => {
      const result = await repositoriesController.getRepositories({date: new Date(),language: "Dart",limit: 100})
      expect(result.length).toEqual(3)
    })

    test('should return JavaScript Repositories (1)', async () => {
      const result = await repositoriesController.getRepositories({date: new Date(),language: "JavaScript",limit: 100})
      expect(result.length).toEqual(1)
    })
  });
});
