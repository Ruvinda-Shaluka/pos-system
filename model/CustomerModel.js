import {customers_db} from "../db/DB";
import CustomerDTO from "../dto/CustomerDTO.js";

// ================ Add Customer ===================
const add_customer = (customer_id,name, email, phone, address) => {
    let customer_obj = new CustomerDTO(customer_id, name, email, phone, address);
    customers_db.push(customer_obj);
}

// ============== Delete Customer ==================
const delete_customer = (index) => {
    customers_db.splice(index, 1);
}
// =============== Get Customers ===================
const get_customers = () => {
    return customers_db;
}

// =============== Get Customer Detail ===================
const get_customer_detail = (index) => {
    return customers_db[index];
}

// ============== Update Customer ==================
const update_customer_complete = (customer_id, name, email, phone, address) => {
    const customer_index = customers_db.findIndex(customer => customer.customer_id === customer_id);

    if (customer_index !== -1) {
        customers_db[customer_index] = new CustomerDTO(customer_id, name, email, phone, address);
        return true;
    }

    return false;
}

export {add_customer, delete_customer, get_customers, get_customer_detail, update_customer_complete};