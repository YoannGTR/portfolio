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

    document.querySelector('#groupSkillFront>h3').textContent =
      data['titles'][0];
    document.querySelector('#groupSkillBack>h3').textContent =
      data['titles'][1];
    document.querySelector('#groupSkillSys>h3').textContent = data['titles'][2];

    let listSkillFront = document.querySelector('#listSkillFront');
    Array.from(data['skills']['FrontEnd'])
      .sort((a, b) => b.level - a.level)
      .forEach((element) => {
        createSkillPattern(listSkillFront, element);
      });
    let listSkillBack = document.querySelector('#listSkillBack');
    data['skills']['BackEnd']
      .sort((a, b) => b.level - a.level)
      .forEach((element) => {
        createSkillPattern(listSkillBack, element);
      });
    let listSkillSys = document.querySelector('#listSkillSys');
    Array.from(data['skills']['System'])
      .sort((a, b) => b.level - a.level)
      .forEach((element) => {
        createSkillPattern(listSkillSys, element);
      });
  } catch (error) {
    console.error('Error:', error);
  }
}
const skillLogosPath = './ressources/assets/images/skills/';
function createSkillPattern(parent, skill) {
  let skillLogo = document.createElement('img');
  skillLogo.setAttribute('src', skillLogosPath + skill.name + '.png');
  skillLogo.setAttribute('alt', skill.name);
  skillLogo.setAttribute('title', skill.name);
  skillLogo.classList.add('skillLogo');

  let skillName = document.createElement('p');
  skillName.textContent = skill.name;
  skillName.classList.add('skillName');

  let skillTooltip = document.createElement('span');
  skillTooltip.classList.add('tooltip');
  skillTooltip.textContent = skill.name;

  let skillDiv = document.createElement('div');
  skillDiv.classList.add('skill');
  skillDiv.classList.add(skill.type);
  skillDiv.appendChild(skillLogo);
  skillDiv.appendChild(skillName);
  skillDiv.appendChild(skillTooltip);

  parent.appendChild(skillDiv);
}

window.addEventListener('DOMContentLoaded', () => {
  writeSkills();
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
      element.firstElementChild.firstElementChild.setAttribute('fill', 'white');
    });
  });
  selected.addEventListener('mouseleave', () => {
    if (customSelect.classList.contains('open')) return;
    selected.style.backgroundColor = 'white';
    selected.firstElementChild.style.color = '#5A13B1';
    selected.querySelectorAll('.arrow').forEach((element) => {
      element.firstElementChild.firstElementChild.setAttribute(
        'fill',
        '#5A13B1',
      );
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

  const filterDomain = document.querySelector('#filterDomain .option.active');
  const domain = filterDomain.dataset.value;

  const order = document.querySelector('.sort').classList[1];

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

          let titleProject = document.createElement('h4');
          titleProject.textContent = project.title;
          titleProject.classList.add('titleProject');

          let descProject = document.createElement('p');
          descProject.innerHTML = project.description;
          descProject.classList.add('descProject');

          let projectTechnos = document.createElement('div');
          projectTechnos.classList.add('technosProject');

          for (const techno of project.technologies) {
            let technoSpan = document.createElement('p');
            technoSpan.textContent = techno;
            projectTechnos.appendChild(technoSpan);
          }

          let linksProjectDiv = document.createElement('div');
          linksProjectDiv.classList.add('linksProjectDiv');

          let linkProject = document.createElement('a');
          linkProject.classList.add('linkProject');
          linkProject.href = project.link;
          linkProject.target = '_blank';
          linkProject.rel = 'noopener noreferrer'; // pour la sécurité
          linkProject.textContent = 'Github';

          linksProjectDiv.appendChild(linkProject);


          if (project.linkLive !== undefined) {
            let linkProject2 = document.createElement('a');
            linkProject2.classList.add('linkProject');
            linkProject2.href = project.linkLive;
            linkProject2.target = '_blank';
            linkProject2.rel = 'noopener noreferrer'; // pour la sécurité
            linkProject2.textContent = 'Vue live';

            linksProjectDiv.appendChild(linkProject2);
          }

          let contextProject = document.createElement('p');
          contextProject.classList.add('contextProject');
          contextProject.textContent = project.context;

          let descDiv = document.createElement('div');
          descDiv.classList.add('descProjectDiv');
          descDiv.appendChild(titleProject);
          descDiv.appendChild(descProject);
          descDiv.appendChild(projectTechnos);
          descDiv.appendChild(linksProjectDiv);
          descDiv.appendChild(contextProject);

          let descDiv2 = document.createElement('div');
          descDiv2.classList.add('descProjectDiv2');
          descDiv2.appendChild(titleProject.cloneNode(true));
          descDiv2.appendChild(contextProject.cloneNode(true));

          projectDiv.appendChild(descDiv);
          projectDiv.appendChild(descDiv2);

          projectDiv.style.backgroundImage = `url(${project.image})`;
          listProjects.appendChild(projectDiv);
        });
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function copyMail() {
  const mail = 'yoann.gautier.1@etudiant.univ-rennes.fr';
  navigator.clipboard.writeText(mail).then(async () => {
    document.querySelector('#contactDiv>button').textContent = 'Copié !';
    await new Promise((r) => setTimeout(r, 3000));
    document.querySelector('#contactDiv>button').textContent = 'Copier';
  });
}
