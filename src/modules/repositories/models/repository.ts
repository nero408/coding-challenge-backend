import { ApiProperty } from "@nestjs/swagger"

export class Repository {
  @ApiProperty()
  rank: number
  @ApiProperty()
  item: string
  @ApiProperty()
  name: string
  @ApiProperty()
  stars: number
  @ApiProperty()
  forks: number
  @ApiProperty()
  language: string
  @ApiProperty()
  repoUrl: string
  @ApiProperty()
  username: string
  @ApiProperty()
  issues: number
  @ApiProperty()
  lastCommit: Date
  @ApiProperty()
  description: string
}

// rank,item,repo_name,stars,forks,language,repo_url,username,issues,last_commit,description