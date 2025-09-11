import { CreateProductDto } from './dto/create-user.dto';
import { UpdateProductDto } from './dto/update-user.dto';
import { Product } from './entities/products.entity';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<void>;
}
