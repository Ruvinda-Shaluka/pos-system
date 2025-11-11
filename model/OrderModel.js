import {orders_db} from "../db/DB.js";
import OrderDTO from "../dto/OrderDTO.js";

// ================ Add Order ===================
const add_order = (customer_id, customer_name, items, subtotal, tax, total, notes = '') => {
    const order_id = "ORD-" + Date.now().toString().slice(-6);
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    let order_obj = new OrderDTO(order_id, customer_id, customer_name, items, subtotal, tax, total, date, 'Completed', notes);
    orders_db.push(order_obj);
    return order_obj.toObject();
}

// =============== Get Orders ===================
const get_orders = () => {
    return orders_db.map(order => order.toObject());
}

// =============== Get Recent Orders ===================
const get_recent_orders = (limit = 5) => {
    // Sort by date (newest first) and return limited number
    return orders_db
        .map(order => order.toObject())
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
}

// =============== Get Today's Orders ===================
const get_todays_orders = () => {
    const today = new Date().toISOString().split('T')[0];
    return orders_db.filter(order => order.date === today).map(order => order.toObject());
}

// =============== Get Today's Revenue ===================
const get_todays_revenue = () => {
    const today = new Date().toISOString().split('T')[0];
    const todaysOrders = orders_db.filter(order => order.date === today);
    return todaysOrders.reduce((total, order) => total + order.total, 0);
}

// =============== Get Order Detail ===================
const get_order_detail = (index) => {
    if (index >= 0 && index < orders_db.length) {
        return orders_db[index].toObject();
    }
    return null;
}

// ============== Delete Order ==================
const delete_order = (index) => {
    if (index >= 0 && index < orders_db.length) {
        return orders_db.splice(index, 1)[0].toObject();
    }
    return null;
}

// ============== Update Order Status ==================
const update_order_status = (index, status) => {
    if (index >= 0 && index < orders_db.length) {
        orders_db[index].status = status;
        return orders_db[index].toObject();
    }
    return null;
}

export {
    add_order,
    get_orders,
    get_recent_orders,
    get_todays_orders,
    get_todays_revenue,
    get_order_detail,
    delete_order,
    update_order_status
};