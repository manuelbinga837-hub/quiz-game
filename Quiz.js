let valor=document.getElementById("valor");
let origem=document.getElementById("origem");
let destino=document.getElementById("destino");
let btn=document.getElementById("btnConverter");
let resultado=document.getElementById("resultado");

let animacoes = document.getElementById("animacoes");
let temaClaro = document.getElementById("temaClaro");


// CONTROLE DAS ANIMAÇÕES
let animacoesAtivas = true;


// TELAS
let telaTempo = document.getElementById("telaTempo");
let telaSobre = document.getElementById("telaSobre");
let telaConfiguracoes = document.getElementById("telaConfiguracoes");
let telaHistorico = document.getElementById("telaHistorico");


// MENU
let sobreBtn = document.getElementById("sobreBtn");
let tempoBtn = document.getElementById("tempo");
let configBtn = document.getElementById("configBtn");
let historicoBtn = document.querySelector(".opcao:nth-child(5)");

let menuBtn = document.querySelector(".menu-btn");
let menu = document.querySelector(".menu");

const formatarNumero = (numero)=>{

    if(Number.isInteger(numero)){

        return numero;

    }

    return Number(numero).toFixed(4);

}



const animarNumero = (final,guardar,guardar1,guardar2)=>{

    let inicio = 0;

    let velocidade = Math.ceil(final / 60);


    let intervalo = setInterval(()=>{


        inicio += velocidade;


        if(inicio >= final){

            inicio = final;

            clearInterval(intervalo);

        }


        resultado.innerHTML = `

        ✅ Conversão concluída

        <br><br>

        <strong>${guardar} ${guardar1}</strong>

        <br><br>

        ⬇️

        <br><br>

        <strong>${formatarNumero(inicio)} ${guardar2}</strong>

        `;


    },20);


}

function mostrarHistorico(){

    let lista = document.getElementById("listaHistorico");


    let historico = JSON.parse(
        localStorage.getItem("historico")
    ) || [];


    lista.innerHTML = "";


    if(historico.length === 0){

        lista.innerHTML = `
        <p>Nenhuma conversão realizada.</p>
        `;

        return;

    }


    historico.forEach((item)=>{


        lista.innerHTML += `

        <div class="info">

            <h3>🔄 Conversão</h3>

            <p>
            ${item.valor} ${item.origem}
            →
            ${item.resultado} ${item.destino}
            </p>

            <small>
            ${item.data}
            </small>

        </div>

        `;


    });

}


function salvarHistorico(valor, origem, destino, resultado){

    let historico = JSON.parse(
        localStorage.getItem("historico")
    ) || [];


    historico.push({

        valor: valor,

        origem: origem,

        destino: destino,

        resultado: formatarNumero(resultado),

        data: new Date().toLocaleString()

    });


    localStorage.setItem(
        "historico",
        JSON.stringify(historico)
    );

}


const converter=()=>{


    let guardar=Number(valor.value);


    if(valor.value === ""){

        alert("Digite um valor!");

        return;

    }



    let seg;

    let guardar1=origem.value;

    let guardar2=destino.value;



    if(guardar1=="segundos"){

        seg=guardar;

    }else if(guardar1=="minutos"){

        seg=guardar*60;

    }else if(guardar1=="horas"){

        seg=guardar*3600;

    }else if(guardar1=="dias"){

        seg=guardar*86400;

    }else if(guardar1=="semanas"){

        seg=guardar*604800;

    }else if(guardar1=="meses"){

        seg=guardar*2592000;

    }else if(guardar1=="anos"){

        seg=guardar*31536000;

    }



    let final;



    if(guardar2=="segundos"){

        final=seg;

    }else if(guardar2=="minutos"){

        final=seg/60;

    }else if(guardar2=="horas"){

        final=seg/3600;

    }else if(guardar2=="dias"){

        final=seg/86400;

    }else if(guardar2=="semanas"){

        final=seg/604800;

    }else if(guardar2=="meses"){

        final=seg/2592000;

    }else if(guardar2=="anos"){

        final=seg/31536000;

    }



    resultado.classList.remove("mostrar");


    void resultado.offsetWidth;


    resultado.classList.add("mostrar");



    animarNumero(final,guardar,guardar1,guardar2);
    salvarHistorico(
    guardar,
    guardar1,
    guardar2,
    final
);



}






btn.addEventListener("click",()=>{

    converter();

});





// ABRIR E FECHAR MENU

menuBtn.addEventListener("click",()=>{

    menu.classList.toggle("ativo");

});







// IR PARA SOBRE

sobreBtn.addEventListener("click",()=>{


    telaTempo.style.display="none";

    telaConfiguracoes.style.display="none";

    telaHistorico.style.display="none";


    telaSobre.style.display="block";


    menu.classList.remove("ativo");


});





// VOLTAR PARA CONVERSOR

tempoBtn.addEventListener("click",()=>{


    telaSobre.style.display="none";

    telaConfiguracoes.style.display="none";

    telaHistorico.style.display="none";


    telaTempo.style.display="block";


    if(animacoesAtivas){

        telaTempo.classList.add("entrando");


        setTimeout(()=>{

            telaTempo.classList.remove("entrando");

        },400);

    }


    menu.classList.remove("ativo");


});

// IR PARA CONFIGURAÇÕES

configBtn.addEventListener("click",()=>{


    telaTempo.style.display="none";

    telaSobre.style.display="none";

    telaHistorico.style.display="none";


    telaConfiguracoes.style.display="block";


    menu.classList.remove("ativo");


});

// IR PARA HISTÓRICO

historicoBtn.addEventListener("click",()=>{


    telaTempo.style.display="none";

    telaSobre.style.display="none";

    telaConfiguracoes.style.display="none";


    telaHistorico.style.display="block";


    mostrarHistorico();


    menu.classList.remove("ativo");


});



// ===========================
// TEMA CLARO COM LOCAL STORAGE
// ===========================


temaClaro.addEventListener("change",()=>{


    if(temaClaro.checked){


        document.body.classList.add("tema-claro");


        localStorage.setItem("tema","claro");


    }else{


        document.body.classList.remove("tema-claro");


        localStorage.setItem("tema","escuro");


    }


});




// CARREGAR TEMA GUARDADO


let temaGuardado = localStorage.getItem("tema");


if(temaGuardado === "claro"){


    document.body.classList.add("tema-claro");


    temaClaro.checked = true;


}




// ===========================
// ANIMAÇÕES COM LOCAL STORAGE
// ===========================


animacoes.addEventListener("change",()=>{


    if(animacoes.checked){


        animacoesAtivas = true;


        localStorage.setItem("animacoes","ligadas");


    }else{


        animacoesAtivas = false;


        localStorage.setItem("animacoes","desligadas");


    }


});





// CARREGAR PREFERÊNCIA DAS ANIMAÇÕES


let animacoesGuardadas = localStorage.getItem("animacoes");


if(animacoesGuardadas === "desligadas"){


    animacoesAtivas = false;


    animacoes.checked = false;


}else{


    animacoesAtivas = true;


    animacoes.checked = true;


}

// LIMPAR HISTÓRICO

let limparHistorico = document.getElementById("limparHistorico");


limparHistorico.addEventListener("click",()=>{

    localStorage.removeItem("historico");

    mostrarHistorico();

});
