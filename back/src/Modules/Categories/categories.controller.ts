import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/categories.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiCreatedResponse({
    description: 'The category has been successfully created.',
    type: Category,
  })
  @ApiBody({
    type: CreateCategoryDto,
    examples: {
      a: {
        summary: 'Example Category Creation',
        value: {
          name: 'Books',
          description: 'All types of literary works.',
        },
      },
    },
  })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all categories' })
  @ApiOkResponse({
    description: 'Successfully retrieved a list of all categories.',
    type: [Category],
  })
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single category by ID' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the category',
    example: 'b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the category.',
    type: Category,
  })
  @ApiNotFoundResponse({ description: 'Category not found' })
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing category' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the category',
    example: 'b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e',
  })
  @ApiOkResponse({
    description: 'The category has been successfully updated.',
    type: Category,
  })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @ApiBody({
    type: UpdateCategoryDto,
    examples: {
      a: {
        summary: 'Example Category Update',
        value: {
          name: 'Fiction',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the category',
    example: 'b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e',
  })
  @ApiOkResponse({ description: 'The category has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
