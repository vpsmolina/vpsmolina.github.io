let url = 'https://randomuser.me/api/?results=15';
fetch(url)
    .then((response) => response.json())
    .then(function (data) {
        data.results.forEach(element => {
            let person = document.createElement('div');
            person.className = 'content-item';
            document.getElementById("person").append(person);

            let pic = document.createElement('img');
            pic.className = 'content-item_pic';
            pic.src = element.picture.thumbnail;
            person.append(pic);

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
    });

