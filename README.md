# TikTok-TTS
Text to audio with Tik-Tok Voices

Esta aplicación utiliza la API TikTok Text-to-Speech para generar archivos de audio a partir de texto. El código está escrito en JavaScript y utiliza la librería Fetch para realizar peticiones a la API.

Configuración
Antes de usar la aplicación, debes configurar la URL del endpoint de la API en la constante ENDPOINT. También puedes ajustar la longitud máxima del texto que se puede enviar a la API modificando la constante MAX_TEXT_LENGTH.

Uso
Para generar un archivo de audio a partir de texto, sigue estos pasos:

Escribe el texto en el campo de texto de la aplicación.
Selecciona la voz que deseas utilizar.
Haz clic en el botón "Generar audio".
Espera a que se generen los archivos de audio. Esto puede tardar algunos segundos.
Una vez generados los archivos de audio, se descargará automáticamente un archivo MP3 con el audio completo.
También se reproducirá el audio generado en el elemento de audio de la página.
Ten en cuenta que el texto se dividirá en partes de no más de 200 caracteres para enviarlo a la API. Si el texto es muy largo, puede tardar más tiempo en generarse el audio completo.

Créditos
Esta aplicación fue creada por Franco Barberis. Utiliza la API TikTok Text-to-Speech, desarrollada por TikTok.
