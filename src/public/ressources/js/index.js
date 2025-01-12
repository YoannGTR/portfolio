const lang = 'fr';
const pathJson = './ressources/js/jsons/' + lang + '/';

var dicStudyDate = {};

async function writeExperience() {
  try {
    const response = await fetch(pathJson + 'experiences.json');
    const data = await response.json();
    cpt = 2;
    document.querySelector('.listExperienceHeader1').textContent =
      data['titles'][0];
    document.querySelector('.listExperienceHeader2').textContent =
      data['titles'][1];
    Array.from(data['experiences']).forEach((element) => {
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
    }
  } else {
    for (const key in dicStudyDate) {
      dicStudyDate[key].style.gridRow = 'auto';
    }
  }
}
async function test() {
  await writeExperience();
  gridChange();
}
test();

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
    noteSkill.innerHTML +=
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' fill='white'><path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'/></svg>";
  }
  if (skill.level % 1 !== 0) {
    noteSkill.innerHTML +=
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' fill='white' style='clip-path: inset(0 50% 0 0);'><path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'/></svg>";
  }

  let svgContent = '';

  let bodySkill = document.createElement('div');
  bodySkill.classList.add('body-skill');

  if (skill['under-skill']) {
    header.setAttribute('onclick', 'toggleDropdownSkill(this)');
    header.classList.add('header-with-dropdown');
    svgContent =
      "<svg xmlns='http://www.w3.org/2000/svg' class='arrow-dropdown-skill' viewBox='0 0 448 512' fill='white'><path d='M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z'/></svg>";

    skill['under-skill'].forEach((underSkill) => {
      let underSkillDiv = document.createElement('div');
      underSkillDiv.classList.add('under-skill');
      let underSkillTitle = document.createElement('h5');
      underSkillTitle.textContent = underSkill.name;
      let underSkillNote = document.createElement('div');
      underSkillNote.classList.add('note-under-skill');
      for (let i = 0; i < Math.floor(underSkill.level); i++) {
        underSkillNote.innerHTML +=
          "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'><path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'/></svg>";
      }
      if (underSkill.level % 1 !== 0) {
        underSkillNote.innerHTML +=
          "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' style='clip-path: inset(0 50% 0 0);'><path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'/></svg>";
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
    button.parentElement.style.maxHeight =
      button.scrollHeight + dropdown.scrollHeight + 'px';
    button.querySelector('.arrow-dropdown-skill').style.transform =
      'rotate(180deg)';
  }
}

window.addEventListener('DOMContentLoaded', function () {
  writeSkills().then(() => {
    Array.from(document.getElementsByClassName('one-skill')).forEach(
      (element) => {
        element.style.maxHeight =
          element.getElementsByClassName('header-skill')[0].scrollHeight + 'px';
      },
    );
  });
});

function switchFilter(element) {
  if (!element.classList.contains('selected')) {
    document.querySelector('.selected').classList.remove('selected');
    element.classList.add('selected');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.custom-select').forEach((element) => {
    customSelect(element);
  });
  buttonSort();
  filterProjects();
});

function customSelect(element) {
  let customSelect = element;
  let selected = customSelect.querySelector('.selected');
  let options = customSelect.querySelector('.options');
  let optionItems = options.querySelectorAll('.option');
  let heightSelect = 0;

  // Handle option selection
  optionItems.forEach((option) => {
    heightSelect += option.scrollHeight + 8;

    option.addEventListener('click', () => {
      const value = option.getAttribute('data-value');
      const text = option.textContent;

      // Update selected value
      selected.querySelector('span').textContent = text;

      // Remove active class from all options and set it to selected one
      optionItems.forEach((opt) => opt.classList.remove('active'));
      option.classList.add('active');

      // Close dropdown
      customSelect.classList.remove('open');
      customSelect
        .querySelector('.svg-arrow>path')
        .setAttribute('fill', '#5A13B1');
      toggleFilter(customSelect, options, heightSelect);
      customSelect.querySelector('.selected').style.backgroundColor = 'white';
      selected.firstElementChild.style.color = '#5A13B1';

      filterProjects();
    });
  });
  if (heightSelect != 0) heightSelect -= 8;

  // Toggle options display
  selected.addEventListener('click', () => {
    customSelect.classList.toggle('open');
    if (customSelect.classList.contains('open')) {
      customSelect
        .querySelector('.svg-arrow>path')
        .setAttribute('fill', 'white');
      selected.firstElementChild.style.color = 'white';
      customSelect.querySelector('.selected').style.backgroundColor = '#5A13B1';
    } else {
      customSelect
        .querySelector('.svg-arrow>path')
        .setAttribute('fill', '#5A13B1');
      selected.firstElementChild.style.color = '#5A13B1';
      customSelect.querySelector('.selected').style.backgroundColor = 'white';
    }
    toggleFilter(customSelect, options, heightSelect);
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove('open');
      customSelect
        .querySelector('.svg-arrow>path')
        .setAttribute('fill', '#5A13B1');
        customSelect.querySelector('.selected').style.backgroundColor = 'white';
        selected.firstElementChild.style.color = '#5A13B1';
      toggleFilter(customSelect, options, heightSelect);
    }
  });

  selected.addEventListener('mouseenter', () => {
    selected.style.backgroundColor = '#5A13B1';
    selected.firstElementChild.style.color = 'white';
    selected.querySelectorAll('.arrow').forEach((element) => {
      element.firstElementChild.firstElementChild.setAttribute("fill",'white');
    });
  });
  selected.addEventListener('mouseleave', () => {
    if(customSelect.classList.contains('open')) return;
    selected.style.backgroundColor = 'white';
    selected.firstElementChild.style.color = '#5A13B1';
    selected.querySelectorAll('.arrow').forEach((element) => {
      element.firstElementChild.firstElementChild.setAttribute("fill",'#5A13B1');
    });
  });
}

function toggleFilter(customSelect, options, heightSelect) {
  if (!customSelect.classList.contains('open')) {
    options.style.maxHeight = 0 + 'px';
  } else {
    options.style.maxHeight = heightSelect + 30 + 'px';
  }
}

function buttonSort() {
  let sort = document.querySelector('#sortProject');
  sort.addEventListener('click', () => {
    if (sort.classList.contains('increase')) {
      sort.classList.remove('increase');
      sort.classList.add('decrease');
      document.querySelector('#decreaseArrow').style.display = 'block';
      document.querySelector('#increaseArrow').style.display = 'none';
      sort.style.alignItems = 'flex-end';
      sort.title = "Anciens d'abbord";
    } else {
      sort.classList.remove('decrease');
      sort.classList.add('increase');
      document.querySelector('#increaseArrow').style.display = 'block';
      document.querySelector('#decreaseArrow').style.display = 'none';
      sort.style.alignItems = 'flex-start';
      sort.title = "Récents d'abbord";
    }
    filterProjects();
  });
  sort.addEventListener('mouseenter', () => {
    sort.style.backgroundColor = '#5A13B1';
    document.querySelectorAll('.arrowSort').forEach((element) => {
      element.firstElementChild.style.fill = 'white';
    });
    document.querySelectorAll('.clockSort').forEach((element) => {
      element.firstElementChild.style.fill = 'white';
    });
  });
  sort.addEventListener('mouseleave', () => {
    sort.style.backgroundColor = 'white';
    document.querySelectorAll('.arrowSort').forEach((element) => {
      element.firstElementChild.style.fill = '#5A13B1';
    });
    document.querySelectorAll('.clockSort').forEach((element) => {
      element.firstElementChild.style.fill = '#5A13B1';
    });
  });
}

function filterProjects() {
  const filterType = document.querySelector('#filterType .option.active');
  const type = filterType.dataset.value;

  const order = document.querySelector('.sort').classList[1];
  const filterDomain = document.querySelector('#filterDomain .option.active');
  const domain = filterDomain.dataset.value;

  const whichProject = document.querySelector('#whichProjects');
  writeProjects().then(() => {
    let projects = Array.from(document.querySelectorAll('.project'));

    if (type !== 'all') {
      projects = projects.filter((project) =>
        project.dataset.type.includes(type),
      );
      whichProject.textContent = 'Mes projets ' + filterType.textContent + ' !';
    } else {
      whichProject.textContent = 'Touts mes projets !';
    }

    if (domain !== 'all') {
      projects = projects.filter((project) =>
        project.dataset.domain.includes(domain),
      );
      whichProject.textContent = whichProject.textContent.substring(
        0,
        whichProject.textContent.length - 1,
      );
      whichProject.textContent +=
        'de la catégorie ' + filterDomain.textContent + ' !';
    }

    if (order === 'increase') {
      projects.sort(
        (a, b) => new Date(b.dataset.date) - new Date(a.dataset.date),
      );
    } else {
      projects.sort(
        (a, b) => new Date(a.dataset.date) - new Date(b.dataset.date),
      );
    }

    const listProjects = document.getElementById('listProjects');
    listProjects.innerHTML = '';
    if (projects.length == 0) {
      const noProject = document.createElement('div');
      noProject.classList.add('noProject');
      noProject.textContent = 'Aucun projet ne correspond à votre recherche';
      listProjects.appendChild(noProject);
    }
    projects.forEach((project) => listProjects.appendChild(project));
  });
}

async function writeProjects() {
  try {
    const response = await fetch(pathJson + 'projects.json');
    const data = await response.json();

    const listProjects = document.getElementById('listProjects');
    listProjects.innerHTML = ''; // Clear existing projects

    for (const type in data.projects) {
      if (data.projects.hasOwnProperty(type)) {
        data.projects[type].forEach((project) => {
          const projectDiv = document.createElement('div');
          projectDiv.classList.add('project');

          projectDiv.setAttribute('data-type', JSON.stringify(project.type));
          projectDiv.setAttribute('data-date', project.date);
          projectDiv.setAttribute(
            'data-domain',
            JSON.stringify(project.domain),
          );

          projectDiv.setAttribute('onclick', 'zoomProjectPhone(this)');

          const descProjectDiv = document.createElement('div');
          descProjectDiv.classList.add('descProject');

          const descProjectHeaderDiv = document.createElement('div');
          descProjectHeaderDiv.classList.add('descProjectHeader');

          const projectTitle = document.createElement('h4');
          projectTitle.textContent = project.title;

          const xmarkSvg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg',
          );
          xmarkSvg.setAttribute('viewBox', '0 0 384 512');
          xmarkSvg.classList.add('xmark');
          xmarkSvg.setAttribute('onclick', 'xmarkClick()');

          const xmarkPath = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path',
          );
          xmarkPath.setAttribute('fill', '#ffffff');
          xmarkPath.setAttribute(
            'd',
            'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z',
          );

          xmarkSvg.appendChild(xmarkPath);

          descProjectHeaderDiv.appendChild(projectTitle);
          descProjectHeaderDiv.appendChild(xmarkSvg);

          const resumeProjectDiv = document.createElement('div');
          resumeProjectDiv.classList.add('resumeProject');

          const projectDescription = document.createElement('p');
          projectDescription.innerHTML = project.description;

          const projectTechnos = document.createElement('p');
          projectTechnos.classList.add('technos');
          projectTechnos.innerHTML =
            project.technologies.length != 0
              ? `<span>[${project.technologies.join(', ')}]</span>`
              : '<span>Projet non technique</span>';

          resumeProjectDiv.appendChild(projectDescription);
          resumeProjectDiv.appendChild(projectTechnos);

          const contextProject = document.createElement('p');
          contextProject.classList.add('contextProject');
          contextProject.textContent = project.context;

          descProjectDiv.appendChild(descProjectHeaderDiv);
          descProjectDiv.appendChild(resumeProjectDiv);
          descProjectDiv.appendChild(contextProject);

          projectDiv.appendChild(descProjectDiv);
          projectDiv.style.backgroundImage = `url(${project.image})`;
          listProjects.appendChild(projectDiv);
          projectDiv.addEventListener('click', function () {
            openProject(projectDiv);
          });
        });
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

var xmarkClicked = false;
function zoomProjectPhone(element) {
  if (window.innerWidth < 768) {
    if (xmarkClicked) {
      unZoomProjectPhone(element);
      xmarkClicked = false;
    } else {
      document.querySelectorAll('.project').forEach((element) => {
        unZoomProjectPhone(element);
      });
      element.style.width = '100%';
      element.querySelector('.descProject').style.marginTop = '0rem';
      element.querySelector('.descProject').style.height = '25rem';
      element.querySelector('.resumeProject').style.height = '100%';
      element.querySelector('.xmark').style.display = 'block';
      // setTimeout(() => {
      //   window.scrollTo({
      //     top: element.offsetTop - 160,
      //     behavior: 'smooth'
      //   });
      // }, 100); // Exécuter après les instructions précédentes
    }
  }
}

function unZoomProjectPhone(element) {
  element.style.width = '47.5%';
  element.querySelector('.descProject').style.marginTop = '5rem';
  element.querySelector('.descProject').style.height = '7rem';
  element.querySelector('.resumeProject').style.height = '0rem';
  element.querySelector('.xmark').style.display = 'none';
}
function unZoomProjectPC(element) {
  element.style.width = '24.1%';
  element.querySelector('.descProject').removeAttribute('style');
  element.querySelector('.resumeProject').removeAttribute('style');
  element.querySelector('.xmark').removeAttribute('style');
}

function xmarkClick() {
  xmarkClicked = true;
}

let winSize = window.innerWidth;
window.addEventListener('resize', function () {
  if (winSize < 768 && window.innerWidth >= 768) {
    document.querySelectorAll('.project').forEach((element) => {
      unZoomProjectPC(element);
    });
  } else if (winSize >= 768 && window.innerWidth < 768) {
    document.querySelectorAll('.project').forEach((element) => {
      unZoomProjectPhone(element);
    });
  }
  winSize = window.innerWidth;
});
