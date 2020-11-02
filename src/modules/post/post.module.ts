import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), UserModule],
  exports: [TypeOrmModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
