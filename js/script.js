/* SCRIPT */
'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
  
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
  

    clickedElement.classList.add('active')
    console.log('clickedElement: ', clickedElement);
  
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
  
    const articleSelector = clickedElement.getAttribute('href')
    console.log(articleSelector);

    const targetArticle = document.querySelector(articleSelector)
    console.log(targetArticle);

    targetArticle.classList.add('active')
}
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }