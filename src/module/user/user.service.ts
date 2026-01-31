import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepo.findOne({
      where: [
        { email: createUserDto.email },
        { password: createUserDto.password }
      ],
    });

    if (existingUser) {
      throw new BadRequestException('Email or password already exists');
    }

    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }


  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found')
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) { throw new NotFoundException('user is not found') }
    Object.assign(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = this.userRepo.findOneBy({ id });
    if (!user) { throw new NotFoundException('user is not found') }
    await this.userRepo.delete(id);
    return {
      status: "ok",
      message: "delete successfully"
    }

  }
}
