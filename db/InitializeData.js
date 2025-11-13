import { customers_db, items_db, orders_db } from './DB.js';
import CustomerDTO from '../dto/CustomerDTO.js';
import ItemDTO from '../dto/ItemDTO.js';

const initializeDummyData = () => {
    console.log("Starting dummy data initialization...");

    // Clear existing data
    customers_db.length = 0;
    items_db.length = 0;
    orders_db.length = 0;

    try {
        // Add dummy customers using DTO
        const customer1 = new CustomerDTO("CUST-001", "John Smith", "john@example.com", "(555) 123-4567", "123 Main St, City");
        const customer2 = new CustomerDTO("CUST-002", "Sarah Johnson", "sarah@example.com", "(555) 987-6543", "456 Oak Ave, Town");
        const customer3 = new CustomerDTO("CUST-003", "Michael Brown", "michael@example.com", "(555) 456-7890", "789 Pine Rd, Village");

        customers_db.push(customer1);
        customers_db.push(customer2);
        customers_db.push(customer3);

        // Add dummy items using DTO
        const item1 = new ItemDTO("ITM-001", "Laptop", "electronics", 899.99, 15);
        const item2 = new ItemDTO("ITM-002", "Wireless Mouse", "electronics", 29.99, 42);
        const item3 = new ItemDTO("ITM-003", "Desk Chair", "home", 149.99, 8);
        const item4 = new ItemDTO("ITM-004", "Notebook", "office", 4.99, 100);
        const item5 = new ItemDTO("ITM-005", "Coffee Mug", "home", 12.99, 25);

        items_db.push(item1);
        items_db.push(item2);
        items_db.push(item3);
        items_db.push(item4);
        items_db.push(item5);

        console.log("Dummy data initialized successfully");
        console.log("Customers:", customers_db.length);
        console.log("Items:", items_db.length);
        console.log("Orders:", orders_db.length);

        return true;
    } catch (error) {
        console.error("Error initializing dummy data:", error);
        return false;
    }
};

export { initializeDummyData };