"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// place your code below
const list = document.querySelector('.projects__list--js'); 

fetch("https://api.github.com/users/sokolx/repos?+sort:updated-date-asc")
.then(resp => resp.json())
.then(resp => {

  const repos = resp;

  for (const repo of repos) {
    console.log(repos)
    const {name, html_url, homepage, description, language} = repo;
    
    if (language == 'CSS' || language == 'HTML' || language == 'JavaScript' ) {

      list.innerHTML += `<li class="projects__item">
      <section class="projects__about">
        <span style="font-size: 3rem;">
          <i class="fa fa-github"></i>
        </span>
        <h4 class="projects__name">${name}</h4>
        <p class="projects__description">${description ? description : "Brak opisu projektu. " }</p>
      </section>

      <footer class="projects__footer">

          <a class="projects__links ${homepage ? homepage : "projects__links--inactive" }" href=${homepage}>
            <img class="projects__image" src="/assets/img/img-demo.svg">Demo
          </a>
          <a class="projects__links projects__links--center">
            <div class="projects__divider"></div>
          </a>
          <a class="projects__links" href=${html_url}>
            <img class="projects__image" src="/assets/img/img-git.svg">Github
          </a>

      </footer>

    </li>`
    }
    
  }
  
})
.catch(e => {
  console.log(e);
})