/* eslint-disable no-inner-declarations */
/* SCRIPT */
'use strict';

{
  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    
    clickedElement.classList.add('active');
    console.log('clickedElement: ', clickedElement);
    
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    targetArticle.classList.add('active');
  };
    
  const links = document.querySelectorAll('.titles a');
  console.log(links);
    
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optAuthorSelector = '.post-author';

  function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      html = html + linkHTML;
      titleList.innerHTML = html;
    }

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();

  function generateTags() {
    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles) {
      let html = '';
      const tagList = article.querySelector(optArticleTagsSelector);
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');
      for(let tag of articleTagsArray) {
        const tagHTML = `<li><a href="#tag-${tag}">${tag} </a></li>`;
        html = html + tagHTML;
      }
      tagList.innerHTML = html;
    }
  }
  generateTags();

  function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    for (let link of activeTagLinks) {
      link.classList.remove('active');
    }

    const getHref = document.querySelectorAll(href);
    for (let tag of getHref) {
      tag.classList.add('active');
    }
  
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags() {
    const tagFinder = document.querySelectorAll('[href^="#tag-"]');

    for (let tag of tagFinder) {
      tag.addEventListener('click', tagClickHandler);
    }
  }
  addClickListenersToTags();


  function generateAuthors() {
    const articles = document.querySelectorAll(optArticleSelector);
    const sidebar = document.querySelectorAll('.authors li');
    const authorList = document.querySelector('.authors');
    console.log(authorList);

    let html1 = '';
    for (let author of sidebar) {
      const authorHTML = author.querySelector('a');
      const href = authorHTML.getAttribute('href');
      const getHref = href.replace('#author-','');
      const linkHTML = '<li><a href="#author-' + getHref + '"><span class="author-name">'+ getHref +'</span></a></li>';
      html1 = html1 + linkHTML;
      authorList.innerHTML = html1;
    }
    
    for (let article of articles) {
      let html = '';

      const authorHTML = article.querySelector(optAuthorSelector);
      const articleAuthor = article.getAttribute('data-author');
      const authorLinkHTML = 'by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      html =  html + authorLinkHTML;
      authorHTML.innerHTML = html;
    }
    
  }
  generateAuthors();

  function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthorLinks = document.querySelectorAll('a.active [href^="#author-"]');

    for (let active of activeAuthorLinks) {
      active.classList.remove('.active');
    }

    const getHref = document.querySelectorAll(href);
    for (let href of getHref) {
      href.classList.add('.active');
    }
    generateTitleLinks('[data-author="' + author + '"]');

  }

  function addClickListenersToAuthors() {
    const authorFinder = document.querySelectorAll('[href^="#author-"]');

    for (let author of authorFinder) {
      author.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors();
}

