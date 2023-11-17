let carsResponseList = document.getElementById("cars-response-list");
let fileterCarsResponseList = document.getElementById("filtered-cars-response-list");
let cars = [];
let filteredCars = [];

//! fetch არის javascript ის ჩაშენებული ფუნქცია,
//? რომლის მეშვეობითაც შემიძლია მონაცემების წამოღება სერვერიდან
// fetch-ს პარამეტრად უნდა გადავცეთ მისამართი (endpoint-ი)
fetch("https://rentcar.webwide.ge/api/Car/popular", {
        // განვსაზღვროთ მეთოდი, რომელი მეთოდის გამოყენება გვინდა
        // GET, POST, PUT,(Patch), DELETE

        // POST-ნიშნავს მონაცემების დამატება.
        // PUT-ნიშნავს არსებული მონაცემების განახლება.
        // DELETE-ნიშნავს მონაცემების წაშლას.
        // PATCH-ნიშნავს მონაცემების განახლებას.
        // GET-ნიშნავს მონაცემების წამოღებას.
        method: "GET",
    })
    // და მერე უნდა გავუშვათ მეთოდი .then()
    .then((response) => {
        // თუ სტატუსი
        //* თუ სტატუსი არის ok ანუ 20* (ფიფქში იგულისხმება ნებისმიერი ციფრი, 200,201,203)
        //* ეს ნიშნავს რომ ყველაფერი რიგზეა, და მონაცემები მივიღეთ

        //* თუ სტატუსი არის 401
        //* ნიშნავს რომ მომხმარებელმა უნდა გაიაროს ავტორიზაცია.

        //* თუ სტატუსი არის 404
        //* ნიშნავს რომ რესურსი ვერ მოიძებნა.

        //* თუ სტატუსი არის 500 (0)
        //* ნიშნავს სერვერის ერრორს.
        if (response.ok) {
            // გადავიყვანოთ json ფორმატში
            //Javascript object notation
            return response.json();
        } else {
            alert("შეცდომა, რაღაც არ არის რიგზე!!!");
            // throw new Error("შეცდომა")
        }
    })
    .then((data) => {
        // cars = data;
        data.forEach((car) => {
            cars.push(car);
        });

        // html ში გამოტანა
        cars.forEach((car) => {
            carsResponseList.innerHTML += `
              <div class="card" style="width: 18rem;">
              <img src="${car.imageUrl1}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${car.brand}</h5>
                <p class="card-text">${car.model}</p>
                <p class="card-text">${car.price}ლ დღეში</p>
                <a href="#" class="btn btn-primary">${car.year}</a>
                <a href="#" class="btn btn-primary">${car.transmission}</a>
              </div>
            </div>
              `;
        });
    });
console.log("==========================================")


// https://rentcar.webwide.ge/api/Car/filter?city=აქ შეიძლება ეწეროს ნებისმიერ რამე&pageIndex=1&pageSize=10

let searchInput = document.getElementById("search-input"); 
let capacityInput = document.getElementById("capacity-input");
let errorBlock = document.getElementById("error-block");
function Search() {
    let searchQuery = searchInput.value;
    let searchQueryCapacity = capacityInput.value;

    fetch(`https://rentcar.webwide.ge/api/Car/filter?capacity=${searchQueryCapacity}&city=${searchQuery}&pageIndex=1&pageSize=10`, {
        method: "GET",
    })
    .then((response) => {

        if (response.ok) {
            // გადავიყვანოთ json ფორმატში
            //Javascript object notation
            return response.json();
        } else {
            errorBlock.innerHTML = `<h1> რაღაც არ არის რიგზე, მანქანა ვერ ვიპოვეთ</h1>`
        }
    })
    .then((car) => {
        console.log(car);

        // ახალი რეზულტატებისთვის წინა რეზულტატების წაშლა
        fileterCarsResponseList.innerHTML = "";
        filteredCars = [];

        // ახალი რეზულტატების მასივში ჩაწერა
        car.data.forEach((dataCar) =>{
            filteredCars.push(dataCar);
            console.log(dataCar);
        })


        // html ში გამოტანა დავაბრუნოთ მანქანები
        filteredCars.forEach((car) => {
            fileterCarsResponseList.innerHTML += `
              <div class="card" style="width: 18rem;">
              <img src="${car.imageUrl1}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${car.brand}</h5>
                <p class="card-text">${car.model}</p>
                <p class="card-text">${car.price}ლ დღეში</p>
                <a href="#" class="btn btn-primary">${car.year}</a>
                <a href="#" class="btn btn-primary">${car.transmission}</a>
              </div>
            </div>
              `;
        });
    });
}
