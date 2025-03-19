import{a as l,S as d,i as f}from"./assets/vendor-Czlk9Ly7.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const u="49290538-d7fd0606fc4d2d8ce4c897481",p="https://pixabay.com/api/";async function m(s){try{return(await l.get(p,{params:{key:u,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data.hits}catch(r){throw console.error("Error fetching images:",r),r}}const n=document.querySelector(".gallery");let y=new d(".gallery a");function h(s){if(n.innerHTML="",s.length===0){f.error({title:"Error",message:"Sorry, there are no images matching your search query.",position:"topRight"});return}const r=s.map(t=>`
    <li class="gallery-item">
      <a href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p>Likes ${t.likes}</p>
        <p>Views ${t.views}</p>
        <p>Comments ${t.comments}</p>
        <p>Downloads ${t.downloads}</p>
      </div>
    </li>`).join("");n.insertAdjacentHTML("beforeend",r),y.refresh()}const g=document.querySelector(".form"),c=document.querySelector(".loader");g.addEventListener("submit",async s=>{s.preventDefault();const r=s.target.elements["search-text"].value.trim();if(r){c.style.display="block";try{const t=await m(r);h(t),s.target.reset()}catch{iziToast.error({title:"Error",message:"Failed to fetch images"})}finally{c.style.display="none"}}});
//# sourceMappingURL=index.js.map
