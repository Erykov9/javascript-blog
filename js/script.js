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
    optAuthorSelector = '.post-author',
    optAuthorListSelector = '.authors.list',
    optTagListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

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

  // TAGS

  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 99999
    };

    for (let tag in tags) {
      params.max = tags[tag];

      if(tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if(tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  } 


  function generateTags() {
    let allTags = {};
    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles) {
      let html = '';
      const tagList = article.querySelector(optArticleTagsSelector);
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');
      for(let tag of articleTagsArray) {
        const tagHTML = `<li><a href="#tag-${tag}">${tag} </a></li>`;
        html = html + tagHTML;
        if(!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      tagList.innerHTML = html;
    }

    const tagList = document.querySelector(optTagListSelector);
    const tagsParams = calculateTagsParams(allTags);

    console.log('tagsParams: ', tagsParams);
    let allTagsHTML = '';
    for (let tag in allTags) {
      allTagsHTML += '<li><a href="#" class="'+ calculateTagClass(allTags[tag], tagsParams) +'"> '+ tag + '</a> <span>(' + allTags[tag] +')</span></li>';
    }
    tagList.innerHTML = allTagsHTML;
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


  //AUTHORS


  function generateAuthors() {
    let allAuthors = [];
    const articles = document.querySelectorAll(optArticleSelector);
    
    for (let article of articles) {
      let html = '';

      const authorHTML = article.querySelector(optAuthorSelector);
      const articleAuthor = article.getAttribute('data-author');
      const authorLinkHTML = 'by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      const authorLinkListHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';

      if(allAuthors.indexOf(authorLinkListHTML) == -1) {
        allAuthors.push(authorLinkListHTML);
      }

      html =  html + authorLinkHTML;
      authorHTML.innerHTML = html;
    }
    const authorsList = document.querySelector(optAuthorListSelector);
    authorsList.innerHTML = allAuthors.join(' ');
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