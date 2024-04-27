const config = {
    baseUrl:"https://nomoreparties.co/v1/wff-cohort-11",
    headers: {
        authorization: '9171dee1-4f6a-4020-8ef2-e620aa73f15f',
        'Content-Type': 'application/json'
},
 };
/*Функция для показа ошибок */ 
function errorResponse(res, message) {
if(res.ok) {
    return res.json();
}
return Promise.reject(`${message}: ${res.status}`)
};

/**Запрос данных пользователя с сервера */
function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers:config.headers,
    }) .then((res) => {
        return errorResponse(res, "Ошибка при запросе данных пользователя");
    });
};
// getUserInfo();
/*Запрос карточек с сервера */
function getCardInfo() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers:config.headers,
    }) .then((res) => {
        return errorResponse(res, "Ошибка при получении карточек");
    });
};
 /*Запрос редактирования профиля*/
 function getEditProfile(name, about){
    return fetch(`${config.baseUrl}/users/me`,{
        method: 'PATCH',
        headers:config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
 };

/*Добавление новой карточки */
function addNewCard (name, link) {
    return fetch(`${config.url}/cards`,{
        method: 'POST',
        headers:config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
 };
 
 export {addNewCard,errorResponse,getEditProfile, getUserInfo, getCardInfo};
 