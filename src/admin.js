let formAddSkill = document.getElementById("form-add-skill");
let formAddProject = document.getElementById("form-add-project");
let formProject = document.getElementById("form-project");

let skillNav = document.getElementById("skill-nav");
let projectNav = document.getElementById("project-nav");

let skillContent = document.getElementById("skill-content");
let projectContent = document.getElementById("project-content");

let tbodySkillHTML = document.getElementById(`tbodyList`);
let tbodyProjectHTML = document.getElementById(`tbodyProjet`);

let skillError = document.querySelectorAll(".error-cf-skill");
let projectError = document.querySelectorAll(".error-cf-project");

let btnAddProject = document.getElementById("submit-project-form");
let btnUpdate = document.getElementById("update-form");

let idUpdate = null;

const SKILLLIST = "skillList_01";
const PROJECTLIST = "projectlist_01";

//open nav and close an other nav
function openSkillNav() {
  projectNav.classList.remove("checked");
  skillNav.classList.add("checked");
  skillContent.classList.remove("hidden");
  projectContent.classList.add("hidden");
}
function openProjectNav() {
  skillNav.classList.remove("checked");
  projectNav.classList.add("checked");
  projectContent.classList.remove("hidden");
  skillContent.classList.add("hidden");
}
//openform and closeform
function closeSkillForm() {
  formAddSkill.classList.add("hidden");
}
function OpenSkillForm() {
  formAddSkill.classList.remove("hidden");
}
function closeProjectForm() {
  formAddProject.classList.add("hidden");
  clearProjectInputForm();
}
function OpenProjectForm() {
  formAddProject.classList.remove("hidden");
  btnAddProject.classList.remove("hidden");
  btnUpdate.classList.add("hidden");
}

//Skill
function renderSkill() {
  let skillList = JSON.parse(localStorage.getItem(SKILLLIST)) || [];
  let stringHTML = "";
  let id = 1;
  if (skillList.length > 0) {
    id = skillList[skillList.length - 1].id + 1;
  }
  for (let i = 0; i < skillList.length; i++) {
    stringHTML += `
                <tr>
                  <td class="middle">${skillList[i].id}</td>
                  <td>${skillList[i].skillName}</td>
                  <td class="middle">
                    <img
                      width="50px"
                      src="${skillList[i].skillImg}"
                      alt=""
                    />
                  </td>
                  <td>${skillList[i].skillYears} Năm</td>
                  <td>21/5/2024</td>
                  <td class="middle">
                    <button class="btn" onClick="deleteSkill(${skillList[i].id})">Xoá</button>
                  </td>
                </tr>
        `;
  }
  tbodySkillHTML.innerHTML = stringHTML;
}

function validateFields(itemSkill) {
  const skillList = JSON.parse(localStorage.getItem(SKILLLIST)) || [];
  let check = true;
  let checkName,
    checkYear,
    checkImg = true;
  console.log(itemSkill);
  console.log(skillList);
  console.log(
    skillList.findIndex((item) => item.skillName == itemSkill.skillName)
  );
  if (!itemSkill.skillName) {
    skillError[0].innerHTML = `<p style="color: red;">Tên không được để trống</p>`;
    checkName = false;
  } else if (
    skillList.findIndex((item) => item.skillName == itemSkill.skillName) >= 0
  ) {
    skillError[0].innerHTML = `<p style="color: red;">Tên đã bị trùng, mời nhập lại</p>`;
    checkName = false;
  } else {
    skillError[0].innerHTML = "";
    checkName = true;
  }
  if (!itemSkill.skillYears) {
    skillError[1].innerHTML = `<p style="color: red;">Năm không được để trống</p>`;
    checkYear = false;
  } else {
    skillError[1].innerHTML = "";
    checkYear = true;
  }
  if (!itemSkill.skillImg) {
    skillError[2].innerHTML = `<p style="color: red;">Link ảnh không được để trống</p>`;
    checkImg = false;
  } else {
    skillError[2].innerHTML = "";
    checkImg = true;
  }
  if (checkName && checkYear && checkImg) {
    return check;
  }
}
//add
function submitSkillForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const values = {};
  for (let [skillName, value] of formData.entries()) {
    values[skillName] = value;
  }
  let check = validateFields(values);
  if (check) {
    const skillList = JSON.parse(localStorage.getItem(SKILLLIST)) || [];
    let id = 1;
    if (skillList.length > 0) {
      id = skillList[skillList.length - 1].id + 1;
    }
    values.id = id;
    // values.skillYears = skillList.skillYears;
    // values.skillImg = skillList.skillImg;
    skillList.push(values);
    localStorage.setItem(SKILLLIST, JSON.stringify(skillList));
    e.target.reset();
    closeSkillForm();
    renderSkill();
  }
}
function getIndexById(id) {
  let skillList = JSON.parse(localStorage.getItem(SKILLLIST));
  return skillList.findIndex((product) => product.id == id);
}
//delete skill funtion
function deleteSkill(id) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        let skillList = JSON.parse(localStorage.getItem(SKILLLIST));
        let index = getIndexById(id);
        skillList.splice(index, 1);

        localStorage.setItem(SKILLLIST, JSON.stringify(skillList));
        renderSkill();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}

//Project
function renderProject() {
  let projectList = JSON.parse(localStorage.getItem(PROJECTLIST)) || [];
  let stringHTML = "";
  let id = 1;
  if (projectList.length > 0) {
    id = projectList[projectList.length - 1].id + 1;
  }
  for (let i = 0; i < projectList.length; i++) {
    stringHTML += `
                <tr>
                  <td class="middle">${projectList[i].id}</td>
                  <td>${projectList[i].projectName}</td>
                  <td class="middle">
                    <img
                      width="50px"
                      src="${projectList[i].projectImg}"
                      alt=""
                    />
                  </td>
                  <td>${projectList[i].projectTech}</td>
                  <td>21/5/2024</td>
                  <td class="middle">
                    <button class="btn btn-del" onClick="initUpdate(${projectList[i].id})">Sửa</button>
                    <button class="btn" onClick="deleteProject(${projectList[i].id})">Xoá</button>
                  </td>
                </tr>
          `;
  }
  tbodyProjectHTML.innerHTML = stringHTML;
}
renderProject();
function submitProjectForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const values = {};
  for (let [projectName, value] of formData.entries()) {
    values[projectName] = value;
  }
  let check = validateFieldsProject(values);
  if (check) {
    const projectList = JSON.parse(localStorage.getItem(PROJECTLIST)) || [];
    let id = 1;
    if (projectList.length > 0) {
      id = projectList[projectList.length - 1].id + 1;
    }
    values.id = id;
    // values.skillYears = skillList.skillYears;
    // values.skillImg = skillList.skillImg;

    projectList.push(values);
    localStorage.setItem(PROJECTLIST, JSON.stringify(projectList));
    e.target.reset();
    closeProjectForm();
    renderProject();
  }
}
function validateFieldsProject(itemProject) {
  const projectList = JSON.parse(localStorage.getItem(PROJECTLIST)) || [];
  let check = true;
  let checkName,
    checkImg,
    checkTech,
    checkGit = true;
  if (!itemProject.projectName) {
    projectError[0].innerHTML = `<p style="color: red;">Tên không được để trống</p>`;
    checkName = false;
  } else if (
    projectList.findIndex(
      (item) => item.projectName == itemProject.projectName
    ) >= 0
  ) {
    projectError[0].innerHTML = `<p style="color: red;">Tên đã bị trùng, mời nhập lại</p>`;
    checkName = false;
  } else {
    projectError[0].innerHTML = "";
    checkName = true;
  }
  if (!itemProject.projectImg) {
    projectError[1].innerHTML = `<p style="color: red;">Hình ảnh không được để trống</p>`;
    checkImg = false;
  } else {
    projectError[1].innerHTML = "";
    checkImg = true;
  }
  if (!itemProject.projectTech) {
    projectError[2].innerHTML = `<p style="color: red;">Danh sách công nghệ không được để trống</p>`;
    checkTech = false;
  } else {
    projectError[2].innerHTML = "";
    checkTech = true;
  }
  if (!itemProject.projectGit) {
    projectError[3].innerHTML = `<p style="color: red;">Danh sách công nghệ không được để trống</p>`;
    checkGit = false;
  } else {
    projectError[3].innerHTML = "";
    checkGit = true;
  }
  if (checkName && checkImg && checkTech && checkGit) {
    return check;
  }
}

function getIndexByIdProject(id) {
  let projectList = JSON.parse(localStorage.getItem(PROJECTLIST));
  return projectList.findIndex((product) => product.id == id);
}
function deleteProject(id) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        let projectList = JSON.parse(localStorage.getItem(PROJECTLIST));
        let index = getIndexByIdProject(id);
        projectList.splice(index, 1);
        localStorage.setItem(PROJECTLIST, JSON.stringify(projectList));
        renderProject();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}
function initUpdate(id) {
  idUpdate = id;
  let projectList = JSON.parse(localStorage.getItem(PROJECTLIST));
  let index = getIndexByIdProject(id);
  formProject.projectName.value = projectList[index].projectName;
  formProject.projectImg.value = projectList[index].projectImg;
  formProject.projectTech.value = projectList[index].projectTech;
  formProject.projectGit.value = projectList[index].projectGit;
  OpenProjectForm();
  btnAddProject.classList.add("hidden");
  btnUpdate.classList.remove("hidden");
}
function clearProjectInputForm() {
  formProject.projectName.value = "";
  formProject.projectImg.value = "";
  formProject.projectTech.value = "";
  formProject.projectGit.value = "";
}
function getDataForm() {
  return {
    projectName: formProject.projectName.value,
    projectImg: formProject.projectImg.value,
    projectTech: formProject.projectTech.value,
    projectGit: formProject.projectGit.value,
  };
}
btnUpdate.addEventListener(`click`, function () {
  let projectList = JSON.parse(localStorage.getItem(PROJECTLIST));
  const product = getDataForm();
  let indexUpdate = projectList.findIndex((item) => item.id == idUpdate);
  projectList[indexUpdate].projectName = product.projectName;
  projectList[indexUpdate].projectImg = product.projectImg;
  projectList[indexUpdate].projectTech = product.projectTech;
  projectList[indexUpdate].projectGit = product.projectGit;
  localStorage.setItem(PROJECTLIST, JSON.stringify(projectList));
  renderProject();
  closeProjectForm();
  btnAddProject.classList.remove("hidden");
  btnUpdate.classList.add("hidden");
});
renderSkill();
renderProject();
