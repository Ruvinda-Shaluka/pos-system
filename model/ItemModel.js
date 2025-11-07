import {items_db} from "../db/DB";
import ItemDTO from "../dto/ItemDTO.js";

// ================ Add Item ===================
const add_item = (item_code, name, category, price, stock) => {
    let item_obj = new ItemDTO(item_code, name, category, price, stock);
    items_db.push(item_obj);
}

// ============== Delete Item ==================
const delete_item = (index) => {
    items_db.splice(index, 1);
}
// =============== Get Items ===================
const get_items = () => {
    return items_db;
}

// =============== Get Item Detail ===================
const get_item_detail = (index) => {
    return items_db[index];
}

// ============== Update Item ==================
const update_item = (item_code, name, category, price, stock) => {
    const item_index = items_db.findIndex(item => item.item_code === item_code);

    if (item_index !== -1) {
        items_db[item_index] = new ItemDTO(item_code, name, category, price, stock);
        return true;
    }

    return false;
}

export {add_item, delete_item, get_items, get_item_detail, update_item};