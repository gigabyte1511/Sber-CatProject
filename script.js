// Проект домашнего задания "Сервис взаимодействия с котиками"
// Реализовано: 
//   1. Отображение на странице информации обо всех котах, хранящиеся на сервере
//   2. Возможность добавления нового кота при помощи модального окна с сохранением на сервере
//   3. Добавлено модальное окно с отображением информации о коте с возможностью ее редактирования
//   4. Удаление кота из базы данных
//   5. Сохранение значений полей ввода в sessionStorage модального окна добавления нового кота.


  //Константы с url серверных запросов
const GET_ALL_CATS = "http://sb-cats.herokuapp.com/api/2/gigabyte1511/show";
const EDIT_CATS = "http://sb-cats.herokuapp.com/api/2/gigabyte1511/update/";
const DELETE_CATS = "http://sb-cats.herokuapp.com/api/2/gigabyte1511/delete/";
const ADD_CAT ="http://sb-cats.herokuapp.com/api/2/gigabyte1511/add";

//Массив значений ID котов
const catsIDMass = [];

getAllCats(GET_ALL_CATS);

//Обработчк кнопки добавления нового кота
const $addCat = document.querySelector(".addCat")
$addCat.addEventListener("click", addCat);

//Функция получения параметров всех котов с сервера
function getAllCats(url){
let getAllCatsMetod = fetch(url);
getAllCatsMetod
.then((response) => {
  return response.json();
})
.then((responseJson) => {
  //Отчистка массива значений ID котов
  catsIDMass.length = 0;

  responseJson.data.forEach((cat) => {

    catsIDMass.push(cat.id);
    //Добавление на страницу карточек с котами
    const $cards = document.querySelector(".cards");
    $cards.appendChild(createCard(cat));
  });

});
}
//Функция создания карточки с котом, полученным от сервера
function createCard(cat){

  const $card = document.createElement("div");
    $card.className = "card";

    const $imageContainer = document.createElement("div");
    $imageContainer.className = "imageContainer"
    $card.appendChild($imageContainer);

    const $imgCat = document.createElement("img");
    $imgCat.className = "imgCat";
    $imgCat.src = cat.img_link;
    $imageContainer.appendChild($imgCat);

    const $infoContainer = document.createElement("div");
    $infoContainer.className = "info";
    $card.appendChild($infoContainer);

    const $name = document.createElement("h1");
    $name.classList = "catName";
    $name.innerText = cat.name;
    $infoContainer.appendChild($name);

    const $description = document.createElement("p");
    $description.innerText = cat.description;
    $infoContainer.appendChild($description);

    const $ratingContainer = document.createElement("div");
    $ratingContainer.className = "rate";
    $infoContainer.appendChild($ratingContainer);

    const $stars = document.createElement("div");
    $stars.classList = "stars";
    $stars.innerText = `${cat.rate} stars`
    $ratingContainer.appendChild($stars);

    const $favoriteImg = document.createElement("img");
    $favoriteImg.classList = "favourite";
    if(cat.favourite == true){
      $favoriteImg.src = "./img/like_3.svg"
    }
    else $favoriteImg.src = "./img/like-placeholder_1.svg"
    $ratingContainer.appendChild($favoriteImg);

    const $buttonContainer = document.createElement("div");
    $buttonContainer.className = "buttonContainer";
    $card.appendChild($buttonContainer);

    const $editButton = document.createElement("button");
    $editButton.className = "editButton";
    $editButton.innerText = "EDIT";
    
    $editButton.addEventListener('click', (e) => {
      editCat(cat.id, cat.age, cat.name, cat.rate, cat.description, cat.favourite, cat.img_link);
    });

    $buttonContainer.appendChild($editButton);

    const $deleteButton = document.createElement("button");
    $deleteButton.className = "deleteButton";
    $deleteButton.innerText = "DELETE";
    
    $deleteButton.addEventListener('click', (e) => {
      deleteCat(cat.id, cat.age, cat.name, cat.rate, cat.description, cat.favourite, cat.img_link);
    });

    $buttonContainer.appendChild($deleteButton);

    return $card;
}
//Функция редактирования созданной карточки с котом
function editCat(id, age, name, rate, description, favourite, img_link) {
  const $vrapper = document.querySelector(".vrapper");

  $vrapper.appendChild(createEditModal(id, age, name, rate, description, favourite, img_link));
}
//Функция удаления карточки с котом
function deleteCat(id, url){
  console.log(id);
  
  console.log(url+id);

  console.log(catsIDMass);
  catsIDMass.splice(catsIDMass.indexOf(id),1);
  console.log(catsIDMass);

  let deleteCatMetod = fetch(DELETE_CATS+id, {
    method: 'DELETE',
    // headers: {
    //   'Content-Type': 'application/json; charset=utf-8'
    // },
    // body: JSON.stringify(catData),
  });
  deleteCatMetod
  .then((response) => {
    return response.json();
  })
  .then((responseJson) => {
    console.log(responseJson);
    const $cardCollection = document.querySelectorAll(".card");
    $cardCollection.forEach((card)=>{
      card.remove();
    })
    getAllCats(GET_ALL_CATS);
  });
}
//Функция добавления новой карточки с котом
function addCat(){
  const $vrapper = document.querySelector(".vrapper");
  $vrapper.appendChild(createAddModal("id", "age", "name", "rate", "description", "favourite", "img_link"));
}
//Функция создания модального окна редактирования карточки с котом
function createEditModal(id, age, name, rate, description, favourite, img_link){
  const $overlay = document.createElement("div");
  $overlay.className = "overlay";
  

  const $modal = document.createElement("div");
  $modal.className = "modal";
  $overlay.appendChild($modal);
  

  const $imageContainer = document.createElement("div");
  $imageContainer.className = "imageContainer";
  $modal.appendChild($imageContainer);

  const $catImg = document.createElement("img");
  $catImg.src = img_link;
  $imageContainer.appendChild($catImg);

  const $controlContainer = document.createElement("div");
  $controlContainer.className = "controlContainer";
  $modal.appendChild($controlContainer);
// Age---------------------------------------------------
  const $ageInputName = document.createElement("p");
  $ageInputName.innerText = "age:";
  $controlContainer.appendChild($ageInputName);

  const $ageInput = document.createElement("input");
  $ageInput.className = "modalInput";
  $controlContainer.appendChild($ageInput);
// Name---------------------------------------------------

  const $nameInputName = document.createElement("p");
  $nameInputName.innerText = "name:";
  $controlContainer.appendChild($nameInputName);

  const $nameInput = document.createElement("input");
  $nameInput.className = "modalInput";
  $nameInput.value = name;
  $controlContainer.appendChild($nameInput);
// Rate---------------------------------------------------

  const $rateInputName = document.createElement("p");
  $rateInputName.innerText = "rate:";
  $controlContainer.appendChild($rateInputName);

  const $rateInput = document.createElement("input");
  $rateInput.className = "modalInput";
  $rateInput.value = rate;
  $controlContainer.appendChild($rateInput);
// Description---------------------------------------------------

  const $descriptionInputName = document.createElement("p");
  $descriptionInputName.innerText = "description:";
  $controlContainer.appendChild($descriptionInputName);

  const $descriptionInput = document.createElement("input");
  $descriptionInput.className = "modalInput";
  $descriptionInput.value = description;
  $controlContainer.appendChild($descriptionInput);
// Img_link---------------------------------------------------

  const $img_linkInputName = document.createElement("p");
  $img_linkInputName.innerText = "URL";
  $controlContainer.appendChild($img_linkInputName);

  const $img_linkInput = document.createElement("input");
  $img_linkInput.className = "modalInput";;
  $img_linkInput.value = img_link;
  $controlContainer.appendChild($img_linkInput);
  $img_linkInput.addEventListener("input",(event)=>{
    console.log(this.value);
    $catImg.src = event.target.value;
  });

// ---------------------------------------------------
  const $favoriteCheckBoxName = document.createElement("p");
  $favoriteCheckBoxName.innerText = "favourite:";
  $controlContainer.appendChild($favoriteCheckBoxName);

  const $favoriteCheckBox = document.createElement("input");
  $favoriteCheckBox.type = "checkbox";
  $favoriteCheckBox.className = "modalInput";
  $favoriteCheckBox.checked = favourite;
  $controlContainer.appendChild($favoriteCheckBox);
// ---------------------------------------------------


  const $saveButton = document.createElement("button");
  $saveButton.className = "modalSaveButton";;
  $saveButton.innerText = "Save";
  $saveButton.addEventListener("click", (e) => {
    //Отправка значений полей отредактированного кота на сервер для сохранения измененеий
    saveEditCat(id,$ageInput.value, $nameInput.value, $rateInput.value, $$descriptionInput.value,  $favoriteCheckBox, $catImg.src);
  });
  $controlContainer.appendChild($saveButton);

  const $closeButton = document.createElement("button");
  $closeButton.className = "modalCloseButton";;
  $closeButton.innerText = "Close";
  $closeButton.addEventListener("click", closeModal);
  $controlContainer.appendChild($closeButton);
  

  return $overlay;
}
//Функция создания модального окна создания новой карточки с котом
function createAddModal(id, age, name, rate, description, favourite, img_link){
  const $overlay = document.createElement("div");
  $overlay.className = "overlay";
  //$overlay.addEventListener("click", closeModal);

  const $modal = document.createElement("div");
  $modal.className = "modal";
  $overlay.appendChild($modal);

  const $imageContainer = document.createElement("div");
  $imageContainer.className = "imageContainer";
  $modal.appendChild($imageContainer);

  const $catImg = document.createElement("img");
  $imageContainer.appendChild($catImg);

  const $controlContainer = document.createElement("div");
  $controlContainer.className = "controlContainer";
  $modal.appendChild($controlContainer);
// Age---------------------------------------------------
  const $ageInputName = document.createElement("p");
  $ageInputName.innerText = "age:";
  $controlContainer.appendChild($ageInputName);

  const $ageInput = document.createElement("input");
  $ageInput.className = "modalInput";
  $ageInput.value = sessionStorage.getItem("age");
  $controlContainer.appendChild($ageInput);
// Name---------------------------------------------------

  const $nameInputName = document.createElement("p");
  $nameInputName.innerText = "name:";
  $controlContainer.appendChild($nameInputName);

  const $nameInput = document.createElement("input");
  $nameInput.className = "modalInput";
  $nameInput.value = sessionStorage.getItem("name");
  $controlContainer.appendChild($nameInput);
// Rate---------------------------------------------------

  const $rateInputName = document.createElement("p");
  $rateInputName.innerText = "rate:";
  $controlContainer.appendChild($rateInputName);

  const $rateInput = document.createElement("input");
  $rateInput.className = "modalInput";
  $rateInput.value = sessionStorage.getItem("rate");
  $controlContainer.appendChild($rateInput);
// Description---------------------------------------------------

  const $descriptionInputName = document.createElement("p");
  $descriptionInputName.innerText = "description:";
  $controlContainer.appendChild($descriptionInputName);

  const $descriptionInput = document.createElement("input");
  $descriptionInput.className = "modalInput";
  $descriptionInput.value = sessionStorage.getItem("description");
  $controlContainer.appendChild($descriptionInput);
// Favorite---------------------------------------------------

  const $favoriteCheckBoxName = document.createElement("p");
  $favoriteCheckBoxName.innerText = "favourite:";
  $controlContainer.appendChild($favoriteCheckBoxName);

  const $favoriteCheckBox = document.createElement("input");
  $favoriteCheckBox.type = "checkbox";
  $favoriteCheckBox.className = "modalInput";
  $controlContainer.appendChild($favoriteCheckBox);
// Img_link---------------------------------------------------

  const $img_linkInputName = document.createElement("p");
  $img_linkInputName.innerText = "URL";
  
  $controlContainer.appendChild($img_linkInputName);

  const $img_linkInput = document.createElement("input");
  $img_linkInput.className = "modalInput";;
  $img_linkInput.value = sessionStorage.getItem("img_link");
  $controlContainer.appendChild($img_linkInput);
  $img_linkInput.addEventListener("input",(event)=>{
    console.log(this.value);
    $catImg.src = event.target.value;
  });
  // ---------------------------------------------------
  

  const $addButton = document.createElement("button");
  $addButton.className = "modalAddButton";;
  $addButton.innerText = "Save";
  $addButton.addEventListener("click", (e) => {
    //Запись значений полей в sessionStorage
    sessionStorage.setItem("age", $ageInput.value);
    sessionStorage.setItem("name", $nameInput.value);
    sessionStorage.setItem("rate", $rateInput.value);
    sessionStorage.setItem("description", $descriptionInput.value);
    sessionStorage.setItem("img_link", $img_linkInput.value);
    //Отправка значений полей нового кота на сервер для его сохранения
    saveAddCat($ageInput.value, $nameInput.value, $rateInput.value, $descriptionInput.value,  $favoriteCheckBox,  $img_linkInput.value);
  });
  $controlContainer.appendChild($addButton);

  const $closeButton = document.createElement("button");
  $closeButton.className = "modalCloseButton";;
  $closeButton.innerText = "Close";
  $closeButton.addEventListener("click", closeModal);
  $controlContainer.appendChild($closeButton);

  return $overlay;
}
//Функция отправки и сохранения на сервере новой созданной карточки с котом
function saveAddCat(age, name, rate, description, checkbox, img_link){
  //Преобразование знаяения чекбокса
  let favourite = "";
  if (checkbox.checked) {favourite= true}
	else {favourite = false}
  console.log(age, name, rate, description, favourite, img_link);

  console.log(catsIDMass);
  let newId = 0;
  if(catsIDMass.length != 0) {
  catsIDMass.sort();
  newId = catsIDMass[catsIDMass.length-1] + 1;
  }
  else newId = 1;

  
  const catData = {
    "id": newId,
    "age":age,
    "name":name,
    "rate":rate,
    "description":description,
    "favourite":favourite,
    "img_link":img_link
  } 
  console.log(ADD_CAT);
  console.log(catData);
  console.log(JSON.stringify(catData));

  let editCatMetod = fetch(ADD_CAT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(catData),
  });
  editCatMetod 
  .then((response) => {
    return response.json();
  })
  .then((responseJson) => {
    console.log(responseJson);
    const $modal = document.querySelector(".overlay");
    $modal.remove();
    const $cardCollection = document.querySelectorAll(".card");
    $cardCollection.forEach((card)=>{
      card.remove();
    })
    getAllCats(GET_ALL_CATS);
  });

}
//Функция отправки и сохранения на сервере изменений отредактированный карточки с котом
function saveEditCat(id, ageInput, nameInput, rateInput, dicripton, checkbox, img_link){
  //Преобразование знаяения чекбокса
  let favourite = "";
  if (checkbox.checked) {favourite= true}
	else {favourite = false}

  console.log(id, ageInput, nameInput, rateInput, dicripton, favourite);
  //Объект с данными для отправки на сервер
  const catData = {
    "age":ageInput,
    "rate":rateInput,
    "dicripton":dicripton,
    "favourite":favourite,
    "img_link": img_link,
  } 
  console.log(JSON.stringify(catData));

  let editCatMetod = fetch(EDIT_CATS+id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(catData),
  });
  editCatMetod 
  .then((response) => {
    return response.json();
  })
  .then((responseJson) => {
    console.log(responseJson);
    //Закрытие модального окна и обновление всех карточек страницы
    closeModal();
    const $cardCollection = document.querySelectorAll(".card");
    $cardCollection.forEach(card => card.remove());
    getAllCats(GET_ALL_CATS);
  });

}
//Функция закрытия модального окна
function closeModal(){
  const $modal = document.querySelector(".overlay");
  $modal.remove();
}
