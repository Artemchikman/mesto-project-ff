const config = {
    baseUrl:"https://nomoreparties.co/v1/wff-cohort-11",
    headers: {
        authorization: "9171dee1-4f6a-4020-8ef2-e620aa73f15f",
        "Content-Type": "application/json"
},
};
/*Функция для показа ошибок */ 
export function errorResponse(res, message) {
if (res.ok) {
    return res.json();
}
return Promise.reject(`${message}: ${res.status}`);
};

/**Запрос данных пользователя с сервера */
export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: config.headers,
    }).then((res) => {
        if (res.ok) {
            return res.json(); // Вернуть JSON данные в случае успеха
        }
        return errorResponse(res, "Ошибка при запросе данных пользователя");
    });
};
/*Запрос карточек с сервера */
export function getCardInfo() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers:config.headers,
    }) .then((res) => {
        if (res.ok) {
            return res.json(); // Вернуть JSON данные в случае успеха
        }
        return errorResponse(res, "Ошибка при получении карточек");
    });
};
 /*Запрос редактирования профиля*/
 export function getEditProfile(name, about){
    return fetch(`${config.baseUrl}/users/me`,{
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        }),
    }).then((res) => {
        if (res.ok) {
            return res.json(); // Вернуть JSON данные в случае успеха
        }
        return errorResponse(res, "Ошибка при редактировании профиля");
    });
 };

   // Обновление аватара пользователя
   export function updateAvatar(link){
    return fetch(`${config.baseUrl}/users/me/avatar`,{
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: link,
        }),
    }).then((res) => {
        if (res.ok) {
            return res.json(); // Вернуть JSON данные в случае успеха
        }
        return errorResponse(res, "Ошибка при обновлении аватара");
    });
 };

/*Добавление новой карточки */
export function addNewCard (name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        }),
    }).then((res) => {
        if (res.ok) {
            return res.json(); // Вернуть JSON данные в случае успеха
          }
     return errorResponse(res, "Ошибка при добавлении краточки")
    })
    
 };
/*Удаление новой карточки */
export function deleteNewCard (cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers:config.headers,
    }).then((res) => {
        if(!res.ok) {
        return errorResponse(res, "Ошибка при добавлении краточки")
        }
    })
     };

 //Функция добавления лайка на карточку
 export function addLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return errorResponse(res, "Ошибка при установке лайка");
  });
};

//Функция удаления лайка с карточки
export function removeLikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then((res) => {
      return errorResponse(res, "Ошибка при установке лайка");
    });
  };
  

