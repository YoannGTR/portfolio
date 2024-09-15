function writeSkills() {
  fetch(
    './ressources/js/jsons/skills.json',
  )
    .then((response) => response.json())
    .then((data) => {
      // Use the data from the skills.json file here
      console.log(data);
      Array.from(data["skills"]).forEach(element => {
        console.log(element);
        let skill = document.createElement("div");
        skill.classList.add("skill");
        let skillName = document.createElement("h4");
        skillName.textContent = element;
        skill.appendChild(skillName);
        document.getElementById("listSkills").appendChild(skill);
        


      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
writeSkills();

function writeExperience() {
  fetch(
    './ressources/js/jsons/experiences.json',
  )
    .then((response) => response.json())
    .then((data) => {
      // Use the data from the skills.json file here
      console.log(data);
      Array.from(data["experiences"]).forEach(element => {
        console.log(element);
        if(element["category"]=="job"){
          let job = document.createElement("div");
          job.classList.add("job");
          let date = document.createElement("div");
          date.classList.add("date");
          date.classList.add("datej");
          let description = document.createElement("div");
          description.classList.add("description");
          description.classList.add("descriptionj");
          
          let jobPicture = document.createElement("img");
          jobPicture.setAttribute("src", element["picture"]);
          jobPicture.setAttribute("alt", "icone de " +  element["title"]);
          description.appendChild(jobPicture);
          let jobTitle = document.createElement("h3");
          jobTitle.textContent = element["title"];
          description.appendChild(jobTitle);
          let jobCompany = document.createElement("p");
          jobCompany.textContent = element["company"];
          description.appendChild(jobCompany);
          let jobLocation = document.createElement("p");
          jobLocation.textContent = element["location"];
          description.appendChild(jobLocation);
          
          let jobFirstDate = document.createElement("h3");
          jobFirstDate.textContent = element["dateBegin"];
          date.appendChild(jobFirstDate);
          if(element["dateEnd"]!=""){
            let dash = document.createElement("h3");
            dash.textContent = "-";
            date.appendChild(dash);
            let jobSecDate = document.createElement("h3");
            jobSecDate.textContent = element["dateEnd"];
            date.appendChild(jobSecDate);
          }
          
          job.appendChild(date);
          job.appendChild(description);
          document.getElementById("listExperience").appendChild(job);
        }
        else if(element["category"]=="study"){
          let study = document.createElement("div");
          study.classList.add("study");
          let date = document.createElement("div");
          date.classList.add("date");
          date.classList.add("dates");
          let description = document.createElement("div");
          description.classList.add("description");
          description.classList.add("descriptions");
          
          let studyPicture = document.createElement("img");
          studyPicture.setAttribute("src", element["picture"]);
          studyPicture.setAttribute("alt", "icone de " +  element["title"]);
          description.appendChild(studyPicture);
          let studyTitle = document.createElement("h3");
          studyTitle.textContent = element["title"];
          description.appendChild(studyTitle);
          let stydyLine = document.createElement("p");
          stydyLine.textContent = element["line"];
          description.appendChild(stydyLine);
          let studyMention = document.createElement("p");
          studyMention.textContent = element["mention"];
          description.appendChild(studyMention);
          
          let studyFirstDate = document.createElement("h3");
          studyFirstDate.textContent = element["dateBegin"];
          date.appendChild(studyFirstDate);
          if(element["dateEnd"]!=""){
            let dash = document.createElement("h3");
            dash.textContent = "-";
            date.appendChild(dash);
            let studySecDate = document.createElement("h3");
            studySecDate.textContent = element["dateEnd"];
            date.appendChild(studySecDate);
          }
          
          study.appendChild(date);
          study.appendChild(description);
          document.getElementById("listExperience").appendChild(study);
        }
        


      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
writeExperience();