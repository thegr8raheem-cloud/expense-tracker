


function openSidebar() {
    document.getElementById("categoryTotalsMobile").innerHTML =
        document.getElementById("categoryTotals").innerHTML;
    document.getElementById("mobileSidebar").classList.add("open");  
    document.getElementById("sidebarOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeSidebar() {
    document.getElementById("mobileSidebar").classList.remove("open");
    document.getElementById("sidebarOverlay").classList.remove("open");
    document.body.style.overflow = "";
}

// function getDateLabel(dateStr) {
//     const today = new Date();
//     const expenseDate = new Date(dateStr);

//     // remove time difference issue
//     today.setHours(0,0,0,0);
//     expenseDate.setHours(0,0,0,0);

//     const diffTime = today - expenseDate;
//     const diffDays = diffTime / (1000 * 60 * 60 * 24);

//     if (diffDays === 0) return "Today";
//     if (diffDays === 1) return "Yesterday";

//     return expenseDate.toLocaleDateString();
// }
// ---------- DATE LABEL ----------






function addExpense() {
    const expense = {
        title: $("#title").val(),
        paymentMethod: $("#payment_method").val(),
        category: $("#category").val(),
        amount: parseFloat($("#amount").val()),
        date: $("#date").val()
    };

    $.ajax({
        url: "/expenses",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(expense),
        success: function(message) {
            Swal.fire({
                icon: "success",
                title: message
            });
            loadExpenses();
        }
    });

    $("#title, #category, #payment_method, #amount, #date").val("");
}








// edit/update function
function updateExpense() {

    const updated = {
        title: $("#edit_title").val(),
        category: $("#edit_category").val(),
        paymentMethod: $("#edit_payment").val(),
        amount: parseFloat($("#edit_amount").val()),
        date: $("#edit_date").val()
    };

    $.ajax({
        url: "/expenses/" + currentEditId,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updated),
        success: function(message) {
            Swal.fire({
                title: message,
                icon: "success"
            });
            closeModal();
            loadExpenses();
        }
    })
        
}








// delete function
function deleteExpense(id) {
    
    Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#4F39F6",
    confirmButtonText: "Delete"
    })
    .then((result) => {
    if (result.isConfirmed) {
        $.ajax({
            url: "/expenses/" + id,
            method: "DELETE",
            success: function(message) {
                Swal.fire({
                    title: "Deleted",
                    text: message,
                    icon: "success"
                });
                loadExpenses();
            }
        });
    }
});
    
}










// load/fetch/get function


let table;

function loadExpenses() {

    $.ajax({
        url: "/expenses",
        method: "GET",
        success: function(expense) {

            expense.sort((a, b) => new Date(b.date) - new Date(a.date));
            renderSidebar(expense);

            if (!table) {

                table = new Tabulator("#expenseTable", {
                    data: expense,
                    layout: "fitData",
                    pagination: "local",
                    paginationSize: 7,
                    movableColumns: true,
                    reactiveData: true,
                    layout: "fitColumns",
                    responsiveLayout: "collapse",
                    placeholder: "No expenses found",
                    rowHeight: 42,
                    columns: [
                        {
                            title: "Title",
                            field: "title",
                            headerFilter: "input",
                            headerFilterPlaceholder: "Search title..."
                        },
                        {
                            title: "Category",
                            field: "category",
                            headerFilter: "input",
                            headerFilterPlaceholder: "Search category..."
                        },
                        {
                            title: "Payment",
                            field: "paymentMethod",
                            headerFilter: "input",
                            headerFilterPlaceholder: "Search payment..."
                        },
                        {
                            title: "Amount",
                            field: "amount",
                            headerFilter: "input",
                            headerFilterPlaceholder: "Search amount..."
                        },
                        {
                            title: "Date",
                            field: "date",
                            headerFilter: "input",
                            headerFilterPlaceholder: "Search date..."
                        },

                        {
                            title: "Actions",
                            formatter: function(cell) {
                            let id = cell.getRow().getData().id;

                            return `
                                <div class="flex gap-2">
                                    <button onclick="openEditModal(${id})"
                                        class="px-3 cursor-pointer py-[6px] text-xs rounded-[4px] bg-indigo-600 hover:bg-indigo-500 text-white">
                                        Edit
                                    </button>

                                    <button onclick="deleteExpense(${id})"
                                        class="px-3 cursor-pointer py-[6px] text-xs rounded-[4px] bg-red-600 hover:bg-red-500 text-white">
                                        Delete
                                    </button>
                                </div>
                            `;
                        }
                        }
                    ]
                });

            } else {
                table.setData(expense);
            }
        }
    })
}
loadExpenses();







function getDateLabel(dateStr) {

    const today = new Date();
    const expenseDate = new Date(dateStr);

    today.setHours(0, 0, 0, 0);
    expenseDate.setHours(0, 0, 0, 0);

    const diffTime = today - expenseDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";

    return expenseDate.toDateString();
}




function renderSidebar(data) {

    let $categoryDiv = $("#categoryTotals");
    $categoryDiv.empty();

    let total = 0;
    let grouped = {};

    data.forEach(expense => {

        total += Number(expense.amount);

        let date = getDateLabel(expense.date);

        if (!grouped[date]) {
            grouped[date] = {};
        }

        if (!grouped[date][expense.category]) {
            grouped[date][expense.category] = 0;
        }

        grouped[date][expense.category] += Number(expense.amount);
    });

    let sortedKeys = Object.keys(grouped).sort((a, b) => {

        if (a === "Today") return -1;
        if (b === "Today") return 1;

        if (a === "Yesterday") return -1;
        if (b === "Yesterday") return 1;

        return new Date(b) - new Date(a);
    });

    $categoryDiv.append(`
        <li class="text-green-400 font-bold text-lg mb-3">
            Total: PKR ${total}
        </li>
    `);

    sortedKeys.forEach(label => {

        $categoryDiv.append(`
            <li class="text-indigo-400 font-bold mt-4">
                ${label}
            </li>
        `);

        for (let cat in grouped[label]) {

            $categoryDiv.append(`
                <li class="ml-4 text-white">
                    ${cat}: PKR ${grouped[label][cat]}
                </li>
            `);
        }
    });

    // sync to mobile drawer if it's open
    if (document.getElementById("categorySidebar").classList.contains("open")) {
        document.getElementById("categoryTotalsMobile").innerHTML = $categoryDiv.html();
    }
}





function downloadExcel() {
  
    let expenseData = table.getData("all");
    
    // SORT BY DATE
    // data.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // optional: clean data for excel
    const formattedData = expenseData.map((expense, index) => ({
        // "S.No": index + 1,
        Title: expense.title,
        Category: expense.category,
        PaymentMethod: expense.paymentMethod,
        Amount: expense.amount,
        Date: expense.date
    }));

    // convert to sheet
    let ws = XLSX.utils.json_to_sheet(formattedData);
    let wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Expenses");

    XLSX.writeFile(wb, "expenses.xlsx");

}














// edit modal funtions
// raheem
function openEditModal(id) {

    $.ajax({
        url: "/expenses",
        method: "GET",
        success: function(data) {

            const expense = data.find(expense => expense.id === id);

            currentEditId = id;

            $("#edit_title").val(expense.title);
            $("#edit_category").val(expense.category);
            $("#edit_payment").val(expense.paymentMethod);
            $("#edit_amount").val(expense.amount);
            $("#edit_date").val(expense.date);

            $("#editModal").removeClass("hidden");
        }
    });
}

function closeModal() {
    $("#editModal").addClass("hidden");
}