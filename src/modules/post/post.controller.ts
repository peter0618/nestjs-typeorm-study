import { Body, Controller, Logger, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PostService } from './post.service';
import { PostReqDto } from './post.req.dto';

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
}
