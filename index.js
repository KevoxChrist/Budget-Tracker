//Income Field
const budgetDisplay = document.querySelectorAll(".budget-text");
//const budgetButton = document.querySelectorAll(".budget-btn");
//const budgetInput = document.querySelectorAll(".budget-input");

//Expense Description Inputs
let expenseDescription = document.querySelectorAll(".description-input");


//Expense Amount Input
let expenseAmount = document.querySelectorAll(".expense-amount-input");

//New Expense Category
const addExpenseCategory = document.querySelector("#new-category-input");



//ADD NEW EXPENSES (description and amount)
//HANDLES NEW ADDED EXPENSES INSIDE OF EACH EXPENSE CATEGORY
document.addEventListener('DOMContentLoaded', function() {
    const addInputBtn = document.querySelectorAll(".addInputBtn");

    addInputBtn.forEach((button, index) => {
        button.addEventListener('click', function() {
            
            const container = document.querySelectorAll(".expense-category");
            if (container[index] && container[index].classList.contains('expense-category')) {
              
                newExpenses(container[index], addInputBtn[index]);
            }
        });
    });
});
        
       



//Expense Button (SAVE FOR LATER WHEN YOU WANT TO KEEP THE ADD BTN IN AT THE END OF EACH SECTION)
// const addInputButton = document.createElement('button');
// button.classList = "addInputBtn";
// button.style = "width: 5rem; height: 1.25rem;";
// button.innerText = 'Add';


//Creates Html input elements and appends to the expense-category container
function newExpenses(container, addBtn){

//Input container (DIV)
const div = document.createElement('div');
div.className ="input-container";

//Expense Description input
const descriptionInput = document.createElement('input');
descriptionInput.className = "description-input";
descriptionInput.type = 'text';

//Expense amount input
const expenseInput = document.createElement('input');
expenseInput.classList = "expense-amount-input";
expenseInput.type = 'text';

// //Expense name
// const categoryName = document.createElement('h4');
// categoryName.textContent = `${addExpenseCategory.value}`;

//Expense Category append description and expense input 
div.append(descriptionInput)
div.append(expenseInput)

//Appends the div before the add button
container.insertBefore(div, addBtn);


}

//ADD NEW EXPENSE CATEGORY
//This triggers whenever you exit "focus" from the text field. I thought it would be better than having to use a button. More Modern in my opinion.
addExpenseCategory.addEventListener("blur", () => {
    // Getting the categories name
    const categoryValue = addExpenseCategory.value.trim();
    
    if (!categoryValue) return;
    
    // Create category name header
    const categoryName = document.createElement('h4');
    categoryName.textContent = `${categoryValue}:`;
    
    // Create new category container
    const newCategory = document.createElement('div');
    newCategory.className = `${categoryValue.toLowerCase()} expense-category`;
    
    // Create the initial input container
    const div = document.createElement('div');
    div.className = "input-container";
    
    // Create initial inputs
    const descriptionInput = document.createElement('input');
    descriptionInput.className = "description-input";
    descriptionInput.type = 'text';
    descriptionInput.placeholder = 'Description...';
    
    const expenseInput = document.createElement('input');
    expenseInput.className = "expense-amount-input";
    expenseInput.type = 'number';
    expenseInput.placeholder = 'Amount...';
    
    // Append inputs to initial container
    div.appendChild(descriptionInput);
    div.appendChild(expenseInput);
    
    // Create add button
    const addBtn = document.createElement('button');
    addBtn.className = "addInputBtn";
    addBtn.textContent = "Add Expense";
    
    // Add event listener to the new button
    addBtn.addEventListener('click', function() {
        newExpenses(newCategory, addBtn);
    });
    
    // Appending everything that the expense category should have
    newCategory.appendChild(categoryName);
    newCategory.appendChild(div);
    newCategory.appendChild(addBtn);
    
    // Append to expense section
    const expenseSection = document.querySelector(".expense-section");
    const addExpenseCategoryElement = addExpenseCategory.parentElement;
    expenseSection.insertBefore(newCategory, addExpenseCategoryElement); // critical because the add new section box should always be at the bottom of the expense list
    
    
    // Clear the input field
    addExpenseCategory.value = '';
});


class Budget {




    plannedExpenses(){
        function updatePlannedExpenses() {
    let total = 0;


    const expenseCategories = document.querySelectorAll(".expense-category");

    expenseCategories.forEach(category => {
        //If the class has a name of "income" it skips it essentially
        if (category.classList.contains("income")) {
            return;
        }

        
        const inputs = category.querySelectorAll(".expense-amount-input");

        //this goes through each expense input and then passes it into "total" if it is a number. More DOM manipulation which is pretty cool 
        inputs.forEach(input => {
            const value = parseInt(input.value);
            if (!isNaN(value)) {
                total += value;
            }
        });
    });

    
    if (budgetDisplay[1]) {
        budgetDisplay[1].textContent = `Planned Expenses: $${total}`;
    }
}


document.addEventListener('input', function(e) {
    if (e.target.classList.contains('expense-amount-input')) {
        updatePlannedExpenses(); //Updates on input when the user types
    }
});

    }




}


//Update for Planned expenses

let budget = new Budget();

budget.plannedExpenses();
