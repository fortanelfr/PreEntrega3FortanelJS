/* 
Calculadora de las palabras con más repeticiones en un texto.
Este algoritmo puede ser de utilidad en el area de Procesamiento del Lenguaje Natural, para intentar resumir un texto
por medio de una grafica cloud word.
Es importante filtar los palabras vacias(stopwords) las cuales carecen de significado, como artículos, pronombres, preposiciones, etc. 
Tambien es impoportante eliminar caracteres especiales como saltos de linea, puntos y comas.
Esta calculadora puede procesar texto en ingles o español. 
El texto utilizado en las pruebas viene de las paginas
https://distintaslatitudes.net/archivo/el-rock-en-latinoamerica-una-posible-nota-introductoria
https://www.bbc.com/news/world-middle-east-64618187
*/


//La lista de stopwords se podria leer de un archivo txt
const stopwords = {
     ingles : ["a","about","above","after","again","against","all","am","an","and","any","are","aren't",
"as",
"at",
"be",
"because",
"been",
"before",
"being",
"below",
"between",
"both",
"but",
"by",
"can't",
"cannot",
"could",
"couldn't",
"did",
"didn't",
"do",
"does",
"doesn't",
"doing",
"don't",
"down",
"during",
"each",
"few",
"for",
"from",
"further",
"had",
"hadn't",
"has",
"hasn't",
"have",
"haven't",
"having",
"he",
"he'd",
"he'll",
"he's",
"her",
"here",
"here's",
"hers",
"herself",
"him",
"himself",
"his",
"how",
"how's",
"i",
"i'd",
"i'll",
"i'm",
"i've",
"if",
"in",
"into",
"is",
"isn't",
"it",
"it's",
"its",
"itself",
"let's",
"me",
"more",
"most",
"mustn't",
"my",
"myself",
"no",
"nor",
"not",
"of",
"off",
"on",
"once",
"only",
"or",
"other",
"ought",
"our",
"ours",
"ourselves",
"out",
"over",
"own",
"same",
"shan't",
"she",
"she'd",
"she'll",
"she's",
"should",
"shouldn't",
"so",
"some",
"such",
"than",
"that",
"that's",
"the",
"their",
"theirs",
"them",
"themselves",
"then",
"there",
"there's",
"these",
"they",
"they'd",
"they'll",
"they're",
"they've",
"this",
"those",
"through",
"to",
"too",
"under",
"until",
"up",
"very",
"was",
"wasn't",
"we",
"we'd",
"we'll",
"we're",
"we've",
"were",
"weren't",
"what",
"what's",
"when",
"when's",
"where",
"where's",
"which",
"while",
"who",
"who's",
"whom",
"why",
"why's",
"with",
"won't",
"would",
"wouldn't",
"you",
"you'd",
"you'll",
"you're",
"you've",
"your",
"yours",
"yourself",
               "yourselves"],
     español: ["un","a","del","hemos","más","que","se","y","de","en","un","al","no",
"una",
"unas",
"unos",
"uno",
"sobre",
"todo",
"también",
"tras",
"otro",
"algún",
"alguno",
"alguna",
"algunos",
"algunas",
"ser",
"es",
"soy",
"eres",
"somos",
"sois",
"estoy",
"esta",
"estamos",
"estais",
"estan",
"como",
"en",
"para",
"atras",
"porque",
"por qué",
"estado",
"estaba",
"ante",
"antes",
"siendo",
"ambos",
"pero",
"por",
"poder",
"puede",
"puedo",
"podemos",
"podeis",
"pueden",
"fui",
"fue",
"fuimos",
"fueron",
"hacer",
"hago",
"hace",
"hacemos",
"haceis",
"hacen",
"cada",
"fin",
"incluso",
"primero",
"desde",
"conseguir",
"consigo",
"consigue",
"consigues",
"conseguimos",
"consiguen",
"ir",
"voy",
"va",
"vamos",
"vais",
"van",
"vaya",
"gueno",
"ha",
"tener",
"tengo",
"tiene",
"tenemos",
"teneis",
"tienen",
"el",
"la",
"lo",
"las",
"los",
"su",
"aqui",
"mio",
"tuyo",
"ellos",
"ellas",
"nos",
"nosotros",
"vosotros",
"vosotras",
"si",
"dentro",
"solo",
"solamente",
"saber",
"sabes",
"sabe",
"sabemos",
"sabeis",
"saben",
"ultimo",
"largo",
"bastante",
"haces",
"muchos",
"aquellos",
"aquellas",
"sus",
"entonces",
"tiempo",
"verdad",
"verdadero",
"verdadera",
"cierto",
"ciertos",
"cierta",
"ciertas",
"intentar",
"intento",
"intenta",
"intentas",
"intentamos",
"intentais",
"intentan",
"dos",
"bajo",
"arriba",
"encima",
"usar",
"uso",
"usas",
"usa",
"usamos",
"usais",
"usan",
"emplear",
"empleo",
"empleas",
"emplean",
"ampleamos",
"empleais",
"valor",
"muy",
"era",
"eras",
"eramos",
"eran",
"modo",
"bien",
"cual",
"cuando",
"donde",
"mientras",
"quien",
"con",
"entre",
"sin",
"trabajo",
"trabajar",
"trabajas",
"trabaja",
"trabajamos",
"trabajais",
"trabajan",
"podria",
"podrias",
"podriamos",
"podrian",
"podriais",
"yo",
               "aquel"]};



function contar_palabras(texto){
    const palabras = Object.create(null);

    //Es de utilidad eliminar caracteres especiales como saltos de linea, puntos y comas.
    texto = texto.replace(/\n/g,' ');
    texto = texto.replace(/\./g,' ');
    texto = texto.replace(/\,/g,' ');
    texto = texto.replace(/\:/g,' ');
    texto = texto.replace(/\;/g,' ');
    texto.split(' ').forEach(palabra => {
    //Ignoramos los strings vacios
        if (!palabra == ""){
                //Para normalizar un poco los datos quitamos las mayusculas
                    palabra = palabra.toLowerCase() 
                    if (palabra in palabras) {
                            palabras[palabra] +=  1 
                    } else {
                            palabras[palabra] = 1
                    }
                }
        });
    return palabras
        
}



function eliminar_stopwords(palabras,idioma,remover){
    if (remover){
        //Verificamos si la palabra se encuentra en stopwords, en caso afirmativo se elimina
        const resultado = palabras.filter(word => !stopwords[idioma].includes(word));
        return resultado
    } else {
        const resultado = palabras
        return resultado
    }
}


function top_10(texto,idioma,remover=true){
    palabras = contar_palabras(texto)
    //Ordenamos las palabras por numero de apariciones, sin embargo, al imprimir por console.log el objeto se ordena por orden alfabetico
    const palabras_ordenas = Object.keys(palabras).sort(function(a,b){return palabras[b]-palabras[a]})

    const top_palabras = eliminar_stopwords(palabras_ordenas,idioma,remover);
    
    //En javascript podemos establecer la longitud de un objeto asignando un valor a su atributo length (No estoy seguro si es una buena practica pero funciona)
    top_palabras.length  = 10
    
    
    /*En el paso de ordenamiento se obtuvo las palabras ordenas por aparición, sin embargo, se perdio el numero de apariciones de la palabra
      en este paso recuperamos las apariciones
    */
    const resultado = Object.create(null);
    top_palabras.forEach(palabra => {
             resultado[palabra] = palabras[palabra]
   });

   return resultado
}


function create_word(text,size,id,canvas,x=0,y=0){
    let word = document.createElementNS("http://www.w3.org/2000/svg","text");
    word.textContent = text;
    word.setAttributeNS(null,'dominant-baseline','hanging')
    word.setAttributeNS(null,'alignment-baseline','baseline')
    word.setAttributeNS(null,'font-style','italic')
    word.setAttributeNS(null,'font-size',size)
    word.setAttributeNS(null,'id',id)
    word.setAttributeNS(null,'x',x)
    word.setAttributeNS(null,'y',y)
    
    canvas.appendChild(word);

}

prueba = "Un poco de historia nunca cae mal Latinoamérica posee una gama extensa de sonidos,\
            de tendencias musicales, de cultura sonora. Desde Tijuana hasta la Patagonia abundan las formas, \
            los estilos, las interpretaciones, los sonidos; con cada uno de ellos se vislumbra una interpretación de la vida, \
            una asociación interminable entre el sujeto que escucha y la onda sonora que se manifiesta. Los latinos hemos generado \
            muestras musicales propias, asociamos nuestros entornos y los volvemos tangibles y simbólicos a través de distintos ritmos. \
            Latinoamérica le ha dado al mundo sonidos tan emblemáticos como la samba, la cumbia, el son, la salsa, el reggae, el danzón, \
            la chicha y el ska. Sin embargo, también hemos adaptado uno de los ritmos más significativos del siglo XX: \
            el rock El rock nació en Estados Unidos como una representación del mestizaje cultural: la cultura de sobrevivencia de los afroamericanos, \
            la rebeldía de los blancos hijos de la gran represión y las condiciones sociales de cambio de la posguerra impulsaron la cultura musical \
            que marcaría tendencia en las décadas posteriores. Nacía el rock and roll; se levantaba la cultura rebelde, de protesta, de reclamos y de darle \
            presencia a los jóvenes y hacerlos partícipes de algo. Mientras eso sucedía en Estados Unidos, en Latinoamérica empiezan a surgir pequeños movimientos, \
            auspiciados por el mass media, que buscan emular parte del discurso “rockero” norteamericano. \
            En México se importó todo un modelo y se suavizó en las voces de Angélica María, Alberto Vázquez, Cesar Costa y Enrique Guzmán. \
            En Sudamérica, el rock empezó a tomar dos vertientes: una más ligada al subterráneo como Los Saicos de Perú y otra, mucho más ligada a la estética\
            norteamericana, como Sandro en Argentina. Con el paso de los años y con la expansión musical que gracias a The Beatles se dio en el mundo, \
            el rock latinoamericano fue tomando forma. La llegada de las dictaduras militares fue una pausa para el desarrollo de la mentalidad protestante del rock. \
            A pesar del clima de represión, la actitud simbólica del rock tomó otras formas en las voces de Chico Buarque, Violeta Parra y Víctor Jara en Chile. \
            En toda la región, la represión provocó que se fueran generando los míticos “hoyos funkies” donde empezaron a surgir agrupaciones legendarias y la música \
            se pasaba de uno en uno, cual producto prohibido y reprimido. El rock se volvió subterráneo, las juventudes de los sesentas y los setentas tenían que ver de \
            lejos los grandes movimientos musicales que venían de Inglaterra y Estados Unidos; adiós al punk, adiós al metal, adiós al progresivo. \
            La modernidad musical venía suavizada con la balada y los grandes dramones musicales. Ante este clima, la juventud latina encontró formas de escape, \
            los grupos musicales comenzaron a importar los movimientos culturales anglosajones; iniciaba el mestizaje musical.\
            Con la llegada de los años ochenta y de la instauración de la televisión como el medio masivo por excelencia, el movimiento de rock en español tomaría fuerza. \
            La semilla que plantaran las voces de Charlie García y Three souls in my mind; las guitarras de los Dug Dugs y Los Lobos; la fuerza de Vox Dei y Álvaro Peña, \
            florecería en esta década";


cloud_words = top_10(prueba,"español");




var canvas = document.getElementById("canvas")
var last_word;
let indice= 0;
let max_y = 0;
  
for (let key in cloud_words) {
    let last_x = 0;
    let last_y = 0;

    if (last_word != null){
        var bbox = last_word.getBBox();
        last_x = bbox.width + bbox.x
        last_y = bbox.height + bbox.y
    }

    create_word(key,cloud_words[key]*10,key,canvas,x=last_x)
    var word = canvas.getElementById(key);

    var bbox = word.getBBox();
    current_x = bbox.width + bbox.x
    if (current_x > 900){
        word.setAttributeNS(null,'transform','translate('+ -bbox.x + ',' + max_y  +')')
    }
    
    
    if (indice == 0){
        var bbox = word.getBBox();
        max_y = bbox.height + bbox.y;
        max_x = bbox.y;
    }
    
    /*
    if (last_word != null){
       var bbox = word.getBBox();
       console.log(max_y,bbox.height + bbox.y, max_y - (bbox.height))
       let current_y  = max_y- (bbox.height + bbox.y);
       word.setAttributeNS(null,'transform','translate(0,'+ current_y  +')')
    }
    */
    last_word = canvas.getElementById(key);
    indice = 1 + indice;
  }



//Obtenemos el idioma
//let idioma =  prompt('El texto ingresado puede estar en ingles o español, ¿Que idioma desea utilizar?');
//console.log("El idioma seleccionado es: " + idioma);

let svg = document.getElementById("prueba");
//console.log(div.innerHTML);
var svgNS = "http://www.w3.org/2000/svg";  

let texto = document.createElementNS("http://www.w3.org/2000/svg","text");

//texto.inner= 'text-anchor="start" transform="translate(20,0) rotate(90)" dominant-baseline="hanging" font-style="italic'
texto.setAttributeNS(null,'text-anchor','start')
texto.setAttributeNS(null,"x",0);
texto.setAttributeNS(null,"y",0);
//texto.setAttributeNS(null,'transform','translate(90,300) rotate(270)')
texto.setAttributeNS(null,'dominant-baseline','hanging')
//texto.setAttributeNS(null,'font-style','italic')
texto.setAttributeNS(null,'font-size','30px')
texto.textContent = 'Hola Mundo 22!'


//document.getElementById("prueba").appendChild(texto);

var bbox = texto.getBBox();
var width = bbox.width;
var height = bbox.height;
console.log(bbox);



let texto_p = document.createElementNS("http://www.w3.org/2000/svg","text");

//texto.inner= 'text-anchor="start" transform="translate(20,0) rotate(90)" dominant-baseline="hanging" font-style="italic'
texto_p.setAttributeNS(null,'text-anchor','start')
texto_p.setAttributeNS(null,"x",bbox.width);
texto_p.setAttributeNS(null,"y",0);
texto_p.setAttributeNS(null,'dominant-baseline','hanging')
texto_p.setAttributeNS(null,'font-style','italic')
texto_p.setAttributeNS(null,'font-size','10px')
texto_p.textContent = 'Hola Mundo 22!'

//document.getElementById("prueba").appendChild(texto_p);




