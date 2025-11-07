import {orders_db} from "../db/DB";
import OrderDTO from "../dto/OrderDTO.js";

// ================ Add Order ===================
const add_order = (order_id, customer_name, order_date, item_qty, total_amount) => {
    let order_obj = new OrderDTO(order_id, customer_name, order_date, item_qty, total_amount);
    orders_db.push(order_obj);
}

// ============== Delete Order ==================
const delete_order = (index) => {
    orders_db.splice(index, 1);
}

// =============== Get Orders ===================
const get_orders = () => {
    return orders_db;
}

// =============== Get Order Detail ===================
const get_order_detail = (index) => {
    return orders_db[index];
}

// ============== Update Order ==================
const update_order = (order_id, customer_name, order_date, item_qty, total_amount) => {
    const order_index = orders_db.findIndex(order => order.order_id === order_id);

    if (order_index !== -1) {
        orders_db[order_index] = new OrderDTO(order_id, customer_name, order_date, item_qty, total_amount);
        return true;
    }

    return false;

}

export {add_order, delete_order, get_orders, get_order_detail, update_order};