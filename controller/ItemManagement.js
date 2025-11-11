import {
    add_item,
    delete_item,
    get_items,
    get_item_detail,
    update_item
} from "../model/ItemModel.js";

let selected_item_row = null;
let initialized = false;

// ==================== Load Item Table =======================
const load_item_table = () => {
    const $itemTableBody = $("#item-table tbody");
    if (!$itemTableBody.length) {
        console.error("Item table not found!");
        return;
    }

    $itemTableBody.empty();

    let item_list = get_items();
    console.log("Loading items:", item_list);

    if (item_list.length === 0) {
        $itemTableBody.append(`
            <tr>
                <td colspan="6" class="text-center text-muted">No items found</td>
            </tr>
        `);
        return;
    }

    item_list.forEach((obj, index) => {
        let tbl_row = `
        <tr data-index="${index}" data-item-code="${obj.item_code}">
            <td>${obj.item_code}</td>
            <td>${obj.name}</td>
            <td>${obj.category}</td>
            <td>$${obj.price}</td>
            <td>${obj.stock}</td>
            <td class="action-column">
                <div class="btn-group-action">
                    <button class="btn btn-sm btn-outline-primary me-1 item-edit-btn" data-index="${index}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger item-delete-btn" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>`;
        $itemTableBody.append(tbl_row);
    });
};

// ==================== Add Item =======================
const handleAddItem = () => {
    const item_code = $("#itemCode").val();
    const name = $("#itemName").val();
    const category = $("#itemCategory").val();
    const price = $("#itemPrice").val();
    const stock = $("#itemStock").val();

    if (!item_code || !name || !category || !price || !stock) {
        Swal.fire("Error", "Please fill all fields", "error");
        return;
    }

    if (price <= 0 || stock < 0) {
        Swal.fire("Error", "Price must be greater than 0 and stock cannot be negative", "error");
        return;
    }

    add_item(item_code, name, category, parseFloat(price), parseInt(stock));
    load_item_table();

    // Close modal and reset form
    $("#addItemModal").modal("hide");
    $("#addItemForm").trigger("reset");

    Swal.fire("Success", "Item added successfully!", "success");
};

// ==================== Update Item =======================
const handleUpdateItem = () => {
    if (selected_item_row === null) {
        Swal.fire("Warning", "Please select an item to update", "warning");
        return;
    }

    const item_code = $("#itemCode").val();
    const name = $("#itemName").val();
    const category = $("#itemCategory").val();
    const price = $("#itemPrice").val();
    const stock = $("#itemStock").val();

    if (!item_code || !name || !category || !price || !stock) {
        Swal.fire("Error", "Please fill all fields", "error");
        return;
    }

    if (price <= 0 || stock < 0) {
        Swal.fire("Error", "Price must be greater than 0 and stock cannot be negative", "error");
        return;
    }

    // Get item data to preserve the code
    const item_obj = get_item_detail(selected_item_row);
    if (!item_obj) {
        Swal.fire("Error", "Item not found!", "error");
        return;
    }

    const original_item_code = item_obj.item_code;

    console.log("Updating item - Index:", selected_item_row, "Code:", original_item_code);

    // Update the item
    const result = update_item(selected_item_row, original_item_code, name, category, parseFloat(price), parseInt(stock));

    if (result) {
        load_item_table();
        $("#addItemModal").modal("hide");
        $("#addItemForm").trigger("reset");
        selected_item_row = null;
        Swal.fire("Updated!", "Item updated successfully.", "success");
    } else {
        Swal.fire("Error!", "Failed to update item.", "error");
    }
};

// ==================== Delete Item =======================
const handleDeleteItem = (index) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            delete_item(index);
            load_item_table();
            selected_item_row = null;
            Swal.fire("Deleted!", "Item removed.", "success");
        }
    });
};

// ==================== Edit Item =======================
const handleEditItem = (index) => {
    console.log("Edit item button clicked for index:", index);

    selected_item_row = index;
    const item_obj = get_item_detail(selected_item_row);

    console.log("Item object:", item_obj);

    if (item_obj) {
        // Fill the form with item data
        $("#itemCode").val(item_obj.item_code);
        $("#itemName").val(item_obj.name);
        $("#itemCategory").val(item_obj.category);
        $("#itemPrice").val(item_obj.price);
        $("#itemStock").val(item_obj.stock);

        // Change modal to edit mode
        $("#addItemModal .modal-title").text("Edit Item");
        $("#addItemModal .btn-primary").text("Update Item");

        // Show the modal
        $("#addItemModal").modal("show");

        console.log("Item form filled with item data");
    } else {
        console.error("Item not found at index:", index);
        Swal.fire("Error", "Item not found!", "error");
    }
};

// ==================== Initialize Item Management =======================
const initializeItemManagement = () => {
    if (initialized) {
        console.log("Item Management already initialized");
        return;
    }

    console.log("Initializing Item Management...");

    // Load initial data
    load_item_table();

    // Add Item Button Click - Reset to add mode
    $(document).on("click", "[data-bs-target='#addItemModal']", function() {
        console.log("Add item button clicked");
        selected_item_row = null;
        $("#addItemForm").trigger("reset");
        $("#addItemModal .modal-title").text("Add New Item");
        $("#addItemModal .btn-primary").text("Save Item");
    });

    // Save/Update Button in Modal - SPECIFIC to item modal
    $("#addItemModal .btn-primary").off("click").on("click", function() {
        console.log("Item Save/Update button clicked, selected_item_row:", selected_item_row);
        if (selected_item_row === null) {
            handleAddItem();
        } else {
            handleUpdateItem();
        }
    });

    // Edit Item Button - SPECIFIC to item table
    $(document).off("click", ".item-edit-btn").on("click", ".item-edit-btn", function(e) {
        e.preventDefault();
        e.stopPropagation();

        const index = $(this).data("index");
        console.log("Item edit button clicked, index:", index);

        if (index !== undefined && index !== null) {
            handleEditItem(index);
        } else {
            console.error("No index found on item edit button");
        }
    });

    // Delete Item Button - SPECIFIC to item table
    $(document).off("click", ".item-delete-btn").on("click", ".item-delete-btn", function(e) {
        e.preventDefault();
        e.stopPropagation();

        const index = $(this).data("index");
        console.log("Item delete button clicked, index:", index);

        if (index !== undefined && index !== null) {
            handleDeleteItem(index);
        }
    });

    // Reset modal when hidden
    $("#addItemModal").on("hidden.bs.modal", function() {
        console.log("Item modal hidden, resetting form");
        selected_item_row = null;
        $("#addItemForm").trigger("reset");
        $("#addItemModal .modal-title").text("Add New Item");
        $("#addItemModal .btn-primary").text("Save Item");
    });

    // Debug: Log all items
    console.log("All items:", get_items());

    initialized = true;
    console.log("Item Management initialized successfully");
};

export { initializeItemManagement };