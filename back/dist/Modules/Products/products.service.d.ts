import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { CreateProductDto } from './dto/create-user.dto';
import { UpdateProductDto } from './dto/update-user.dto';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<void>;
}
