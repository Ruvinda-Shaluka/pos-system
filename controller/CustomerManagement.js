import {
    add_customer,
    delete_customer,
    get_customers,
    get_customer_detail,
    update_customer
} from "../model/CustomerModel.js";

let selected_customer_row = null;
let initialized = false;

// ==================== Load Customer Table =======================
const load_customer_table = () => {
    const $customerTableBody = $("#customer-table tbody");
    if (!$customerTableBody.length) {
        console.error("Customer table not found!");
        return;
    }

    $customerTableBody.empty();

    let customer_list = get_customers();
    console.log("Loading customers:", customer_list);

    if (customer_list.length === 0) {
        $customerTableBody.append(`
            <tr>
                <td colspan="6" class="text-center text-muted">No customers found</td>
            </tr>
        `);
        return;
    }

    customer_list.forEach((obj, index) => {
        let tbl_row = `
        <tr data-index="${index}" data-customer-id="${obj.customer_id}">
            <td>${obj.customer_id}</td>
            <td>${obj.name}</td>
            <td>${obj.email}</td>
            <td>${obj.phone}</td>
            <td>${obj.address}</td>
            <td class="action-column">
                <div class="btn-group-action">
                    <button class="btn btn-sm btn-outline-primary me-1 customer-edit-btn" data-index="${index}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger customer-delete-btn" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>`;
        $customerTableBody.append(tbl_row);
    });
};

// ==================== Add Customer =======================
const handleAddCustomer = () => {
    const name = $("#customerName").val();
    const email = $("#customerEmail").val();
    const phone = $("#customerPhone").val();
    const address = $("#customerAddress").val();

    if (!name || !email || !phone || !address) {
        Swal.fire("Error", "Please fill all fields", "error");
        return;
    }

    // Generate customer ID
    const customer_id = "CUST-" + Date.now().toString().slice(-6);

    add_customer(customer_id, name, email, phone, address);
    load_customer_table();

    // Close modal and reset form
    $("#addCustomerModal").modal("hide");
    $("#addCustomerForm").trigger("reset");

    Swal.fire("Success", "Customer added successfully!", "success");
};

// ==================== Update Customer =======================
const handleUpdateCustomer = () => {
    if (selected_customer_row === null) {
        Swal.fire("Warning", "Please select a customer to update", "warning");
        return;
    }

    const name = $("#customerName").val();
    const email = $("#customerEmail").val();
    const phone = $("#customerPhone").val();
    const address = $("#customerAddress").val();

    if (!name || !email || !phone || !address) {
        Swal.fire("Error", "Please fill all fields", "error");
        return;
    }

    // Get customer data to preserve the ID
    const customer_obj = get_customer_detail(selected_customer_row);
    if (!customer_obj) {
        Swal.fire("Error", "Customer not found!", "error");
        return;
    }

    const customer_id = customer_obj.customer_id;

    console.log("Updating customer - Index:", selected_customer_row, "ID:", customer_id);

    // Update the customer
    const result = update_customer(selected_customer_row, customer_id, name, email, phone, address);

    if (result) {
        load_customer_table();
        $("#addCustomerModal").modal("hide");
        $("#addCustomerForm").trigger("reset");
        selected_customer_row = null;
        Swal.fire("Updated!", "Customer updated successfully.", "success");
    } else {
        Swal.fire("Error!", "Failed to update customer.", "error");
    }
};

// ==================== Delete Customer =======================
const handleDeleteCustomer = (index) => {
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
            delete_customer(index);
            load_customer_table();
            selected_customer_row = null;
            Swal.fire("Deleted!", "Customer record removed.", "success");
        }
    });
};

// ==================== Edit Customer =======================
const handleEditCustomer = (index) => {
    console.log("Edit customer button clicked for index:", index);

    selected_customer_row = index;
    const customer_obj = get_customer_detail(selected_customer_row);

    console.log("Customer object:", customer_obj);

    if (customer_obj) {
        // Fill the form with customer data
        $("#customerName").val(customer_obj.name);
        $("#customerEmail").val(customer_obj.email);
        $("#customerPhone").val(customer_obj.phone);
        $("#customerAddress").val(customer_obj.address);

        // Change modal to edit mode
        $("#addCustomerModal .modal-title").text("Edit Customer");
        $("#addCustomerModal .btn-primary").text("Update Customer");

        // Show the modal
        $("#addCustomerModal").modal("show");

        console.log("Customer form filled with customer data");
    } else {
        console.error("Customer not found at index:", index);
        Swal.fire("Error", "Customer not found!", "error");
    }
};

// ==================== Initialize Customer Management =======================
const initializeCustomerManagement = () => {
    if (initialized) {
        console.log("Customer Management already initialized");
        return;
    }

    console.log("Initializing Customer Management...");

    // Load initial data
    load_customer_table();

    // Add Customer Button Click - Reset to add mode
    $(document).on("click", "[data-bs-target='#addCustomerModal']", function() {
        console.log("Add customer button clicked");
        selected_customer_row = null;
        $("#addCustomerForm").trigger("reset");
        $("#addCustomerModal .modal-title").text("Add New Customer");
        $("#addCustomerModal .btn-primary").text("Save Customer");
    });

    // Save/Update Button in Modal - SPECIFIC to customer modal
    $("#addCustomerModal .btn-primary").off("click").on("click", function() {
        console.log("Customer Save/Update button clicked, selected_customer_row:", selected_customer_row);
        if (selected_customer_row === null) {
            handleAddCustomer();
        } else {
            handleUpdateCustomer();
        }
    });

    // Edit Customer Button - SPECIFIC to customer table
    $(document).off("click", ".customer-edit-btn").on("click", ".customer-edit-btn", function(e) {
        e.preventDefault();
        e.stopPropagation();

        const index = $(this).data("index");
        console.log("Customer edit button clicked, index:", index);

        if (index !== undefined && index !== null) {
            handleEditCustomer(index);
        } else {
            console.error("No index found on customer edit button");
        }
    });

    // Delete Customer Button - SPECIFIC to customer table
    $(document).off("click", ".customer-delete-btn").on("click", ".customer-delete-btn", function(e) {
        e.preventDefault();
        e.stopPropagation();

        const index = $(this).data("index");
        console.log("Customer delete button clicked, index:", index);

        if (index !== undefined && index !== null) {
            handleDeleteCustomer(index);
        }
    });

    // Reset modal when hidden
    $("#addCustomerModal").on("hidden.bs.modal", function() {
        console.log("Customer modal hidden, resetting form");
        selected_customer_row = null;
        $("#addCustomerForm").trigger("reset");
        $("#addCustomerModal .modal-title").text("Add New Customer");
        $("#addCustomerModal .btn-primary").text("Save Customer");
    });

    // Debug: Log all customers
    console.log("All customers:", get_customers());

    initialized = true;
    console.log("Customer Management initialized successfully");
};

export { initializeCustomerManagement };