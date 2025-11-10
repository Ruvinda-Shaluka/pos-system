import {items_db} from "../db/DB.js";
import ItemDTO from "../dto/ItemDTO.js";

// ================ Add Item ===================
const add_item = (item_code, name, category, price, stock) => {
    let item_obj = new ItemDTO(item_code, name, category, price, stock);
    items_db.push(item_obj);
    return item_obj.toObject();
}

// ============== Delete Item ==================
const delete_item = (index) => {
    if (index >= 0 && index < items_db.length) {
        return items_db.splice(index, 1)[0].toObject();
    }
    return null;
}

// =============== Get Items ===================
const get_items = () => {
    return items_db.map(item => item.toObject());
}

// =============== Get Item Detail ===================
const get_item_detail = (index) => {
    if (index >= 0 && index < items_db.length) {
        return items_db[index].toObject();
    }
    return null;
}

// ============== Update Item ==================
const update_item = (index, item_code, name, category, price, stock) => {
    if (index >= 0 && index < items_db.length) {
        items_db[index] = new ItemDTO(item_code, name, category, price, stock);
        return items_db[index].toObject();
    }
    return null;
}

// ============== Find Item by Code ==================
const find_item_by_code = (item_code) => {
    const index = items_db.findIndex(item => item.item_code === item_code);
    return index !== -1 ? items_db[index].toObject() : null;
}

export {add_item, delete_item, get_items, get_item_detail, update_item, find_item_by_code};