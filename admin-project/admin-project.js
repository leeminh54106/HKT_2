let formModal = document.getElementById('formModal');
let tBody = document.getElementById('tBody')

let idUpdate = null;

function display(){
    formModal.style.display = 'block';
}
function deleteForm(){
    formModal.style.display = 'none';
    idUpdate = null;
    document.getElementById('them').innerText = 'Thêm';
    clearF()
}

function sendForm(event){
    event.preventDefault();
    let projects = JSON.parse(localStorage.getItem('projects')) || []


    if(idUpdate){
        let projectcu = projects.findIndex(el => el.id === idUpdate);

        let projectnew = {
            id:idUpdate,
            name:document.getElementById('name').value,
            technology:document.getElementById('technology').value,
            image:document.getElementById('img').value,
            link:document.getElementById('link').value,
        }
        console.log(projectnew);
        console.log(projects[projectcu]);
        projects[projectcu] = projectnew;
        console.log(projects[projectcu]);
        localStorage.setItem('projects', JSON.stringify(projects))
        formModal.style.display = 'none';
        document.getElementById('them').innerText = 'Thêm';
        clearF()
        render()
        
        idUpdate = null;
    }else{
        let project = {
            id:Math.floor(Math.random()*100),
            name:document.getElementById('name').value,
            technology:document.getElementById('technology').value,
            image:document.getElementById('img').value,
            link:document.getElementById('link').value,
        }
        projects.push(project);
        deleteForm()
        clearF()
        localStorage.setItem('projects',JSON.stringify(projects));
        render()

    }

    
}

function render(){
    let projects = JSON.parse(localStorage.getItem('projects')) || []
    let stringHTML = ``;
    for(let i = 0; i < projects.length; i++){
        stringHTML += 
                    `
                            <tr>
                            <td>${i +1}</td>
                            <td>${projects[i].name}</td>
                            <td>
                                <img width="30px" height="30px" src="${projects[i].image}" alt="">
                            </td>
                            <td>${projects[i].technology}</td>
                            <td>
                                <button type="button"; onclick = 'updateForm(${projects[i].id})' class="submitFormBTN-Delete">
                                    sửa
                                </button>
                                <button onclick ='deleForm(${projects[i].id})' class="submitFormBTN-Add">
                                    xóa
                                </button>
                            </td>
                        
                            </tr>

                    `
    }
    tBody.innerHTML = stringHTML;
}
render()

function deleForm(id){
    let projects = JSON.parse(localStorage.getItem('projects')) || []
    let index = projects.findIndex(el => el.id === id)
    projects.splice(index, 1)
    localStorage.setItem('projects',JSON.stringify(projects));
    
    render()
}

function clearF(){
    document.getElementById('name').value = '';
    document.getElementById('technology').value = '';
    document.getElementById('img').value = '';
    document.getElementById('link').value = '';
}

function updateForm(id){
    display()
    document.getElementById('them').innerText = 'sửa';
    idUpdate = id;
    let projects = JSON.parse(localStorage.getItem('projects'))
    let index = projects.findIndex(el => el.id === id)
    
       
        document.getElementById('name').value = projects[index].name;
        document.getElementById('technology').value = projects[index].technology;
        document.getElementById('img').value = projects[index].image;
        document.getElementById('link').value = projects[index].link;
 render()
}