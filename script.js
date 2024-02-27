async function getOnlineDate() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        const data = await response.json();
        return data.datetime;
    } catch (error) {
        console.error('Erro ao obter data e hora online:', error);
        return null;
    }
}

async function preencherDataHora() {
    const dataHora = await getOnlineDate();
    if (dataHora) {
        const dataFormatada = new Date(dataHora);
        const dataNumerica = `${dataFormatada.getDate()}/${dataFormatada.getMonth() + 1}/${dataFormatada.getFullYear()} ${dataFormatada.getHours()}:${dataFormatada.getMinutes()}:${dataFormatada.getSeconds()}`;
        const dataPorExtenso = `${diaSemana[dataFormatada.getDay()]}, ${dataFormatada.getDate()} de ${mesAno[dataFormatada.getMonth()]} de ${dataFormatada.getFullYear()} às ${dataFormatada.getHours()}:${dataFormatada.getMinutes()}:${dataFormatada.getSeconds()}`;
        document.getElementById('dataHoraNumerica').textContent = dataNumerica; // Mostra a data numérica
        document.getElementById('dataHoraExtenso').textContent = dataPorExtenso; // Mostra a data por extenso
    } else {
        document.getElementById('dataHoraNumerica').textContent = 'Erro ao obter data e hora';
        document.getElementById('dataHoraExtenso').textContent = 'Erro ao obter data e hora';
    }
}

const diaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const mesAno = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

function atualizarDataHora() {
    setInterval(async () => {
        await preencherDataHora();
    }, 1000); // Atualiza a cada segundo
}

document.addEventListener('DOMContentLoaded', () => {
    preencherDataHora();
    atualizarDataHora();
});

function enviarBatidaPonto() {
    let nome = document.getElementById('nome').value;
    let dataHoraAtual = document.getElementById('dataHora').value;
    let corpoEmail = `Olá,\n\nO funcionário ${nome} bateu o ponto em: ${dataHoraAtual}`;
    console.log('Enviando batida de ponto:', corpoEmail);
    // Aqui você chamaria uma função no seu servidor back-end para enviar o e-mail
}


Email.send({
    Host : "smtp.elasticemail.com",
    Username : "pontogrupotelemed@gmail.com",
    Password : "D2368604ECCAC83643DFFCFDEC26FBE98406",
    To : 'pontogrupotelemed@gmail.com',
    From : "pontogrupotelemed@gmail.com",
    Subject : "This is the subject",
    Body : "And this is the body"
}).then(
  message => alert(message)
);