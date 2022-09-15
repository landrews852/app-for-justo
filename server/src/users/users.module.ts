import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { ItemsService } from 'src/items/items.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from '../items/entities/item.entity';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Item.name, schema: ItemSchema },
    ]),
  ],
  providers: [UsersResolver, UsersService, ItemsService],
})
export class UsersModule {}
