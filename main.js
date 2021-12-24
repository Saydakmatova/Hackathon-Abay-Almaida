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
                    </tr>
        `)
    })
}