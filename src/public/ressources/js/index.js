const lang = "fr";
const pathJson = "./ressources/js/jsons/" + lang + "/";



var dicStudyDate = {};

async function writeExperience() {
  try {
    const response = await fetch(pathJson + 'experiences.json');
    const data = await response.json();
    // console.log(data);
    cpt = 2;
    document.querySelector('.listExperienceHeader1').textContent = data['titles'][0];
    document.querySelector('.listExperienceHeader2').textContent = data['titles'][1];
    Array.from(data['experiences']).forEach((element) => {
      // console.log(element);
      let experience = new Object();
      writeGenExp(element, experience);
      if (element['category'] == 'job') {
        document.getElementById('listExperience').appendChild(experience.vide);
        document.getElementById('listExperience').appendChild(experience.date);
        document
          .getElementById('listExperience')
          .appendChild(experience.description);
        writeJob(element, experience);
      } else if (element['category'] == 'study') {
        dicStudyDate[cpt] = experience.date;
        writeStudy(element, experience);
        document.getElementById('listExperience').appendChild(experience.date);
        document
          .getElementById('listExperience')
          .appendChild(experience.description);
        document.getElementById('listExperience').appendChild(experience.vide);
      }
      cpt++;
    });
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
      // console.log(dicStudyDate[key]);
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

document
  .getElementsByClassName('project')[0]
  .addEventListener('click', function () {
    console.log('click');
    console.log(
      document.getElementsByClassName('descProject')[0].style.marginTop,
    );
    document.getElementsByClassName('descProject')[0].style.marginTop = '0rem';
  });


async function writeSkills() {
  try {
    const response = await fetch(pathJson + 'skill.json');
    const data = await response.json();

    document.querySelector('#hard-skill>h3').textContent = data['titles'][0];
    document.querySelector('#soft-skill>h3').textContent = data['titles'][1];

    let listHardSkill = document.querySelector('#hard-skill>.skills');
    Array.from(data['skills']['hard']).forEach((element) => {
      createSkillPattern(listHardSkill, element);
    });
    let listSoftSkill = document.querySelector('#soft-skill>.skills');
    Array.from(data['skills']['soft']).forEach((element) => {
      createSkillPattern(listSoftSkill, element);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * Creates a skill pattern element and appends it to the specified parent element.
 * 
 * @param {HTMLElement} parent - The parent element to which the skill pattern will be appended.
 * @param {Object} skill - The skill object containing information about the skill.
 * @param {string} skill.name - The name of the skill.
 * @param {number} skill.level - The level of the skill.
 * @param {Array<Object>} [skill['under-skill']] - An optional array of under-skills.
 * @param {string} skill['under-skill'].name - The name of the under-skill.
 * @param {number} skill['under-skill'].level - The level of the under-skill.
 */
function createSkillPattern(parent, skill) {
  let oneSkill = document.createElement('div');
  oneSkill.classList.add('one-skill');

  let header = document.createElement('div');
  header.classList.add('header-skill');

  let typeSkill = document.createElement('div');
  typeSkill.classList.add('type-skill');

  let titreSkill = document.createElement('h4');
  titreSkill.textContent = skill.name;

  let noteSkill = document.createElement('div');
  noteSkill.classList.add('note-skill');
  for (let i = 0; i < Math.floor(skill.level); i++) {
    noteSkill.innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' fill='white'><path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'/></svg>";
  }
  if (skill.level % 1 !== 0) {
    noteSkill.innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' fill='white' style='clip-path: inset(0 50% 0 0);'><path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'/></svg>";
  }

  let svgContent = "";

  let bodySkill = document.createElement('div');
  bodySkill.classList.add('body-skill');

  if (skill['under-skill']) {
    header.setAttribute('onclick', 'toggleDropdownSkill(this)');
    header.classList.add('header-with-dropdown');
    svgContent = "<svg xmlns='http://www.w3.org/2000/svg' class='arrow-dropdown-skill' viewBox='0 0 448 512' fill='white'><path d='M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z'/></svg>";

    skill['under-skill'].forEach((underSkill) => {
      let underSkillDiv = document.createElement('div');
      underSkillDiv.classList.add('under-skill');
      let underSkillTitle = document.createElement('h5');
      underSkillTitle.textContent = underSkill.name;
      let underSkillNote = document.createElement('div');
      underSkillNote.classList.add('note-under-skill');
      for (let i = 0; i < Math.floor(underSkill.level); i++) {
        underSkillNote.innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'><path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'/></svg>";
      }
      if (underSkill.level % 1 !== 0) {
        underSkillNote.innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' style='clip-path: inset(0 50% 0 0);'><path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'/></svg>";
      }
      underSkillDiv.appendChild(underSkillTitle);
      underSkillDiv.appendChild(underSkillNote);
      bodySkill.appendChild(underSkillDiv);
    });
  }

  typeSkill.appendChild(titreSkill);
  typeSkill.appendChild(noteSkill);
  header.appendChild(typeSkill);
  header.innerHTML += svgContent;
  oneSkill.appendChild(header);
  oneSkill.appendChild(bodySkill);
  parent.appendChild(oneSkill);
}


/**
 * Toggles the visibility of a dropdown menu associated with a skill button.
 *
 * @param {HTMLElement} button - The button element that triggers the dropdown toggle.
 */
function toggleDropdownSkill(button) {
  const dropdown = button.nextElementSibling;
  if (dropdown.classList.contains('showSkill')) {
    button.parentElement.style.maxHeight = button.scrollHeight + 'px';
    dropdown.classList.remove('showSkill');
    button.style.borderRadius = '0.5rem';
    button.querySelector('.arrow-dropdown-skill').style.transform = 'rotate(0)';
  } else {
    dropdown.classList.add('showSkill');
    button.style.borderBottomLeftRadius = '0rem';
    button.style.borderBottomRightRadius = '0rem';
    button.parentElement.style.maxHeight = button.scrollHeight + dropdown.scrollHeight + 'px';
    button.querySelector('.arrow-dropdown-skill').style.transform = 'rotate(180deg)';
  }
}

window.addEventListener('DOMContentLoaded', function () {
  writeSkills().then(() => {
    Array.from(document.getElementsByClassName('one-skill')).forEach((element) => {
      element.style.maxHeight = element.getElementsByClassName('header-skill')[0].scrollHeight + 'px';
    });
  });
});