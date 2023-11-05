const bigPicture = document.querySelector('.big-picture'); // Блок большого изображения (ББИ)
const bigPictureImg = document.querySelector('.big-picture__img > img'); // Фото в ББИ
const likesCounter = bigPicture.querySelector('.likes-count'); // Счетчик лайков
const photoCaption = bigPicture.querySelector('.social__caption'); // Описание фотографии
const showedComments = bigPicture.querySelector('.social__comment-shown-count'); // Счетчик показанных комментариев
const totalComments = bigPicture.querySelector('.social__comment-total-count'); // Счетчик всего комментариев
const buttonMoreComments = bigPicture.querySelector('.comments-loader'); // Кнопка загрузки следующих комментариев
const commentsList = bigPicture.querySelector('.social__comments'); // Блок комментариев
const commentTemplate = commentsList.querySelector('.social__comment'); // Шаблон комментария
const buttonClose = bigPicture.querySelector('.big-picture__cancel'); // Кнопка закрыть

// Создание списка комментариев

let showedCommentsCounter = 0;

const createCommentsList = (comments) => {
  showedCommentsCounter = 0;
  let counter = 0;
  comments.forEach (({avatar, name, message}) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    commentsList.append(newComment);
    showedCommentsCounter += 1;
    if (counter >= 5) {
      newComment.classList.add('hidden');
      showedCommentsCounter -= 1;
    }
    counter += 1;
  });
  showedComments.textContent = showedCommentsCounter;
};

// Функция проверки открыто максимум комментариев или нет

const checkMaxComments = () => {
  if (totalComments.textContent === showedComments.textContent) {
    buttonMoreComments.classList.add('hidden');
  }
};

// Функция показа больше комментариев

const showMoreComments = () => {
  const hiddenComments = commentsList.querySelectorAll('.hidden');

  let counter = 0;
  hiddenComments.forEach ((comment) => {
    if (counter < 5) {
      comment.classList.remove('hidden');
      counter += 1;
      showedCommentsCounter += 1;
    }
  });
  showedComments.textContent = showedCommentsCounter;
  checkMaxComments();
};

// Обработчик событий показать больше комментариев

buttonMoreComments.addEventListener('click', showMoreComments);


/* Вариант номер два для функционала загрузки комментариев, очень запутанный с точки зрения написания функции,
но зато добавляет и удаляет обработчик нажатия на кнопку "загрузить еще"
и не отрисовывает сразу весь список комментариев */

// const createComment = ({avatar, name, message}) => {
//   const comment = commentTemplate.cloneNode(true);
//   comment.querySelector('.social__picture').src = avatar;
//   comment.querySelector('.social__picture').alt = name;
//   comment.querySelector('.social__text').textContent = message;
//   return comment;
// };

// const createCommentsList = (comments) => {
//   let showedCommentsCounter = 0;
//   showedCommentsCounter += 5;
//   const fragment = document.createDocumentFragment();

//   const showMoreComments = () => { //определение колбэка для клика на "загрузить еще"
//     commentsList.innerHTML = '';
//     showedCommentsCounter += 5;
//     if (showedCommentsCounter < comments.length) {
//       showedComments.textContent = showedCommentsCounter;
//       comments.slice(0,showedCommentsCounter).forEach((item) => {
//         const newComment = createComment(item);
//         fragment.append(newComment);
//       });
//       commentsList.append(fragment);
//     } else {
//       showedComments.textContent = comments.length;
//       buttonMoreComments.classList.add('hidden');
//       comments.slice(0,comments.length).forEach((item) => {
//         const newComment = createComment(item);
//         fragment.append(newComment);
//       });
//       commentsList.append(fragment);
//       buttonMoreComments.removeEventListener('click', showMoreComments);
//     }
//   };

//   if (showedCommentsCounter >= comments.length) {
//     buttonMoreComments.classList.add('hidden');
//     showedComments.textContent = comments.length;
//     comments.slice(0,comments.length).forEach((item) => {
//       const newComment = createComment(item);
//       fragment.append(newComment);
//     });
//     commentsList.append(fragment);
//   } else {
//     buttonMoreComments.addEventListener('click', showMoreComments);
//     showedComments.textContent = showedCommentsCounter;
//     comments.slice(0,showedCommentsCounter).forEach((item) => {
//       const newComment = createComment(item);
//       fragment.append(newComment);
//     });
//     commentsList.append(fragment);
//   }
// };

// Функция при открытии большого изображения

const openBigPicture = (miniphoto) => {
  commentsList.innerHTML = '';
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImg.src = miniphoto.url;
  likesCounter.textContent = miniphoto.likes;
  totalComments.textContent = miniphoto.comments.length;
  photoCaption.textContent = miniphoto.description;
  createCommentsList(miniphoto.comments);
  checkMaxComments(); // для варианта 2 это не требуется

  document.addEventListener('keydown', onDocumentKeydown);
  bigPicture.addEventListener('click', onFreeZone);
};

// Функция закрытия большого изображения

const closeBigPicture = () => {
  buttonMoreComments.classList.remove('hidden');
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsList.innerHTML = '';

  document.removeEventListener('keydown', onDocumentKeydown);
  bigPicture.removeEventListener('click', onFreeZone);
};

// Проверка если клавиша ESC нажата

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

// Обработчик события нажатия на кнопку закрыть

buttonClose.addEventListener('click', () => {
  closeBigPicture();
});

// Проверка нажатия поля вне большого изображения

function onFreeZone (evt) {
  if (!evt.target.closest('.big-picture__preview')) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export {openBigPicture};
