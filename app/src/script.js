let url = 'https://randomuser.me/api/?results=15';
let result;

fetch(url)
    .then((response) => response.json())
    .then(function (data) {
        result = data.results;
        render(result);
    });

document.addEventListener('keyup',  function search() {
    let search = document.getElementById('search');
    document.getElementById('person').innerHTML = '';
    /*render(filter(search.value, result));*/
    debounce(render(filter(search.value, result)), 10000)
});
let timer;

function debounce(fn, interval) {
    return () => {
        clearTimeout(timer);
        let args = arguments;
        timer = setTimeout(() => {
            fn(args);
        }, interval);
    };
}


function filter(element, data) {
    console.log(element);
    let query = data.filter(el => el.name.first.toUpperCase().includes(element.toUpperCase()));
    if (query.length == 0) {
        let person = document.createElement('div');
        person.innerHTML = "Пользователь с данным именем не найден.";
        document.getElementById('person').append(person);
    }
    return query
}

function render(data) {
    data.forEach(element => {
        let person = document.createElement('div');
        person.className = 'content-item';
        document.getElementById('person').append(person);

        let pic = document.createElement('img');
        pic.className = 'content-item_pic';
        pic.src = element.picture.thumbnail;
        person.append(pic);

        let picBig = document.createElement('img');
        picBig.className = 'content-item_picBig';
        picBig.src = element.picture.large;
        person.append(picBig);

        pic.onmouseover = function(event) {
            picBig.style.opacity = '1';
            picBig.style.visibility = 'visible';
        };

        pic.onmouseout = function(event) {
            picBig.style.opacity = '0';
            picBig.style.visibility = 'hidden';
        };

        let name = document.createElement('span');
        name.className = 'content-item_name';
        name.innerHTML = `${element.name.first} ${element.name.last}`;
        person.append(name);

        let email = document.createElement('div');
        email.innerHTML = `${element.email}`;
        person.append(email);

        let phone = document.createElement('div');
        phone.innerHTML = `${element.phone}`;
        person.append(phone);

        let location = document.createElement('div');
        location.innerHTML = `${element.location.city} ${element.location.state} `;
        person.append(location);

        let registered = document.createElement('div');
        let dateString = new Date(element.registered.date);
        registered.innerHTML = `${dateString.getDate()}.${dateString.getMonth()}.${dateString.getFullYear()}`;
        person.append(registered);
    })
}

let myVar;

function myFunction() {
    myVar = setTimeout(showPage, 1000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "block";
}
