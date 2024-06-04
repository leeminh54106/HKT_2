
let formModal = document.getElementById('formModal')
let tBody = document.getElementById('tBody')

let submitForm = document.getElementById('submitForm')
let inputName = document.getElementById('name')
let inputExperience = document.getElementById('experience')
let inputImg = document.getElementById('img')

let submitFormDelete = document.getElementById('submitFormDelete')
let submitFormAdd = document.getElementById('submitFormAdd')

// let skills = [
//     {id:1, name:'java',image:'../img/android.svg',year:'2 year Experience',},
//     {id:2, name:'Angular',image:'../img/Angular.svg',year:'1 year Experience',},
//     {id:3, name:'Bootstrap',image:'../img/bootstrap.svg',year:'3 year Experience',},
// ];
// localStorage.setItem('skills', JSON.stringify(skills))

function render() {
    let skills = JSON.parse(localStorage.getItem('skills')) || [];
    let stringHTML = ``;
    for (let i = 0; i < skills.length; i++) {

        stringHTML +=
            `
                        <tr>
                        <td>${i + 1}</td>
                        <td>${skills[i].name}</td>
                        <td>
                            <img width='30px'; height='30px'; src="${skills[i].image}">
                        </td>
                        <td>${skills[i].year}</td>
                        <td>23/5/2024</td>
                        <td>
                            <button onclick ='deleteSkill(${skills[i].id})' class="deleteBtn">
                                xóa
                            </button>
                        </td>
                        </tr>
                    `
    }
    tBody.innerHTML = stringHTML;

}
render()

function sendForm(event) {
    event.preventDefault();
    let skills = JSON.parse(localStorage.getItem('skills')) || [];
    let skill = {
        id: Math.floor(Math.random() * 100),
        name: inputName.value,
        image: inputImg.value,
        year: inputExperience.value,
    };
    skills.push(skill);
    localStorage.setItem('skills', JSON.stringify(skills))
    clearForm()
    deleteForm()
    render()
}


function display() {
    formModal.style.display = 'block'
};

function deleteForm() {
    formModal.style.display = 'none'
}

function deleteSkill(id) {
    const result = confirm(`Bạn có muốn xóa kỹ năng thứ ${id} không ?`);
    if (!result) {
        return;
    }
    let skills = JSON.parse(localStorage.getItem('skills')) || [];
    let index = skills.findIndex(el => el.id === id)
    skills.splice(index, 1)
    localStorage.setItem('skills', JSON.stringify(skills))
    render()
}

function clearForm() {
    inputName.value = '';
    inputExperience.value = '';
    inputImg.value = '';
}

function huy() {

    clearForm()
    deleteForm()
}