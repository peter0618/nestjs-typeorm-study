import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { PostReqDto } from './post.req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Posts) private postsRepository: Repository<Posts>) {}

  async add(user: User, req: PostReqDto) {
    const posts = new Posts();
    posts.contents = req.contents;
    posts.title = req.title;
    posts.user = user;
    await this.postsRepository.save(posts);
  }

  async findAll() {
    // return await this.postsRepository.find();
    // return await this.postsRepository.find({relations: ["user"]});
    return await this.postsRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.user', 'user')
      .orderBy('posts.id', 'DESC')
      .getMany();
  }

  async findOne(id: any) {
    return await this.postsRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.user', 'user')
      .where('posts.id = :id', { id })
      .getOne();
  }
}
