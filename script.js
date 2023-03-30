const ENDPOINT = 'https://tiktok-tts.weilnet.workers.dev';
const MAX_TEXT_LENGTH = 300;
let audio_data_parts = [];

function getApiStatus() {
  const url = `${ENDPOINT}/api/status`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error));
}

function generateAudio(text, voice) {
  const url = `${ENDPOINT}/api/generation`;
  const data = { text: text, voice: voice };
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => data.data)
    .catch(error => console.error(error));
}

function generarAudio() {
  const texto = document.getElementById("texto").value;
  const voiceSelect = document.getElementById("voice-select");
  const voice = voiceSelect.options[voiceSelect.selectedIndex].value;

 // Dividir el texto en partes de no más de 200 caracteres
let docx_content = texto;
let text_parts = [];
while (docx_content.length > MAX_TEXT_LENGTH) {
  let idx = MAX_TEXT_LENGTH;
  let separator = idx;
  // Buscar un punto o una coma cerca del límite de 200 caracteres
  while (idx > 0 && idx > MAX_TEXT_LENGTH - 100) {
    if (docx_content[idx] === '.') {
      separator = idx + 1;
      break;
    } else if (docx_content[idx] === ',') {
      separator = idx + 1;
      break;
    }
    idx--;
  }
  // Si no se encontró un punto o una coma, dividir en el límite de 200 caracteres
  text_parts.push(docx_content.substring(0, separator));
  docx_content = docx_content.substring(separator).trim();
}
text_parts.push(docx_content);


  // Generar el audio para cada parte y concatenar los resultados
  Promise.all(text_parts.map(part => generateAudio(part, voice)))
    .then(audio_data => {
      audio_data_parts = audio_data.filter(data => data !== null);
      if (audio_data_parts.length === text_parts.length) {
        // Unir los resultados en un solo archivo de audio mp3
        const audio_data = audio_data_parts.join('');
        const audio_bytes = new Uint8Array(atob(audio_data).split("").map(function(c) {
            return c.charCodeAt(0);
        }));
        const filename = "audio";
        const blob = new Blob([audio_bytes], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.mp3`;
        link.click();

        // Cargar el audio en el elemento de audio
        const audio = document.getElementById("audio");
        audio.src = url;
        audio.load();
        
      } else {
        console.error("Error al generar el audio");
      }
    })
    .catch(error => {
      console.error(error);
      console.error("Error al generar el audio");
    });
  

}
function reproducirAudio() {
  const texto = document.getElementById("texto").value;
  const voiceSelect = document.getElementById("voice-select");
  const voice = voiceSelect.options[voiceSelect.selectedIndex].value;

  // Dividir el texto en partes de no más de 200 caracteres
  let docx_content = texto;
  let text_parts = [];
  while (docx_content.length > MAX_TEXT_LENGTH) {
    let idx = MAX_TEXT_LENGTH;
    let separator = idx;
    // Buscar un punto o una coma cerca del límite de 200 caracteres
    while (idx > 0 && idx > MAX_TEXT_LENGTH - 30) {
      if (docx_content[idx] === '.') {
        separator = idx + 1;
        break;
      } else if (docx_content[idx] === ',') {
        separator = idx + 1;
        break;
      }
      idx--;
    }
    // Si no se encontró un punto o una coma, dividir en el límite de 200 caracteres
    text_parts.push(docx_content.substring(0, separator));
    docx_content = docx_content.substring(separator).trim();
  }
  text_parts.push(docx_content);

  // Generar el audio para cada parte y concatenar los resultados
  Promise.all(text_parts.map(part => generateAudio(part, voice)))
    .then(audio_data => {
      audio_data_parts = audio_data.filter(data => data !== null);
      if (audio_data_parts.length === text_parts.length) {
        // Unir los resultados en un solo archivo de audio mp3
        const audio_data = audio_data_parts.join('');
        const audio_bytes = new Uint8Array(atob(audio_data).split("").map(function(c) {
            return c.charCodeAt(0);
        }));
        const blob = new Blob([audio_bytes], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);

        // Cargar el audio en el elemento de audio y reproducirlo
        const audio = document.getElementById("audio");
        audio.src = url;
        audio.load();
        audio.play();
      } else {
        console.error("Error al generar el audio");
      }
    })
    .catch(error => {
      console.error(error);
      console.error("Error al generar el audio");
    });
  
}
