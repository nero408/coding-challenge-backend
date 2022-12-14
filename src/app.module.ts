import { Module } from '@nestjs/common';
import { RepositoriesModule } from './modules/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
