/* 
    Separar url de fetch organizando mucho mejor el codigo
*/
const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCPbcKdS4iAF4fC0F48Maamg&part=snippet%2Cid&order=date&maxResults=15";

/* 
    nodo contenedor de template para insertar datos del video, la igualamos a null o a docuemnt.getById 
*/
const content = null || document.getElementById('content');

/* 
    Opciones qeu nos entrega para organizar nuestro codigo, en ste caso get le podemos pasar las opciones
*/
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "436ca8acefmsh44b00ccd50dddf6p153e29jsn72502bf4d281",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

/* 
    Usamos promesar para traer contedido api y podemos uslar las palabras reservadas.
    creamos la funcion para usar async-await

    creamos la constante repsonse y le hacemos fect a la url y a las options que nos entrego la api, la key debe de ser privada y no compartida con nadie.

    transformamos los datos en Json

    y por ultimo retornamos dat.
 */

async function fectData(urlApi) {
  const response = await fetch(urlApi, options);

  const data = await response.json();

  return data;
}

/* 
    Crearemos una funcion qeu se invoca asi misma, sera una funcion anonima
    
    meteriamos la funicon anonima entre parentesis y vcreariamodentro una funcion anonima, posterior emnte podemos parentesis para qeu qeude lista la sentencia qeu se va a llamar asi misma.

    dentro y de acuerdo a lo qeu hemos aprendido usaremos nuestro try y nuestro cath.

    en el try crearemos un contante de videos con await y le pondremos la funcion de llamado.

    ahora lo que crearemos es un template html, va a ser html que vamos a adaptar para que itere por cada uno de los elementos de la repuesta, para eso creamos una variables de template para poder usar funciones o js o otros metodos importantes

    dentro podemos usar js para iterar sobre los elementos de respuesta de videos. de la peticion.

    dentro del tempate accedos a la variable video.items y le agregamos un .MAP para regresar un nuevo arreglo con la transformacion qeu le estoy aplicacondo, osea un template para cada video. que nos retornara video y usamos las comillas para volver ha hacer la logica del template html

    posteriosr mente hacemos los llamados a los datos, desd e la imagen y demas infor qeu entrag la api, con eso terminamosla estructura

    por utimo podesmo desear mostrar solo 4 elementos de los 9, con el uso de slice par aindicarle y join con un valor vacio para hacer uso de esto.
*/

( async () => {
  try {
    const videos = await fectData(API);

    let view = `

        ${videos.items.map( video => `
            <div class="group relative">

                <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">

                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    
                </div>

                <div class="mt-4 flex justify-between">

                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>

                </div>

            </div>
        `).slice(0,12).join('')}
    `;

    /* 
        Hacemos la insercion a content en html
    */
    content.innerHTML = view;

  } catch (error) {
    console.error(error);
  }
})();
