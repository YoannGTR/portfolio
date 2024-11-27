function writeSkills() {
  fetch('./ressources/js/jsons/skills.json')
    .then((response) => response.json())
    .then((data) => {
      // Use the data from the skills.json file here
      // console.log(data);
      Array.from(data['skills']).forEach((element) => {
        // console.log(element);
        let skill = document.createElement('div');
        skill.classList.add('skill');
        let skillName = document.createElement('h4');
        skillName.textContent = element;
        skill.appendChild(skillName);
        document.getElementById('listSkills').appendChild(skill);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
writeSkills();
var dicStudyDate = {};

async function writeExperience() {
  try {
    const response = await fetch('./ressources/js/jsons/en.experiences.json');
    const data = await response.json();
    // console.log(data);
    cpt = 2;
    Array.from(data['experiences']).forEach((element) => {
      // console.log(element);
      let experience = new Object();
      writeGenExp(element, experience);
      if (element['category'] == 'job') {
        document.getElementById('listExperience').appendChild(experience.vide);
        document.getElementById('listExperience').appendChild(experience.date);
        document.getElementById('listExperience').appendChild(experience.description);
        writeJob(element, experience);
      } else if (element['category'] == 'study') {
        dicStudyDate[cpt] = experience.date;
        writeStudy(element, experience);
        document.getElementById('listExperience').appendChild(experience.date);
        document.getElementById('listExperience').appendChild(experience.description);
        document.getElementById('listExperience').appendChild(experience.vide);
      }
      cpt++;
    });
    // console.log('test');
    // console.log(dicStudyDate);
  } catch (error) {
    // Use the data from the skills.json file here
    console.error('Error:', error);
  }
}
function writeGenExp(element, experience) {
  experience.date = document.createElement('div');
  experience.date.classList.add('date');
  experience.description = document.createElement('div');
  experience.description.classList.add('description');
  experience.vide = document.createElement('div');
  experience.vide.classList.add('vide');
  let picture = document.createElement('img');
  picture.setAttribute('src', element['picture']);
  picture.setAttribute('alt', 'icone de ' + element['title']);
  experience.description.appendChild(picture);
  let title = document.createElement('h3');
  title.textContent = element['title'];
  experience.description.appendChild(title);

  let firstDate = document.createElement('h3');
  firstDate.textContent = element['dateBegin'];
  experience.date.appendChild(firstDate);
  if (element['dateEnd'] != '') {
    let dash = document.createElement('h3');
    dash.textContent = '-';
    experience.date.appendChild(dash);
    let secDate = document.createElement('h3');
    secDate.textContent = element['dateEnd'];
    experience.date.appendChild(secDate);
  }
}
function writeStudy(element, experience) {
  experience.date.classList.add('dateStudy');
  experience.description.classList.add('descriptionStudy');
  experience.vide.classList.add('videStudy');

  let studyLine = document.createElement('p');
  studyLine.textContent = element['line'];
  experience.description.appendChild(studyLine);
  let studyMention = document.createElement('p');
  studyMention.textContent = element['mention'];
  experience.description.appendChild(studyMention);
}

function writeJob(element, experience) {
  experience.date.classList.add('dateJob');
  experience.description.classList.add('descriptionJob');
  experience.vide.classList.add('videJob');

  let jobCompany = document.createElement('p');
  jobCompany.textContent = element['company'];
  experience.description.appendChild(jobCompany);
  let jobLocation = document.createElement('p');
  jobLocation.textContent = element['location'];
  experience.description.appendChild(jobLocation);
}

function gridChange() {
  if (window.innerWidth > 768) {
    for (const key in dicStudyDate) {
      dicStudyDate[key].style.gridRow = key;
      console.log(dicStudyDate[key]);
    }
  } else {
    for (const key in dicStudyDate) {
      dicStudyDate[key].style.gridRow = 'auto';
    }
  }
}
async function test() {
  await writeExperience();
  // console.log('gridChange');
  gridChange();
}
test();
// window.onresize = gridChange();
window.addEventListener('resize', gridChange);

document.addEventListener('DOMContentLoaded', () => {
  const monObjet = document.getElementById('arrowDown');
  let aller = true;
  const deplacementMax = 2.5; // Distance maximale en pixels
  const deplacementMin = 1.5; // Distance minimale en pixels
  let bottom = deplacementMin;
  const vitesse = 0.008; // Ajuster pour changer la vitesse (0.5 = lent, 5 = rapide)

  function animer() {
    // Calcul de la nouvelle position en fonction de la direction
    if (aller) {
      bottom += vitesse;
      if (bottom >= deplacementMax) {
        aller = false; // Inverse la direction
      }
    } else {
      bottom -= vitesse * 2;
      if (bottom <= deplacementMin) {
        aller = true; // Inverse la direction
      }
    }

    // Appliquer la nouvelle position
    monObjet.style.bottom = `${bottom}rem`;

    // Appelle la prochaine frame
    requestAnimationFrame(animer);
  }

  // Lancer l'animation
  requestAnimationFrame(animer);
});

document.querySelectorAll('.oneSocialMobile').forEach((element) => {
  element.addEventListener('mouseenter', () => {
    element.firstElementChild.setAttribute('fill', 'white');
  });
  element.addEventListener('mouseleave', () => {
    element.firstElementChild.setAttribute('fill', 'black');
  });
});

// function writeProjects(){
//   fetch('./ressources/js/jsons/projects.json')
//     .then((response) => response.json())
//     .then((data) => {
//       // Use the data from the skills.json file here
//       // console.log(data);
//       Array.from(data['projects']).forEach((element) => {
//         // console.log(element);
//         let project = document.createElement('div');
//         project.classList.add('project');
//         let projectTitle = document.createElement('h4');
//         projectTitle.textContent = element['title'];
//         project.appendChild(projectTitle);
//         let projectDescription = document.createElement('p');
//         projectDescription.textContent = element['description'];
//         project.appendChild(projectDescription);
//         let projectLink = document.createElement('a');
//         projectLink.href = element['link'];
//         projectLink.textContent = 'Lien vers le projet';
//         project.appendChild(projectLink);
//         document.getElementById('listProjects').appendChild(project);
//       });
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// }
// writeProjects();

document.getElementsByClassName("project")[0].addEventListener("click", function(){
  console.log("click");
  console.log(document.getElementsByClassName("descProject")[0].style.marginTop);
  document.getElementsByClassName("descProject")[0].style.marginTop = "0rem";
});


document.querySelectorAll(".hardSkill").forEach((element) => {
  element.addEventListener("click", function(){
    console.log("click");
    console.log(element.lastElementChild);
    if(element.lastElementChild.style.display == "none"){
      element.lastElementChild.style.display = "block";
    }else{
        element.lastElementChild.style.display = "none";
      }
  });
});