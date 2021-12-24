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

let studentsList = $('.students-item');
let students = [];

async function getStudenst(URL) {
    try {
        const response = await axios(URL);
        students = response.data;
        render(students)
    } catch(error) {
        console.log(error);
    }
}
getStudenst(API);

function render(students) {
    studentsList.html('');
    students.forEach((item, index) => {
        tbody.append(`
                    <tr>
                        <td>${index + 1}</td>
                        <td>${item.name}</td>
                        <td>${item.surname}</td>
                        <td>${item.phone}</td>
                        <td>100</td>
                        <td>${item.js}</td>
                        <td>100</td>
                        <td>${item.jq}</td>
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