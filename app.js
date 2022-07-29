/*------------------Validação e Cálculo das Medidas-----------*/
const medidas = (e) => {
    e.preventDefault();
    const valor = document.getElementById('valor');
    const centimetros = document.getElementById('centimetros');
    const metros = document.getElementById('metros');
    const kilometros = document.getElementById('kilometros');
    const tipo = document.getElementById('tipo');
    if (!Number(valor.value) && valor.value !== '') {
        alert('Digite apenas numeros');
        valor.focus();
        return;
    } else if (valor.value.length == 0) {
        valor.focus();
        return;
    } else if (tipo.value == '') {
        tipo.focus();
        return;
    }
    if (tipo.value === 'cm') {
        centimetros.value = valor.value;
        metros.value = valor.value / 100;
        kilometros.value = valor.value / 100000;
    } else if (tipo.value === 'm') {
        centimetros.value = valor.value * 1000;
        metros.value = valor.value;
        kilometros.value = valor.value / 1000;
    } else if (tipo.value === 'km') {
        centimetros.value = valor.value * 100000;
        metros.value = valor.value * 1000;
        kilometros.value = valor.value;
    }
};

/*----------------Validação e calculo IMC--------------------*/
const imc = (e) => {
    e.preventDefault();
    const peso = document.getElementById('peso');
    const altura = document.getElementById('altura');
    const linhas = document.getElementsByTagName('table')[0].children[0];
    const result = document.getElementById('result-imc');

    Array.from(linhas.children).forEach(n => n.classList.remove('select'));
    if (peso.value.length == 0) {
        peso.focus();
        return;
        //.split e join troca a virgula por . se não tiver virgula ele ignora
    } else if (!Number(peso.value.split(',').join('.'))) {
        alert('Apenas numeros!');
        peso.focus();
        return;
    }
    if (altura.value.length == 0) {
        altura.focus();
        return;
    } else if (!Number(altura.value.split(',').join('.'))) {
        alert('Apenas numeros!');
        altura.focus();
        return;
    } else if (altura.value.split(',').join('.') >= 3) {
        alert('Altura inválida');
        altura.focus();
        return;
    }

    let calcimc = peso.value.split(',').join('.') / (altura.value.split(',').join('.') ** 2);
    if (calcimc < 17) {
        linhas.children[1].classList.add('select');
    } else if (calcimc < 18.49) {
        linhas.children[2].classList.add('select');
    } else if (calcimc < 24.99) {
        linhas.children[3].classList.add('select');
    } else if (calcimc < 29.99) {
        linhas.children[4].classList.add('select');
    } else if (calcimc < 34.99) {
        linhas.children[5].classList.add('select');
    } else if (calcimc < 40) {
        linhas.children[6].classList.add('select');
    } else {
        linhas.children[7].classList.add('select');
    }
    result.value = calcimc.toFixed(2);
};

/*--------------Limpa os campos de IMC------------------*/
const clearimc = () => {
    const peso = document.getElementById('peso');
    const altura = document.getElementById('altura');
    const result = document.getElementById('result-imc');
    const linhas = document.getElementsByTagName('table')[0].children[0];
    altura.value = "";
    peso.value = "";
    result.value = "";
    Array.from(linhas.children).forEach(n => n.classList.remove('select'));
}

/*----------Validação e calculo de MDC----------------------*/
const mdc = (e) => {
    e.preventDefault();
    const n1 = document.getElementById('n1');
    const n2 = document.getElementById('n2');
    const mdcresult = document.getElementById('result-mdc');

    if (n1.value.length == 0) {
        n1.focus();
        return;
    } else if (n2.value.length == 0) {
        n2.focus();
        return;
    }
    let a = n1.value
    let b = n2.value;
    let resto;

    do {
        resto = a % b;
        a = b;
        b = resto;

    } while (resto !== 0);
    if (mdcresult.children[0] == null) {
        mdcresult.insertAdjacentHTML('beforeend', `<p>MDC(${n1.value},${n2.value}) = <span class="result">${a}</span></p>`);
    } else {
        mdcresult.children[0].remove();
        mdcresult.insertAdjacentHTML('beforeend', `<p>MDC(${n1.value},${n2.value}) = <span class="result">${a}</span></p>`);
    }
};

/*-------------------------Limpa os campos de MDC------------------------*/
const clearmdc = () => {
    const n1 = document.getElementById('n1');
    const n2 = document.getElementById('n2');
    const mdcresult = document.getElementById('result-mdc');

    if (mdcresult.children[0] == null) {
        n2.value = "";
        n1.value = "";
    } else {
        n2.value = "";
        n1.value = "";
        mdcresult.children[0].remove();
    }
};

/*---------------------------Trocar Imagens----------------------------*/
const trocaimagem = (e) => {
    e.preventDefault();
    const imagem = document.getElementById("imagem");
    const imagens = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYL2LBeTkGRjfnlgmGUOPbef4DrULgdcSya5jHZchsuMqqJZuLuEPjvXLhqNWbMzW0Vi4&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYFcJ-Gcf_hq1aZcFZgRAPkIRHTl2nQ7Og0vPrRRSNdebkVos6DVTxa5Ci35qwpImuuaM&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqP53FFlvEMJuleJkBbt1Vx2cDXJPdM6_gHmMFg2xe8ICqWKXqECoL8FypVuAf6iM41tw&usqp=CAU",
    ];

    let img_src = imagem.src;
    let img_idx = imagens.indexOf(img_src);
    imagem.src = imagens[img_idx == imagens.length - 1 ? 0 : img_idx + 1];

};

/*---------------------Inicia as funções a partir dos botões dos formulários-----------------------*/
const iniciar = () => {
    const form = document.forms;
    const limpar = document.getElementsByClassName('limpar');

    limpar[0].addEventListener('click', clearimc);
    limpar[1].addEventListener('click', clearmdc);

    form[0].addEventListener('submit', medidas);
    form[1].addEventListener('submit', imc);
    form[2].addEventListener('submit', mdc);
    form[3].addEventListener('submit', trocaimagem);
}
document.addEventListener('DOMContentLoaded', iniciar);


/*-----------Estados e Cidades| Chamados diretos do elemeto html---------*/
const estadocidades = () => {
    const estados = document.getElementById('estados');
    const cidades = document.getElementById('cidades');
    const text = document.getElementById('texto');

    if (estados.value == '') {
        Array.from(cidades.children).forEach(n => n.remove());
        cidades.innerHTML = '<option id="selecionado" value="">--Selecione a Cidade--</option>';
        cidades.setAttribute('disabled', '');
        if(text.children.length !== 0){
        Array.from(text.children).forEach(e => e.remove());
        }
    }
    if (estados.value === 'pr') {
        let valores = [1, 2, 3].reverse();
        let nomes = ['Curitiba', 'Cascavel', 'Maringá'].reverse();
        addcidades(valores, nomes);

    }
    if (estados.value === 'sc') {
        let valores = [4, 5, 6].reverse();
        let nomes = ['Florianópolis', 'Blumenal', 'Lages'].reverse();
        addcidades(valores, nomes);
    }

    if (estados.value === 'rs') {
        let valores = [7, 8, 9].reverse();
        let nomes = ['Porto Alegre', 'Gramado', 'Caxias do Sul'].reverse();
        addcidades(valores, nomes);
    }
};

/*----Exibe as cidades ----*/
const exibecidade = () => {
    const text = document.getElementById('texto');
    const select = document.querySelectorAll('select')[2];

    if (cidades.value !== '') {
        if (text.children.length !== 0) {
            Array.from(text.children).forEach(e => e.remove());
        }
        text.insertAdjacentHTML('afterbegin', `<p id="nome_cidade">${select.children[select.selectedIndex].textContent}</p>`);
    } else {
        Array.from(text.children).forEach(e => e.remove());
    }
};

/*----Adiciona as Cidades----*/
const addcidades = (value = [], name = []) => {
    const text = document.getElementById('texto');
    cidades.removeAttribute('disabled');
    if(text.children.length !== 0){
        Array.from(text.children).forEach(e => e.remove());
        }
    if (cidades.children[1] !== '') {
        Array.from(cidades.children).forEach(n => n.remove());
        cidades.innerHTML = '<option id="selecionado" value="">--Selecione a Cidade--</option>';

    }
    const opcao = document.getElementById('selecionado');
    opcao.insertAdjacentHTML('afterend', `<option value="${value[0]}">${name[0]}</option>`);
    opcao.insertAdjacentHTML('afterend', `<option value="${value[1]}">${name[1]}</option>`);
    opcao.insertAdjacentHTML('afterend', `<option value="${value[2]}">${name[2]}</option>`);


}