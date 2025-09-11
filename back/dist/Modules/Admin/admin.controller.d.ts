import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboardSummary(): Promise<{
        userCount: number;
        productCount: number;
        orderCount: number;
        latestOrders: import("../Orders/entities/orders.entity").Order[];
    }>;
}
