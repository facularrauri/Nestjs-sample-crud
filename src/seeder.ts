import { seeder } from 'nestjs-seeder'
import { MongooseModule } from '@nestjs/mongoose'
import { Role, RoleSchema } from './role/schemas/role.schema'
import { User, UserSchema } from './user/schemas/user.schema'
import { RolesSeeder } from './seeders/roles.seeder'
import { UsersSeeder } from './seeders/users.seeder'

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
}).run([RolesSeeder, UsersSeeder])
