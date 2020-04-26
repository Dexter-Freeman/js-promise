document.addEventListener('DOMContentLoaded', function () {

    // Выберем див, в который будем помещать картинки
    let imageContainer = document.querySelector('.img-list');

    // Функция для добавления картинки на страницу
    function createImg(src) {
        imageContainer.innerHTML += `<img src="${src}" alt="gif" class="img">`;
    }

    // Функция для получения урлов картинок и для отрисовки их на странице
    // Перепишем эту функцию используя async/await
    // Объявление async function определяет асинхронную функцию
    // Цель функций async/await упростить использование promises синхронно
    // без использования цепочки then()
    // т.е. мы можем писат асинхронный код, так будто он синхронный (последовательный)
    async function getAndCreateImgs(queryStr) {
        // делаем запрос на api.giphy.com
        // fetch возвращает объект Promise
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=Au06Wg62AqjwnHVBRMMXaz7ReCSTr8Gp&q=${queryStr}&limit=5&offset=0`);
        // Преобразуем ответ в объект при помощи метода .json()
        // Т.к. fetch() возвращает промис, который резолвится в объект типа Response, то 
        // для доступа к необходимым нам данным (статусы, код ответа, тело ответа и др)
        // нам необходимо пользоваться свойствами и методами объекта Response
        // например метод .json() распарсит тело (Response.body) как JSON
        // Response.body это объект типа Body у которого доступен в числе прочих метод .json()
        // promise.then(response => response.json())
        //     .then(json => {
        //         // в данном случае свойство data содержит массив
        //         json.data.forEach(img => {
        //             createImg(img.images.downsized_large.url);
        //         });
        //     })
        //     .catch(err => console.error(err));

        // async/await
        const json = await response.json();
        // Оператор await заставляет функцию, объявленную с использованием 
        // оператора async, ждать выполнения Promise и продолжать выполнение 
        // после возвращения Promise значения
        json.data.forEach(img => {
            createImg(img.images.downsized_large.url);
        });

        // После вызова функция async возвращает Promise. 
        // Когда результат был получен, Promise завершается, возвращая полученное значение.  
        // Когда функция async выбрасывает исключение, Promise ответит отказом 
        // с выброшенным (throws) значением.

        // Функция async может содержать выражение await, которое приостанавливает 
        // выполнение функции async и ожидает ответа от переданного Promise, 
        // затем возобновляя выполнение функции async и возвращая полученное значение.

        // Ключевое слово await допустимо только в асинхронных функциях
    }



    // Выберем форму поиска
    const form = document.forms[0];

    form.addEventListener('submit', function (e) {
        // останавливаем поведение по умолчанию
        e.preventDefault();

        // очищаем див с картинками, чтобы каждый новый поиск менял картинки на странице, а не добавлял новые
        imageContainer.innerHTML = '';

        let input = form.querySelector('#searchString');
        let value = input.value;

        if (!value) return; // если ничего не ввели, то ничего не делать

        // Получаем и отрисовываем гифки
        getAndCreateImgs(value);

        // очищаем инпут
        input.value = '';
    });
