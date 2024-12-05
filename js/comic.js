var maxComic
var currentComic

window.onload = function(){
    //hämta senast comic
    getComic("latest");
    //sätter funktionalitet för nav knappar

}

function getComic(which){
    //fetch data från xkcd api
    fetch('https://xkcd.vercel.app?comic='+which)
        .then(function(response){
            //kolla om svaret är ok
            if(response.status === 200){
                return response.json();
            } else {
                //kastar ett felmeddelande om status inte är ok
                throw new Error('Failed to load comic');
            }
        })
        .then(function(data){
            //Uppdatera maxComic värde
            if(maxComic < data.num){
                maxComic=data.num;
            }
            //Skicka json data för behandling till DOM
            console.log(data);
            appendComic(data);
        })
        .catch(function(error){
            console.log('Error: ', error);
        })
}

function appendComic(data){}