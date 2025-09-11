import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      a: {
        summary: 'Example User Creation',
        value: {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          password: 'password123',
        },
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiOkResponse({
    description: 'Successfully retrieved a list of all users.',
    type: [User],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single user by ID' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the user',
    example: 'e3f0c11d-2f8e-4a9c-9c9e-5c4e0f0c11d2',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the user.',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the user',
    example: 'e3f0c11d-2f8e-4a9c-9c9e-5c4e0f0c11d2',
  })
  @ApiOkResponse({
    description: 'The user has been successfully updated.',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      a: {
        summary: 'Example User Update',
        value: {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the user',
    example: 'e3f0c11d-2f8e-4a9c-9c9e-5c4e0f0c11d2',
  })
  @ApiOkResponse({ description: 'The user has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'User not found' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
