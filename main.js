const API = "http://localhost:8001/stydents";
let inpName = $('.inp-name');
let inpSurname = $('.inp-surname');
let inpPhone = $('.inp-phone');
let inpWeekKpi = $('.inp-week-kpi');
let inpMonthKpi = $('.inp-month-kpi');
let inpImage = $('.inp-image');
let addForm = $('.add-form');

async function addStudents(event) {
    event.preventDefault();
    let nameVal = inpName.val().trim();
    let surnameVal = inpSurname.val().trim();
    let phoneVal = inpPhone.val().trim();
    let weekKpiVal = inpWeekKpi.val().trim();
    let monthKpiVal = inpMonthKpi.val().trim();
    let imageVal = inpImage.val().trim();

    let newStudent = {
        name: nameVal,
        surname: surnameVal,
        phone: phoneVal,
        week: weekKpiVal,
        month: monthKpiVal,
        image: imageVal,
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
    inpImage.val('');
    inpMonthKpi.val('');
    inpWeekKpi.val('');
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
    students.forEach(item => {
        studentsList.append(`
            <div class="card students-div" style="width: 18rem;">
            <div class="img-div">
                <img src="${item.image}" class="card-img-top img-card" alt="...">
            </div>
            
                <div class="card-body card-students">
                    <h6 class="card-title">${item.name} ${item.surname}</h6>
                    <h6>${item.phone}</h6>
                    <h6 class="card-title">weekly KPI: ${item.week}</h6>
                    <h6 class="card-title">monthly KPI:${item.month}</h6>
                    <button class="btn-delete" id="${item.id}">
                    <img src="https://cdn-icons.flaticon.com/png/512/3368/premium/3368864.png?token=exp=1640286457~hmac=9e3e76eee55d58ff2db2f3a462f67603"></button>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn-edit" id="${item.id}">
                    <img src="https://cdn-icons-png.flaticon.com/512/2919/2919592.png">
                    </button>
                </div>
            </div>
        `)
    })
}