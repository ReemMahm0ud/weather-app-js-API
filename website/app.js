/* Global Variables */

// Personal API Key for OpenWeatherMap API
const APIKEY = '552b08861a4d2e33389dcfbe1fababfb';
//const url = `api.openweathermap.org/data/2.5/weather?`;

//HTML DOM element
const btn = document.querySelector('#generate');
const dateValue = document.getElementById('date');
const tempValue = document.getElementById('temp');
const contentValue = document.getElementById('content');
//console.log(dateValue.innerText);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function to GET Web API Data*/
const getData = async function (zipCode){
    const request = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&APPID=${APIKEY}&units=metric`);
    try {
        const data = await request.json();
        return data;
    } catch (error) {
        console.log(error);
    }

};

/* Function to POST data */
const postData = async function (url='',data={}){
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(data),
        });
    
    try {
        const data = await request.json();
        return data;
            
    } catch (error) {
          console.log(error);  
    }

}

/*function to update UI */
const updateUI = async function (){
    const request = await fetch('http://localhost:5500/all');
    try {
        const newdData = await request.json();
        console.log(newdData);
        dateValue.innerHTML=`date is:  ${newdData.date}`;
        tempValue.innerHTML =`temprature is :  ${newdData.temp}`;
        contentValue.innerHTML =`your feelings: ${newdData.userResponse}`;
        console.log('done');
    } catch (error) {
        console.log(error);
    }

} 

/* Function called by event listener */
const handleGenerateBtnClick = function(e){
    e.preventDefault();
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    if(!zipCode){
        alert('Please, enter a zip code');
    }
    else{
        //call 3 functions
        getData(zipCode).then(function (data){
            postData('http://localhost:5500/addData',{
                temp:data.main.temp,
                date:newDate,
                feelings:feelings,
            })
        })
            .then(function(){
                updateUI()
            })

    }
};
// Event listener to add function to existing HTML DOM element
btn.addEventListener('click', handleGenerateBtnClick);
