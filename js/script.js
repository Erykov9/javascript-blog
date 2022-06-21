/* eslint-disable no-inner-declarations */
/* SCRIPT */
'use strict';

{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-article').innerHTML),
    authorArticle: Handlebars.compile(document.querySelector('#template-author-article').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  };

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

  const opts = {
    ArticleSelector: '.post',
    TitleSelector: '.post-title',
    TitleListSelector: '.titles',
    ArticleTagsSelector: '.post-tags .list',
    AuthorSelector: '.post-author',
    AuthorListSelector: '.authors.list',
    TagListSelector: '.tags.list',
    CloudClassCount: 5,
    CloudClassPrefix: 'tag-size-'
  };

  function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(opts.TitleListSelector);
    console.log(titleList);
    const articles = document.querySelectorAll(opts.ArticleSelector + customSelector);
    let html = '';
    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(opts.TitleSelector).innerHTML;
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
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
    const classNumber = Math.floor(percentage * (opts.CloudClassCount - 1) + 1);
    return opts.CloudClassPrefix + classNumber;
  } 


  function generateTags() {
    let allTags = {};
    console.log(allTags);
    const articles = document.querySelectorAll(opts.ArticleSelector);

    for(let article of articles) {
      let html = '';
      const tagList = article.querySelector(opts.ArticleTagsSelector);
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');
      for(let tag of articleTagsArray) {
        const tagHTMLdata = {inner: tag, tagName: tag};
        const tagHTML = templates.tagLink(tagHTMLdata);
        html = html + tagHTML;
        if(!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      tagList.innerHTML = html;
    }

    const tagList = document.querySelector(opts.TagListSelector);
    const tagsParams = calculateTagsParams(allTags);

    console.log('tagsParams: ', tagsParams);
    const allTagsData = {tags: []};
    for (let tag in allTags) {
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
    const articles = document.querySelectorAll(opts.ArticleSelector);
    
    for (let article of articles) {
      let html = '';

      const authorHTML = article.querySelector(opts.AuthorSelector);
      const articleAuthor = article.getAttribute('data-author');
      const authorLinkHTMLData = {id: articleAuthor, author: articleAuthor};
      const authorLinkHTML = templates.authorArticle(authorLinkHTMLData);
      const authorLinkListHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';

      if(allAuthors.indexOf(authorLinkListHTML) == -1) {
        allAuthors.push(authorLinkListHTML);
      }

      html =  html + authorLinkHTML;
      authorHTML.innerHTML = html;
    }
    const authorsList = document.querySelector(opts.AuthorListSelector);
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

