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
    console.log("Updating item at index:", index, "with code:", item_code);

    if (index >= 0 && index < items_db.length) {
        // Verify that the item at this index has the expected code
        if (items_db[index].item_code === item_code) {
            items_db[index] = new ItemDTO(item_code, name, category, price, stock);
            console.log("Item updated successfully at index:", index);
            return items_db[index].toObject();
        } else {
            console.error("Item code mismatch at index:", index);
            // Fallback: find by item_code
            return update_item_by_code(item_code, name, category, price, stock);
        }
    } else {
        console.error("Invalid index for update:", index);
        // Fallback: find by item_code
        return update_item_by_code(item_code, name, category, price, stock);
    }
}

// ============== Update Item by Code ==================
const update_item_by_code = (item_code, name, category, price, stock) => {
    const index = items_db.findIndex(item => item.item_code === item_code);
    if (index !== -1) {
        items_db[index] = new ItemDTO(item_code, name, category, price, stock);
        console.log("Item updated by code at index:", index);
        return items_db[index].toObject();
    }
    console.error("Item not found with code:", item_code);
    return null;
}

// ============== Find Item by Code ==================
const find_item_by_code = (item_code) => {
    const index = items_db.findIndex(item => item.item_code === item_code);
    return index !== -1 ? items_db[index].toObject() : null;
}

// ============== Find Item Index by Code ==================
const find_item_index_by_code = (item_code) => {
    return items_db.findIndex(item => item.item_code === item_code);
}

export {
    add_item,
    delete_item,
    get_items,
    get_item_detail,
    update_item,
    update_item_by_code,
    find_item_by_code,
    find_item_index_by_code
};