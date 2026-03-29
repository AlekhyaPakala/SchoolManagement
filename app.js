let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

/* LOGIN */
function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;
    let error = document.getElementById("error");

    if (u === "admin" && p === "1234") {
        window.location = "dashboard.html";
    } else {
        error.innerText = "❌ Invalid username or password";
    }
}

/* SHOW PASSWORD */
function togglePassword() {
    let pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}

/* ADD / EDIT */
function addStudent() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value;

    if (!name || !age || !course) {
        alert("Fill all fields");
        return;
    }

    if (editIndex === -1) {
        students.push({ name, age, course });
    } else {
        students[editIndex] = { name, age, course };
        editIndex = -1;
    }

    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

/* DISPLAY */
function displayStudents(data = students) {
    let container = document.getElementById("studentContainer");
    if (!container) return;

    container.innerHTML = "";
    document.getElementById("count").innerText = students.length;

    data.forEach((s, i) => {
        container.innerHTML += `
        <div class="student-card">
            <h3>${s.name}</h3>
            <p>Age: ${s.age}</p>
            <p>Course: ${s.course}</p>
            <button class="edit-btn" onclick="editStudent(${i})">Edit</button>
            <button class="delete-btn" onclick="deleteStudent(${i})">Delete</button>
        </div>`;
    });
}

/* EDIT */
function editStudent(i) {
    let s = students[i];
    document.getElementById("name").value = s.name;
    document.getElementById("age").value = s.age;
    document.getElementById("course").value = s.course;
    editIndex = i;
}

/* DELETE */
function deleteStudent(i) {
    students.splice(i, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

/* SEARCH */
function searchStudent() {
    let val = document.getElementById("search").value.toLowerCase();
    let filtered = students.filter(s => s.name.toLowerCase().includes(val));
    displayStudents(filtered);
}

/* DARK MODE */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

/* LOGOUT */
function logout() {
    window.location = "index.html";
}

displayStudents();

function displayStudents(data = students) {
    let container = document.getElementById("studentContainer");
    if (!container) return;

    container.innerHTML = "";
    document.getElementById("count").innerText = students.length;

    // ✅ If no data found
    if (data.length === 0) {
        container.innerHTML = `
            <p style="text-align:center; font-size:18px; color:gray;">
                ❌ No student found
            </p>
        `;
        return;
    }

    data.forEach((s, i) => {
        container.innerHTML += `
        <div class="student-card">
            <h3>${s.name}</h3>
            <p>Age: ${s.age}</p>
            <p>Course: ${s.course}</p>
            <button class="edit-btn" onclick="editStudent(${i})">Edit</button>
            <button class="delete-btn" onclick="deleteStudent(${i})">Delete</button>
        </div>`;
    });
}
