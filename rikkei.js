let footerSkill = document.getElementById('footerSkill')
function renderSkill(){
    let skills = JSON.parse(localStorage.getItem('skills')) || []
    let stringHTML = ``;
    for(let i = 0; i < skills.length; i++){
        stringHTML +=
        `
        <div class="footer-bot">
                <img class="img" src="${skills[i].image}" alt="">
                <div>
                    <p class="bold">${skills[i].name}</p>
                    <p class="mo">${skills[i].year}</p>
                </div>
            </div>

        `
    }
    footerSkill.innerHTML = stringHTML;
}
renderSkill()

let myProject = document.getElementById('myProject')
function renderProject(){
    let projects = JSON.parse(localStorage.getItem('projects')) || []

    let stringHTML = ``; 
    for(i = 0; i < projects.length; i++){
        let trstring = projects[i].technology.split(',');
        console.log(trstring);
        stringHTML += 
                        `
                            <div class="inside">
                                <div class="inside-top">
                                    <img width="40px" class="inside-img" src="${projects[i].image}" alt="">
                                    <div class="auto-drive">
                                        <h3>${projects[i].name}</h3>
                                        <p>${projects[i].link}
                                            <i class="fa-solid fa-share-from-square"></i>
                                        </p>
                                    </div>
                                </div>
                                <div class="inside-bot">
                                    <input class="inside-btn" type="button" value="${trstring[0]}">
                                    <input class="inside-btn" type="button" value="${trstring[1]}">
                                    <input class="inside-btn" type="button" value="${trstring[2]}">
                                </div>
                            </div>
                        `
    }
    myProject.innerHTML = stringHTML;
}
renderProject();