document.addEventListener('DOMContentLoaded', () => {

    getDogs()

    const dogTable = document.getElementById('table-body');
    const dogForm = document.getElementById('dog-form');

    dogTable.addEventListener('click', editDog)
    dogForm.addEventListener('submit', updateDog)

    function getDogs() {
        return fetch("http://localhost:3000/dogs")
        .then(res => res.json())
        .then(data => data.forEach(addDog))
    }

    function addDog (dog) {
        let dogRow = document.createElement('tr');
        let name = document.createElement('td');
        let breed = document.createElement('td');
        let sex = document.createElement('td');
        let btnTd = document.createElement('td')
        let editBtn = document.createElement('button');
        
        name.textContent = dog.name;
        breed.textContent = dog.breed;
        sex.textContent = dog.sex;
        editBtn.className = "editButton"
        editBtn.dataset.id = dog.id;
        editBtn.textContent = "Edit Dog";
            
        btnTd.append(editBtn);
        dogRow.append(name);
        dogRow.append(breed);
        dogRow.append(sex);
        dogRow.append(btnTd);
        dogTable.append(dogRow);
    }
    
    function editDog(e) {  
        if (e.target.className === "editButton") {
            fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`)
            .then(res => res.json())
            .then((data) => {
                dogForm.name.value = data.name;
                dogForm.breed.value = data.breed;
                dogForm.sex.value = data.sex;
                dogForm.dataset.id = data.id;
            })
        }
    }

    function updateDog(e) {
        e.preventDefault()
        let newName = e.target.name.value;
        let newBreed = e.target.breed.value;
        let newSex = e.target.sex.value;
        fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "name": newName,
                "breed": newBreed,
                "sex": newSex
            })
        })
        .then(res => res.json())
        .then(() => {
            dogTable.innerHTML = "";
            fetch("http://localhost:3000/dogs")
            .then(res => res.json())
            .then(getDogs)
        })
    }

}) //DOM Content Loadeed

