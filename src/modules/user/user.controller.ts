import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly userService: UserService) {}

  @Post()
  async add(@Body() user: User): Promise<void> {
    this.logger.debug(`add(user : ${JSON.stringify(user)})`);
    return await this.userService.add(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    this.logger.debug(`findAll()`);
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id): Promise<User> {
    this.logger.debug(`findOne(id : ${id})`);
    return this.userService.findOne(id);
  }

  @Put('/:id')
  async modify(@Param('id') id, @Body() user: User): Promise<void> {
    user.id = id;
    this.logger.debug(`modify(user : ${JSON.stringify(user)})`);
    return await this.userService.modify(user);
  }

  @Delete('/:id')
  async remove(@Param('id') id): Promise<void> {
    this.logger.debug(`remove(id: ${id})`);
    return await this.userService.remove(id);
  }
}
