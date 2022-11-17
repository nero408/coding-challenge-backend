import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

export interface IGithubApiService {
  getTrendingRepositories(date: string): Promise<string> 
}

@Injectable()
export class GithubApiService {

  async getTrendingRepositories(date: string): Promise<string> {
    const githubRequestUrl: string = `https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data/github-ranking-${date}.csv`
    try {
      const res = await axios.get(githubRequestUrl)
      return res.data
    } catch (err) {
      throw new HttpException("Could not retrieve repositories for the selected date from github!", HttpStatus.NOT_FOUND)
    }
  }

}
