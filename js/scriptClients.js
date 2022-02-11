
const clientsContainer = document.querySelector('.clients-container');
const ratings =[];
const createHighRatings = index =>{
    for(let i =80; i<=100; i++ ){
        ratings.push(i);
    }
    return ratings[index];
}


const opinionTitles =['Świetna lokalizacja', 'Eleganckie wnętrza', 'Profesjonalna obsługa', 'Doskonała restauracja', 'Przestronny basen', 'Masa udogodnień', 'Wyciszone pomieszczenia', 'Godny polecenia'];


window.addEventListener('DOMContentLoaded', () =>{
 
    getClient(`https://randomuser.me/api/?results=4`).then(data => {
        createClientHTML(data);
        console.log('resolved', data.results[0]); 
    
    }).catch(err => console.log('rejected', err));

})


async function getClient(source){
    const response = await fetch(source);
    if(response.status >= 400){
        throw new Error('could not fetch the data');
    }
    const data = await response.json();
    return data;
}


function createClientHTML(data){
    data.results.forEach((result, index) => {
        clientsContainer.innerHTML +=`
        <div id= "client-${index}" class="client col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <img class="client-img" src="${result.picture.large}" alt="client${index}" />
                <blockquote class="blockquote text-center">
                  <h4 class="opinion"></h4>
                </blockquote>
                <blockquote class="blockquote text-center">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Facilis animi ea totam quam, itaque, consequuntur laboriosam
                    laborum consectetur nam aliquid quisquam! Libero sint fugit
                    sapiente animi asperiores assumenda nulla rem!
                  </p>
                </blockquote>
                <blockquote class="blockquote text-center">
                  <p class="client-rating">Ocena: 5/5</p>
                </blockquote>
                <hr class="jumbo-line" />
                <footer class="blockquote-footer">
                  <cite class="clientName">${result.name.title} ${result.name.first} ${result.name.last}, ${result.location.country}</cite>
                </footer>
              </div>
              `
    })

   addClientRating();
   addClientOpinionTitle()
}

function addClientRating(){
    const clientRating = document.querySelectorAll('.client-rating');
    clientRating.forEach(rating => {
        let randomNumber = Math.floor(Math.random() * ratings.length);
        rating.innerText=`Ocena: ${createHighRatings(randomNumber)}/100`;
        if(createHighRatings(randomNumber) >= 95){
            rating.style.color = "green";
            rating.style.fontWeight = "700";
        };
})}

function addClientOpinionTitle(){
    const clientOpinion = document.querySelectorAll('.opinion');
    clientOpinion.forEach(opinion => opinion.innerHTML=`"${opinionTitles[Math.floor(Math.random()*opinionTitles.length)]}"`);
}


window.addEventListener('resize', ()=>{

    const clients = document.querySelectorAll('.client');
    
    if(window.innerWidth > 992 && window.innerWidth < 1200 || window.innerWidth < 768 ){
        clients.forEach(client => {
            if(client.id === "client-3"){
                client.style.display= "none";
        }
    })
}else{ clients.forEach(client => client.style.display= "initial");
}});


