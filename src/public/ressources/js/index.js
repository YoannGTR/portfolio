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
    const response = await fetch('./ressources/js/jsons/experiences.json');
    const data = await response.json();
    // console.log(data);
    cpt = 1;
    Array.from(data['experiences']).forEach((element) => {
      // console.log(element);
      if (element['category'] == 'job') {
        writeJob(element);
      } else if (element['category'] == 'study') {
        writeStudy(element, cpt);
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

function writeStudy(element, cpt) {
  let date = document.createElement('div');
  date.classList.add('date');
  date.classList.add('dateStudy');
  dicStudyDate[cpt] = date;
  let description = document.createElement('div');
  description.classList.add('description');
  description.classList.add('descriptionStudy');
  let vide = document.createElement('div');
  vide.classList.add('vide');
  vide.classList.add('videStudy');

  let studyPicture = document.createElement('img');
  studyPicture.setAttribute('src', element['picture']);
  studyPicture.setAttribute('alt', 'icone de ' + element['title']);
  description.appendChild(studyPicture);
  let studyTitle = document.createElement('h3');
  studyTitle.textContent = element['title'];
  description.appendChild(studyTitle);
  let stydyLine = document.createElement('p');
  stydyLine.textContent = element['line'];
  description.appendChild(stydyLine);
  let studyMention = document.createElement('p');
  studyMention.textContent = element['mention'];
  description.appendChild(studyMention);

  let studyFirstDate = document.createElement('h3');
  studyFirstDate.textContent = element['dateBegin'];
  date.appendChild(studyFirstDate);
  if (element['dateEnd'] != '') {
    let dash = document.createElement('h3');
    dash.textContent = '-';
    date.appendChild(dash);
    let studySecDate = document.createElement('h3');
    studySecDate.textContent = element['dateEnd'];
    date.appendChild(studySecDate);
  }

  document.getElementById('listExperience').appendChild(date);
  document.getElementById('listExperience').appendChild(description);
  document.getElementById('listExperience').appendChild(vide);
}

function writeJob(element) {
  let date = document.createElement('div');
  date.classList.add('date');
  date.classList.add('dateJob');
  let description = document.createElement('div');
  description.classList.add('description');
  description.classList.add('descriptionJob');
  let vide = document.createElement('div');
  vide.classList.add('vide');
  vide.classList.add('videJob');

  let jobPicture = document.createElement('img');
  jobPicture.setAttribute('src', element['picture']);
  jobPicture.setAttribute('alt', 'icone de ' + element['title']);
  description.appendChild(jobPicture);
  let jobTitle = document.createElement('h3');
  jobTitle.textContent = element['title'];
  description.appendChild(jobTitle);
  let jobCompany = document.createElement('p');
  jobCompany.textContent = element['company'];
  description.appendChild(jobCompany);
  let jobLocation = document.createElement('p');
  jobLocation.textContent = element['location'];
  description.appendChild(jobLocation);

  let jobFirstDate = document.createElement('h3');
  jobFirstDate.textContent = element['dateBegin'];
  date.appendChild(jobFirstDate);
  if (element['dateEnd'] != '') {
    let dash = document.createElement('h3');
    dash.textContent = '-';
    date.appendChild(dash);
    let jobSecDate = document.createElement('h3');
    jobSecDate.textContent = element['dateEnd'];
    date.appendChild(jobSecDate);
  }
  document.getElementById('listExperience').appendChild(vide);
  document.getElementById('listExperience').appendChild(date);
  document.getElementById('listExperience').appendChild(description);
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
  // console.log('gridChange');
  gridChange();
}
test();
// window.onresize = gridChange();
window.addEventListener('resize', gridChange);
