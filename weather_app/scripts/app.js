const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    // console.log(data);
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    // destructure properties
    const { cityDetails, weather } = data;

    // update the details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather[0].WeatherText}</div>
    <div class="display-4 my-4">
        <div>
            <span>${weather[0].Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
        <hr>
        <div>
            <span>${weather[0].Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
    </div>
`;

    // update the day/night icon images
    const iconSrc = `img/icons/${weather[0].WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather[0].IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    // object shorthand notation
    return { cityDetails, weather };
};

cityForm.addEventListener('submit', e => {

    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    // reset form after submitting
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}

// const result = true ? 'value 1' : 'value 2';
// console.log(result);
