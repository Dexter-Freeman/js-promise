document.addEventListener('DOMContentLoaded', function () {

    // Выберем див, в который будем помещать картинки
    let imageContainer = document.querySelector('.img-list');

    // Функция для добавления картинки на страницу
    function createImg(src) {
        imageContainer.innerHTML += `<img src="${src}" alt="gif" class="img">`;
    }

    // Функция для получения урлов картинок и для отрисовки их на странице
    function getAndCreateImgs(queryStr) {
        // делаем запрос на api.giphy.com
        // fetch возвращает объект Promise
        const promise = fetch(`https://api.giphy.com/v1/gifs/search?api_key=Au06Wg62AqjwnHVBRMMXaz7ReCSTr8Gp&q=${queryStr}&limit=5&offset=0`);
        // Преобразуем ответ в объект при помощи метода .json()
        // Т.к. fetch() возвращает промис, который резолвится в объект типа Response, то 
        // для доступа к необходимым нам данным (статусы, код ответа, тело ответа и др)
        // нам необходимо пользоваться свойствами и методами объекта Response
        // например метод .json() распарсит тело (Response.body) как JSON
        // Response.body это объект типа Body у которого доступен в числе прочих метод .json()
        promise.then(response => response.json())
            .then(json => {
                // в данном случае свойство data содержит массив
                json.data.forEach(img => {
                    createImg(img.images.downsized_large.url);
                });
            })
            .catch(err => console.error(err));
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

    // Пример запроса
    // fetch('https://api.giphy.com/v1/gifs/random?api_key=Au06Wg62AqjwnHVBRMMXaz7ReCSTr8Gp&tag=')
    //     .then(res => res.json())
    //     .then(json => {
    //         createImg(json.data.image_original_url);
    //     })
    //     .catch(err => console.error(err));

    // При создании промис находится в ожидании (pending), 
    // а затем может стать исполненным  (fulfilled), 
    // вернув полученный результат (значение), 
    // или отклоненным (rejected), вернув причину отказа. 
    // В любом из этих случаев вызывается обработчик, прикрепленный к промису методом then.


    // Вот пример создания промиса через конструктор
    // при создании промиса через конструктор необходимо передать ему функцию,
    // которая будет резолвить промис в случае успеха или реджектить при неудаче

    function delay(time) {
        return new Promise((resolve, reject) => {
            // Обработаем reject
            // в случае неудачи должен быть вызван колбек reject
            if (isNaN(time)) return reject(new Error('time  must be a number!'));

            // в случае успеха должен быть вызван колбек resolve
            setTimeout(resolve, time);
        });
    }

    // Т.к. конструктор промиса возвращает промис, то мы можем использовать методы then() и catch()
    function check(time) {
        delay(time)
            .then(() => console.log('Promise resolved')) // then() возвращает новый промис и резолвит его
            // с тем что он возвращает. Т.е. если then() ни чего не вернет, то в следующий промис НИ ЧЕГО
            // не предастся
            .then(p => console.log('p', p)) // В консоли будет сообщение: 'p undefined'
            .catch(err => console.error(err))
    }

    // Проверим работу. Запустим check  и передадим число 1000
    // результатом будет сообщение в консоли 'Promise resolved'
    check(1000); // 'Promise resolved'

    // А теперь передадим строку
    check('string'); // Error: time  must be a number!

});