import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, ProfileModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
