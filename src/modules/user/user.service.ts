import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../profile/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async add(user: User): Promise<void> {
    const profile = user.profile;
    await this.profileRepository.save(profile); // 저장하면 DB에 profile row가 생성되고 생성된 id가 profile 객체의 id에 매핑됩니다.
    await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    // return this.userRepository.find({relations: ["profile"]});
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .orderBy('user.id', 'DESC')
      .getMany();
  }

  async findOne(id: string): Promise<User> {
    // return this.userRepository.findOne(id);
    return (
      this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.profile', 'profile')
        // .whereInIds([id])
        .where('user.id = :id', { id })
        .getOne()
    );
  }

  async modify(newUser: User): Promise<void> {
    // const user = await this.userRepository.findOne(user.id);
    const user = await this.findOne(newUser.id.toString());
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    user.isActive = newUser.isActive;

    const profile = user.profile;
    profile.address = newUser.profile.address;
    profile.gender = newUser.profile.gender;

    await this.userRepository.save(user);
    await this.profileRepository.save(profile);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    const profile = user.profile;
    await this.userRepository.delete(id);
    await this.profileRepository.delete(profile.id);
  }
}
