
const clientsContainer = document.querySelector('.clients-container');
const showOpinionsBtn = document.querySelector('.show-opinions-btn');
const ratings =[];
const createHighRatings = index =>{
    for(let i =80; i<=100; i++ ){
        ratings.push(i);
    }
    return ratings[index];
}

let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

const opinionTitles =['Świetna lokalizacja', 'Eleganckie wnętrza', 'Profesjonalna obsługa', 'Doskonała restauracja', 'Przestronny basen', 'Masa udogodnień', 'Wyciszone pomieszczenia', 'Godny polecenia', 'Dobry wybór', 'Na pewno jeszcze tu wrócę', 'Pomocny personel', 'Udany urlop'];


window.addEventListener('DOMContentLoaded', () =>{
 
    getClient(`https://randomuser.me/api/?results=12`).then(data => {
        createClientHTML(data);
        console.log('resolved', data.results); 
    
    }).catch(err => console.log('rejected', err));

})

showOpinionsBtn.addEventListener('click', e => {
    e.stopPropagation();
    e.target.classList.toggle('visible');

    const clients = document.querySelectorAll('.client');
    clients.forEach(client => {
        if(client.style.display = "none"){
            client.style.display = "initial";
        }
    })

    if(e.target.classList.contains('visible')){
        e.target.textContent = "Zwiń";
    } else{
        e.target.textContent = "Zobacz więcej opinii";
        const clientsToBeHidden = Array.from(clients).filter((client, index) => index > 3);
        clientsToBeHidden.forEach(client => client.style.display ="none");
    }
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
        <div id= "client-${index+1}" class="client col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <img class="client-img" src="${result.picture.large}" alt="client${index+1}" />
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
    });

    addClientRating();
    addClientOpinionTitle();
    hideExtraClients();
   
}

function hideExtraClients(){
    const clients = document.querySelectorAll('.client');
    const allClients = Array.from(clients);
    allClients.slice(4).forEach(client => client.style.display = "none");
    }


 /*    function hideExtraClients(){
        const clients = document.querySelectorAll('.client');
        const allClients = Array.from(clients);
    
            if(width < 768){allClients.slice(3).forEach(client => client.style.display = "none")};
            if(width > 768 && width < 992){
                allClients.slice(4).forEach(client => client.style.display = "none")}
            if(width > 992 && width < 1200){
                allClients.slice(3).forEach(client => client.style.display = "none")
            }else{
                allClients.slice(4).forEach(client => client.style.display = "none");
        } 
        } */


/* const clients = document.querySelectorAll('.client');
clients.forEach(client => {
    const regex = /\d+/;
    const clientNumber = Number(client.id.match(regex));
    if(width > 1200 && clientNumber > 4){
        client.style.display = "none";
    }else if(width > 992 && clientNumber > 3){
        client.style.display = "none";
    }else{
        client.style.display = "initial";
    }


}) */



function addClientRating(){
    const clientRating = document.querySelectorAll('.client-rating');
    clientRating.forEach(rating => {
        let randomNumber = Math.floor(Math.random() * ratings.length);
        rating.innerText=`Ocena: ${createHighRatings(randomNumber)}/100`;
        if(createHighRatings(randomNumber) >= 95){
            rating.style.color = "green";
            rating.style.fontWeight = "700";
        }else{
            rating.style.color = "initial";
            rating.style.fontWeight = "initial";
        };
})}

function addClientOpinionTitle(){
    const clientOpinion = document.querySelectorAll('.opinion');
    clientOpinion.forEach(opinion => opinion.innerHTML=`"${opinionTitles.pop()}"`);
}


/* window.addEventListener('resize', ()=>{

    const clients = document.querySelectorAll('.client');
    
    if(width > 992 && width < 1200 || width < 768){
        clients.forEach(client => {

            const clientNumber = Number(client.id.charAt(7));
            if(clientNumber % 4 === 0 || clientNumber > 3){
                client.style.display= "none";}})
    }else{ clients.forEach(client => client.style.display= "initial");
}
}); */


