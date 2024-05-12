(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-11",headers:{authorization:"9171dee1-4f6a-4020-8ef2-e620aa73f15f","Content-Type":"application/json"}};function t(e,t){return e.ok?e.json():Promise.reject("".concat(t,": ").concat(e.status))}function r(r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"PUT",headers:e.headers}).then((function(e){return t(e,"Ошибка при установке лайка")}))}function n(r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:e.headers}).then((function(e){return t(e,"Ошибка при установке лайка")}))}var o=document.querySelector("#card-template").content.querySelector(".card");function c(e,t,r,n,c){var a=o.cloneNode(!0);a.querySelector(".card__title").textContent=e.name;var u=a.querySelector(".card__image");u.src=e.link,u.alt=e.name;var i=e._id;u.addEventListener("click",n);var l=a.querySelector(".card__like-button"),s=a.querySelector(".card__like-count");s.textContent=e.likes.length,l.addEventListener("click",(function(){r(l,s,i)}));var d=a.querySelector(".card__delete-button");return e.owner._id!==c?d.style.display="none":d.addEventListener("click",(function(){t(i,a)})),a}function a(e,t,o){(e.classList.contains("card__like-button_is-active")?n:r)(o).then((function(r){t.textContent=r.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){console.error("Ошибка при нажатии лайка:",e)}))}function u(r,n){(function(r){return fetch("".concat(e.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:e.headers}).then((function(e){if(!e.ok)return t(e,"Ошибка при добавлении краточки")}))})(r).then((function(){n.remove()})).catch((function(e){console.log("Ошибка при удалении карточки:"+e)}))}function i(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",s)}function l(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s)}function s(e){"Escape"===e.key&&l(document.querySelector(".popup_is-opened"))}var d=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""};function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var f=document.querySelector(".places__list"),y=document.querySelector(".popup_type_edit"),_=document.querySelector(".profile__edit-button"),m=document.querySelector(".popup_type_new-card"),v=document.forms["new-place"],h=v.querySelector(".popup__input_type_card-name"),S=v.querySelector(".popup__input_type_url"),b=document.querySelector(".profile__add-button"),q=m.querySelector(".popup__button"),g=document.querySelectorAll(".popup"),k=document.querySelector(".popup__form"),E=(k.querySelector(".popup__input_type_name"),k.querySelector(".popup__input_type_description"),document.forms["edit-profile"]),C=document.querySelector(".profile__title"),L=document.querySelector(".profile__description"),A=document.querySelector(".popup_type_image"),j=A.querySelector(".popup__image"),x=A.querySelector(".popup__caption"),w=y.querySelector(".popup__button"),T=document.querySelector(".profile__image"),U=document.querySelector(".popup_type_avatar"),O=document.forms["avatar-profile"],M=document.querySelector(".popup__input_type_avatar"),P=U.querySelector(".popup__button"),B=document.querySelector(".profile__image-section");function D(e,t){t.textContent=e?"Сохранение...":"Сохранить"}O.addEventListener("submit",(function(r){var n;r.preventDefault(),D(!0,P),(n=r.target.link.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():t(e,"Ошибка при обновлении аватара")}))).then((function(e){T.src=e.avatar,l(U),O.reset()})).catch((function(e){console.error("Ошибка при изменении аватара:",e)})).finally((function(){D(!1,P)}))})),B.addEventListener("click",(function(){M.value="",i(U)})),g.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){l(e)})),e.addEventListener("click",(function(t){t.target===e&&l(e)}))})),E.addEventListener("submit",(function(r){var n,o;r.preventDefault(),D(!0,w),(n=r.target.name.value,o=r.target.description.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:o})}).then((function(e){return e.ok?e.json():t(e,"Ошибка при редактировании профиля")}))).then((function(e){C.textContent=e.name,L.textContent=e.about,l(y)})).catch((function(e){console.log("Ошибка при редактировании профиля:"+e)})).finally((function(){D(!1,w)}))}));var N=document.querySelector(".popup_type_new-card");function H(e){j.src=e.target.src,j.alt=e.target.alt,x.textContent=e.target.alt,i(A)}v.addEventListener("submit",(function(r){var n,o;r.preventDefault(),D(!0,q),(n=h.value,o=S.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:o})}).then((function(e){return e.ok?e.json():t(e,"Ошибка при добавлении краточки")}))).then((function(e){var t=c(e,u,a,H);f.prepend(t),l(N),v.reset()})).catch((function(e){console.error("Ошибка при добавлении карточки:",e)})).finally((function(){D(!1,q),v.reset(),l(m)}))})),b.addEventListener("click",(function(){i(m)})),_.addEventListener("click",(function(){!function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(r){r.value="",r.setCustomValidity(""),d(e,r,t)}));var r=e.querySelector(t.submitButtonSelector);r.disabled=!0,r.style.backgroundColor="#00000026"}(E,I),i(y)}));var I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(o){o.addEventListener("input",(function(){var o=r.every((function(r){return function(e,t,r){var n=e.querySelector(r.submitButtonSelector),o=t.getAttribute("data-error-message")||t.validationMessage;return t.validity.valid?(d(e,t,r),n.disabled=!1,n.style.backgroundColor="",!0):(t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage||o):t.setCustomValidity(""),function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage,r),n.disabled=!0,n.style.backgroundColor="#00000026",!1)}(e,r,t)}));n.disabled=!o,o&&(n.style.backgroundColor="")}))}))}(t,e)}))}(I),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}).then((function(e){return e.ok?e.json():t(e,"Ошибка при запросе данных пользователя")})),fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}).then((function(e){return e.ok?e.json():t(e,"Ошибка при получении карточек")}))]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,r)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],i=n[1];C.textContent=o.name,L.textContent=o.about,T.src=o.avatar,f.innerHTML="",i.forEach((function(e){var t=c(e,u,a,H,o._id);f.appendChild(t)}))})).catch((function(e){console.error("Ошибка загрузки данных:",e)}))})();