
$(document).ready(function() {
    $('.nav__form__btn').click(function(){
        let digimonBuscado = $('.nav__form__input').val();   
        digimonBuscadoAPI(digimonBuscado);
        $('.container__buscado').show();
        $('.container__lista').hide();
    })
    $('#lista-digimons').on('click', '.container__lista__card', function() {
        const imgScr = $(this).find('img').attr('src');  
        const nombreDigi = $(this).find('#nombre-digimon-lista').text();
        const lvlDigi = $(this).find('#lvl-digimon-lista').text();
        $('#popup__card__img').attr('src',imgScr);
        $('#popup__card__name').text(nombreDigi);
        $('#popup__card__level').text(lvlDigi);
        $('.popup').show();
    })
    $('#lista-digimons').on('mouseenter', '.container__lista__card', function() {
        $(this).css('width', '16rem');
        $(this).css('margin', '3px');
        
    })  
    $('#lista-digimons').on('mouseout', '.container__lista__card', function() {
        $(this).css('width', '14rem')
        $(this).css('margin', '20px')
    })
    $('.popup__close').click(function(){
        $('.popup').hide();
    })
})

const digimonBuscadoAPI = (digimonBuscado) => {
    fetch('https://digimon-api.vercel.app/api/digimon/name/' + digimonBuscado)
    .then(respuesta => respuesta.json())
    .then(data => insertDataDigi(data) )
}
const insertDataDigi = (data) => {
    const {name, img, level} = data[0];
    document.getElementById('card__buscado__name').innerHTML = name;
    document.getElementById('card__buscado__img').setAttribute('src',img);
    document.getElementById('card__buscado__level').innerHTML = level;
}
const getData = () => {
    fetch('https://digimon-api.vercel.app/api/digimon')
    .then(resp => resp.json())
    .then(data => insertData(data))
}
const insertData = (data) => {
    const contenedor = document.getElementById('lista-digimons');
    for (let digimon of data) {
        contenedor.innerHTML += `<div class="container__lista__card card" id="card-digimon" style="width: 14rem;">
        <img src="${digimon.img}" class="lista__card__img card-img-top" id="img-digimon-lista" alt="imagen de ${digimon.name}">
            <ul class="list-group list-group-flush">
                <li class="lista__card__name list-group-item" ><strong>Nombre: </strong><span id="nombre-digimon-lista">${digimon.name}</span></li>
                <li class="lista__card__level list-group-item"><strong>Nivel: </strong><span  id="lvl-digimon-lista">${digimon.level}</span></li>
            </ul>
        </div>`
    }  
}
getData();



