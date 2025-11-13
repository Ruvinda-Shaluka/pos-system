let customers_db = [];
let items_db = [];
let orders_db = [];

// Dummy Customers
customers_db = [
    {
        _customer_id: "CUST-001",
        _name: "John Smith",
        _email: "john@example.com",
        _phone: "(555) 123-4567",
        _address: "123 Main St, City"
    },
    {
        _customer_id: "CUST-002",
        _name: "Sarah Johnson",
        _email: "sarah@example.com",
        _phone: "(555) 987-6543",
        _address: "456 Oak Ave, Town"
    }
];

// Dummy Items
items_db = [
    {
        _item_code: "ITM-001",
        _name: "Laptop",
        _category: "electronics",
        _price: 899.99,
        _stock: 15
    },
    {
        _item_code: "ITM-002",
        _name: "Wireless Mouse",
        _category: "electronics",
        _price: 29.99,
        _stock: 42
    }
];

// Dummy Orders
orders_db = [];

export { customers_db, items_db, orders_db };