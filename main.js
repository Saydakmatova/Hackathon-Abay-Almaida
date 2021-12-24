const API = "http://localhost:8000/stydents";
let inpName = $('.inp-name');
let inpSurname = $('.inp-surname');
let inpPhone = $('.inp-phone');
let inpJs = $('.inp-js');
let inpJq = $('.inp-jq');
let addForm = $('.add-form');
let tbody = $('tbody');

async function addStudents(event) {
    event.preventDefault();
    let nameVal = inpName.val().trim();
    let surnameVal = inpSurname.val().trim();
    let phoneVal = inpPhone.val().trim();
    let jsVal = inpJs.val().trim();
    let jqVal = inpJq.val().trim();

    let newStudent = {
        name: nameVal,
        surname: surnameVal,
        phone: phoneVal,
        js: jsVal,
        jq: jqVal,
    }
    for( let key in newStudent) {
        if(!newStudent[key]) {
            alert('Заполните поля!');
            return;
        };
    };
    try {
        const response = await axios.post(API, newStudent);;
        getStudent(API)
    } catch (error) {
        console.log(error);
    }
    inpName.val('');
    inpSurname.val('');
    inpPhone.val('');
    inpJs.val('');
    inpJq.val('');
}
addForm.on('submit', addStudents);

let studentsList = $('.students-list');
let students = [];

async function getStudent(URL) {
    try {
        const response = await axios(URL);
        students = response.data;
        handlePagination();
    } catch(error) {
        console.log(error);
    }
}
getStudent(API);

function render(students) {
    studentsList.html('');
    students.forEach(item => {
        tbody.append(`
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.surname}</td>
                        <td>${item.phone}</td>
                        <td>100</td>
                        <td class="color-red">${item.js}</td>
                        <td>100</td>
                        <td class="color-red"> ${item.jq}</td>
                        <td>${+item.js + +item.jq}/200</td>
                        <td>
                            <button class="btn-delete" id="${item.id}">
                                <img src="https://cdn-icons-png.flaticon.com/512/6448/6448486.png">
                            </button>
                        </td>
                        <td>
                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn-edit" id="${item.id}">
                            <img src="https://cdn-icons.flaticon.com/png/512/2280/premium/2280532.png?token=exp=1640326922~hmac=99029ba687c5582f561a1d0e28f2ca4b">
                        </button>
                        </td>
                        
                    </tr>
        `)
    })
}


async function deleteStudent(e) {
    let id = e.currentTarget.id;
    let yes = confirm('Are You Sure?');
    try {
        if(yes) {
            await axios.delete(`${API}/${id}`);
            alert('Успешно удалено');
            getStudent(API);
        }
    } catch (error) {
        console.log(error);
    }
}
$(document).on('click', '.btn-delete', deleteStudent);


let editInpName = $('.edit-inp-name');
let editInpSurname = $('.edit-inp-surname');
let editInpPhone = $('.edit-inp-phone');
let editInpJs = $('.edit-inp-js');
let editInpJq = $('.edit-inp-jq');
let editForm = $('.edit-form');


//! UPDATE

async function getStudentEdit(e) {
    let id = e.currentTarget.id;
    try {
        const responce = await axios(`${API}/${id}`);
        editInpName.val(responce.data.name);
        editInpSurname.val(responce.data.surname);
        editInpPhone.val(responce.data.phone);
        editInpJs.val(responce.data.js);
        editInpJq.val(responce.data.jq);

        editForm.attr('id', id);
    } catch(error) {
        console.log(error);
    }

}
$(document).on('click', '.btn-edit', getStudentEdit);

async function saveEditedStudent(e) {
    e.preventDefault();
    let id = e.currentTarget.id;
    let editedStudent = {
        name: editInpName.val().trim(),
        surname: editInpSurname.val().trim(),
        phone: editInpPhone.val().trim(),
        js: editInpJs.val().trim(),
        jq: editInpJq.val().trim()
    }
    for(let key in editedStudent) {
        if(!editedStudent[key]) {
            alert('Заполните поля!!!');
            return;
        }
        try{
            await axios.patch(`${API}/${id}`, editedStudent);
            getStudent(API);
            $('.modal').modal('hide');
        } catch(error) {
            console.log(error);
        }
    }
}
editForm.on('submit', saveEditedStudent);


// ! Pagination

let pagination = $(".pagination")
const productsPerPage = 4;
let currentPage = 1;
let pagesCount = 1;

function handlePagination() {
    let indexOfLastProduct = currentPage * productsPerPage;
    let indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    let currentProducts = students.slice(indexOfFirstProduct, indexOfLastProduct);
    render(currentProducts);
    pagesCount = Math.ceil(students.length / productsPerPage);
    addPagination(pagesCount)

}
function addPagination(pagesCount) {
    pagination.html('');
    for(let i = 1; i <= pagesCount; i++) {
        pagination.append( `
        <li class="page-item ${currentPage === i ? "active" : ''}">
        <a class="page-link pagination-item" href="#" style = "background-color: #4ad295">${i}
        </a></li>
        `)
    }
    console.log(pagesCount)
}
$(document).on('click', '.pagination-item', (event) => {
    let newPage = event.target.innerText;
    currentPage = +newPage;
    handlePagination();
})

// ! Search

let searchInp = $('.search-inp');
async function liveSearch(event) {
    let value = event.target.value;
    try {
        const responce = await axios(`${API}?q=${value}`);
        students = responce.data;
        currentPage = 1
        handlePagination(students)

    } catch (error) {
        console.log(error);
    }
}
searchInp.on('input', liveSearch);