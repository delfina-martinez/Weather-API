const API_KEY = '255ab47c33b843aa763667cb39ec7e59';

let videoClima = document.querySelector('.video');

if (localStorage.getItem('Data')) {
    createContent(JSON.parse(localStorage.getItem('Data')));
}

document.querySelector('form').addEventListener('submit', e => {
        
    e.preventDefault();
    
    let city = e.target.querySelector('input').value;
    console.log(city);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=sp`)
    .then(res => res.json()
)
    .then(res => {
        console.log(res.cod)
        if(res.cod == 200){
            createContent(res);

            weatherVideo(res);

            localStorage.setItem('Data', JSON.stringify(res));
            document.querySelector('#error').style.display = 'none';
        }else{
            document.querySelector('#error').style.display = 'flex';
            document.querySelector('#error').style.justifyContent = 'center';
            console.log('Hubo un ERROR.');
        }
    });
});

function createContent (content) {
    document.querySelector('#cityname').innerHTML = content.name;
    document.querySelector('#now').innerHTML = content.main.temp + " °C";
    document.querySelector('#feel').innerHTML = content.main.feels_like + " °C";
    document.querySelector('#max').innerHTML = content.main.temp_max + " °C";
    document.querySelector('#min').innerHTML = content.main.temp_min + " °C";
    document.querySelector('#speed').innerHTML = content.wind.speed + " km/s";
    document.querySelector('#humidity').innerHTML = content.main.humidity + "%";
    document.querySelector('#pressure').innerHTML = content.main.pressure + " mb";
}

function weatherVideo (data) {
    switch (data.weather[0].main) {
        case 'Thunderstorm':
            videoClima.src = './assets/videos/thunderstorm.mp4';
          break;
        case 'Drizzle':
            videoClima.src = './assets/videos/wind.mp4';
          break;
        case 'Rain':
            videoClima.src = './assets/videos/rain.mp4';
          break;
        case 'Snow':
            videoClima.src = './assets/videos/snow.mp4';
          break;
        case 'Clear':
            videoClima.src = './assets/videos/sun.mp4';
          break; 
        case 'Clouds':
            videoClima.src = './assets/videos/cloudy.mp4';
            break;
        default:
            videoClima.src = './assets/videos/mundo.mp4';
    }
}
