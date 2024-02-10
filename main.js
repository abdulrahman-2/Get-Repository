let getReposBtn = document.getElementById("repos-btn");
let reposInput = document.getElementById("repos-input");
let reposContainer = document.querySelector(".repos-container");

getReposBtn.addEventListener("click", getRepos);

function displayError(message) {
  let content = `
    <div class="no-data">
      <span class="repos-name">${message}</span>
    </div>
  `;
  reposContainer.innerHTML = content;
}

function getRepos() {
  if (reposInput.value === "") {
    displayError("Please enter a GitHub username.");
  } else {
    fetch(`https://api.github.com/users/${reposInput.value}/repos`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          displayError("Failed to fetch repositories.");
          throw new Error("Failed to fetch repositories.");
        }
      })
      .then((repos) => {
        if (repos.length === 0) {
          displayError("No repositories found.");
        } else {
          reposContainer.innerHTML = "";
          for (let repo of repos) {
            let content = `
              <div class="repos-row">
                <span class="repos-name">${repo.name}</span>
                <div class="links">
                  <span>stars ${repo.stargazers_count}</span>
                  <span><a href="${repo.html_url}" target="_blank">visit</a></span>
                </div>
              </div>  
            `;
            reposContainer.innerHTML += content;
            reposInput.value = "";
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
