const capturar = document.getElementById("capturar")



function exit() {
    window.actions.exit()
}
function minimize() {
    window.actions.minimize()
}
function maximize() {
    window.actions.maximize()
}

async function openPhoto() {
    var teste = await window.actions.openPhoto();
    console.log(teste)
    var foto = document.getElementById('foto')
    foto.src = teste
}

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('webcam');

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
            })
            .catch((error) => {
                console.error('Erro ao acessar a webcam:', error);
            });
    } else {
        console.error('getUserMedia não é suportado neste navegador');
    }
});

capturar.addEventListener('click', () => {
    const video = document.getElementById('webcam');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = 'foto.png'
    link.click()
    //windowImage(link.href)
})


