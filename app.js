// Selecting form and table from HTML
const form = document.getElementById('student-form');
const table = document.getElementById('student-table').getElementsByTagName('tbody')[0];

// When page loads, show saved students
window.onload = function() {
    showSavedStudents();
};

// When form is submitted
form.onsubmit = function(e) {
    e.preventDefault();
    
    // Geting the user input
    let studentName = document.getElementById('name').value;
    let id = document.getElementById('student-id').value;
    let studentEmail = document.getElementById('email').value;
    let phone = document.getElementById('contact').value;
    
    // Check if all boxes are filled
    if(studentName === '' || id === '' || studentEmail === '' || phone === '') {
        alert('Please fill all the boxes!');
        return;
    }
    
    // Check if inputs are correct
    if(!checkInputs(studentName, id, studentEmail, phone)) {
        alert('Something is wrong! Please check what you typed.');
        return;
    }
    
    // Add new student to table
    addStudentToTable(studentName, id, studentEmail, phone);
    
    // Save all students
    saveStudents();
    
    // Clear the form
    form.reset();
};

// function for adding student information to the table
function addStudentToTable(name, id, email, phone) {
    let row = table.insertRow();
    
    // Add cells with student info
    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = id;
    row.insertCell(2).innerHTML = email;
    row.insertCell(3).innerHTML = phone;
    
    // Add edit and delete buttons
    let buttons = row.insertCell(4);
    buttons.innerHTML = `
        <button onclick="editStudent(this)">Edit</button>
        <button onclick="deleteStudent(this)">Delete</button>
    `;
}

// function for editing the student information
function editStudent(button) {
    let row = button.parentNode.parentNode;
    
    // Put student info back in form
    document.getElementById('name').value = row.cells[0].innerHTML;
    document.getElementById('student-id').value = row.cells[1].innerHTML;
    document.getElementById('email').value = row.cells[2].innerHTML;
    document.getElementById('contact').value = row.cells[3].innerHTML;
    
    // Remove student from table
    row.remove();
    
    // Save changes
    saveStudents();
}

// function for Deleteing a student
function deleteStudent(button) {
    let row = button.parentNode.parentNode;
    row.remove();
    saveStudents();
}

// Validating user input using expressions 
function checkInputs(name, id, email, phone) {
    // Name should only have letters
    if(!/^[A-Za-z\s]+$/.test(name)) {
        return false;
    }
    
    // ID should only have numbers
    if(!/^\d+$/.test(id)) {
        return false;
    }
    
    // Email should have @ and .
    if(!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        return false;
    }
    
    // Phone should only have numbers
    if(!/^\d+$/.test(phone)) {
        return false;
    }
    
    return true;
}

// Save students to local storage
function saveStudents() {
    let students = [];
    
    // Get all rows from table
    for(let row of table.rows) {
        let student = {
            name: row.cells[0].innerHTML,
            id: row.cells[1].innerHTML,
            email: row.cells[2].innerHTML,
            phone: row.cells[3].innerHTML
        };
        students.push(student);
    }
    
    // Save to local storage
    localStorage.setItem('students', JSON.stringify(students));
}

// Show saved students when page loads
function showSavedStudents() {
    // Get saved students from local storage
    let savedStudents = localStorage.getItem('students');
    
    if(savedStudents) {
        let students = JSON.parse(savedStudents);
        
        // Add each student to table
        for(let student of students) {
            addStudentToTable(student.name, student.id, student.email, student.phone);
        }
    }
}