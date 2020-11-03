import { Body, Controller, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PostService } from './post.service';
import { PostReqDto } from './post.req.dto';
import { Posts } from './post.entity';

@Controller('post')
export class PostController {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly userService: UserService, private readonly postService: PostService) {}

  @Post()
  async add(@Body() req: PostReqDto): Promise<void> {
    this.logger.debug(`add(req : ${JSON.stringify(req)})`);
    const user = await this.userService.findOne(req.userId.toString());
    await this.postService.add(user, req);
  }

  @Get()
  async findAll() {
    this.logger.debug(`findAll()`);
    return await this.postService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id): Promise<Posts> {
    this.logger.debug(`findOne(id : ${id})`);
    return await this.postService.findOne(id);
  }

  @Put('/:id')
  async modify(@Param('id') id, @Body() posts: Posts): Promise<void> {
    posts.id = id;
    this.logger.debug(`modify(posts : ${JSON.stringify(posts)})`);
    await this.postService.modify(posts);
  }
}
