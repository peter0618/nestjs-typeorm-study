import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from '../profile/profile.entity';
import { ProfileModule } from '../profile/profile.module';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3308,
          username: 'peter',
          password: '1234',
          database: 'typeorm_test_db',
          entities: ['**/*.entity{.ts,.js}'],
          // entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        UserModule,
        ProfileModule,
        TypeOrmModule.forFeature([Profile, User]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all', async () => {
    const result = await service.findAll();
    // console.log(result);
    expect(Array.isArray(result)).toBe(true);
  });
});
