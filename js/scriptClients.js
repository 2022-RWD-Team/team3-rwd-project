
const clientsContainer = document.querySelector('.clients-container');
const showOpinionsBtn = document.querySelector('.show-opinions-btn');
const ratings =[];

function createHighRatings(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
} 
  
const opinionTitles =['Świetna lokalizacja', 'Eleganckie wnętrza', 'Profesjonalna obsługa', 'Doskonała restauracja', 'Przestronny basen', 'Masa udogodnień', 'Wyciszone pomieszczenia', 'Godny polecenia', 'Dobry wybór', 'Na pewno jeszcze tu wrócę', 'Pomocny personel', 'Udany urlop'];


window.addEventListener('DOMContentLoaded', e =>{
    e.stopPropagation();
    getClient(`https://randomuser.me/api/?results=12`).then(data => {
        createClientHTML(data);
        console.log('resolved', data.results); 
    
    }).catch(err => console.log('rejected', err));

})

showOpinionsBtn.addEventListener('click', e => {
    e.stopPropagation();

    const clients = document.querySelectorAll('.client');
    const allClients = Array.from(clients);

    if(!e.target.classList.contains('visible-row2') && !e.target.classList.contains('visible-row3')){
        e.target.classList.add('visible-row2');
        allClients.slice(4,8).forEach(client => client.style.display ="initial");
        allClients.slice(8).forEach(client => client.style.display ="none");    
    } else if(e.target.classList.contains('visible-row2')){
        e.target.classList.remove('visible-row2');
        e.target.classList.add('visible-row3');
        allClients.slice(7).forEach(client => client.style.display ="initial");  
    } else {
        e.target.classList.remove('visible-row3');
        allClients.slice(4).forEach(client => client.style.display ="none"); 
    }


    if(e.target.classList.contains('visible-row3')){
        e.target.textContent = "Zwiń";
    } else{
        e.target.textContent = "Zobacz więcej opinii";
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

function addClientRating(){
    const clientRating = document.querySelectorAll('.client-rating');
    clientRating.forEach(rating => {
        const randomRating = createHighRatings(80,100);
        rating.innerText=`Ocena: ${randomRating}/100`;
        if(randomRating >= 95){
            rating.style.color = "green";
            rating.style.fontWeight = "700";
        }else{
            rating.style.color = "initial";
            rating.style.fontWeight = "initial";
        };
})}

function addClientOpinionTitle(){
    const clientOpinion = document.querySelectorAll('.opinion');
    clientOpinion.forEach(opinion => opinion.innerHTML=`"${outputRandomClientOpinionTitle(opinionTitles)}"`);
}

function outputRandomClientOpinionTitle(array){
        const random = Math.floor(Math.random()*array.length);
        return array.splice(random, 1);
}