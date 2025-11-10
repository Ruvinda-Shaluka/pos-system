// model/CustomerModel.js
import {customers_db} from "../db/DB.js";
import CustomerDTO from "../dto/CustomerDTO.js";

// ================ Add Customer ===================
const add_customer = (customer_id, name, email, phone, address) => {
    let customer_obj = new CustomerDTO(customer_id, name, email, phone, address);
    customers_db.push(customer_obj);
    return customer_obj.toObject();
}

// ============== Delete Customer ==================
const delete_customer = (index) => {
    if (index >= 0 && index < customers_db.length) {
        return customers_db.splice(index, 1)[0].toObject();
    }
    return null;
}

// =============== Get Customers ===================
const get_customers = () => {
    return customers_db.map(customer => customer.toObject());
}

// =============== Get Customer Detail ===================
const get_customer_detail = (index) => {
    if (index >= 0 && index < customers_db.length) {
        return customers_db[index].toObject();
    }
    return null;
}

// ============== Update Customer ==================
const update_customer = (index, customer_id, name, email, phone, address) => {
    console.log("Updating customer at index:", index, "with ID:", customer_id);

    if (index >= 0 && index < customers_db.length) {
        // Verify that the customer at this index has the expected ID
        if (customers_db[index].customer_id === customer_id) {
            customers_db[index] = new CustomerDTO(customer_id, name, email, phone, address);
            console.log("Customer updated successfully at index:", index);
            return customers_db[index].toObject();
        } else {
            console.error("Customer ID mismatch at index:", index);
            // Fallback: find by customer_id
            return update_customer_by_id(customer_id, name, email, phone, address);
        }
    } else {
        console.error("Invalid index for update:", index);
        // Fallback: find by customer_id
        return update_customer_by_id(customer_id, name, email, phone, address);
    }
}

// ============== Update Customer by ID ==================
const update_customer_by_id = (customer_id, name, email, phone, address) => {
    const index = customers_db.findIndex(customer => customer.customer_id === customer_id);
    if (index !== -1) {
        customers_db[index] = new CustomerDTO(customer_id, name, email, phone, address);
        console.log("Customer updated by ID at index:", index);
        return customers_db[index].toObject();
    }
    console.error("Customer not found with ID:", customer_id);
    return null;
}

// ============== Find Customer by ID ==================
const find_customer_by_id = (customer_id) => {
    const index = customers_db.findIndex(customer => customer.customer_id === customer_id);
    return index !== -1 ? customers_db[index].toObject() : null;
}

// ============== Find Customer Index by ID ==================
const find_customer_index_by_id = (customer_id) => {
    return customers_db.findIndex(customer => customer.customer_id === customer_id);
}

export {
    add_customer,
    delete_customer,
    get_customers,
    get_customer_detail,
    update_customer,
    update_customer_by_id,
    find_customer_by_id,
    find_customer_index_by_id
};