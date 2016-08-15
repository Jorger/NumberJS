# NumberJS

Juego desarrollado en [Canvas] HTML5, inspirado en unos de los minijuegos presentado por [Peak - Brain training], el juego consiste en seleccionar los números de menor a mayor en un tiempo específico, en algunos casos los números serán negativos.

**NumberJS** ha sido desarrollado haciendo uso de la última versión de Javascript conocida como [ES6/ES2015],
aplicando algunas de sus funcionalidades como son:

* Uso de nuevas formas de declarar variables:
  * ``let``
  * ``const``
* [Funciones Arrow]
* [Template Literals]
* [Módulos]
* Entre otras.

Es posible ver un listado de las nuevas funcionalidades que nos trae ES6, en el repositorio denominado
[ECMAScript 6 equivalents in ES5] realizado por [Addy Osmani]

### Demo

![NUMBERJS](https://db.tt/fVuSNFO9)

Es posible acceder al juego a través de la dirección: https://jorger.github.io/NumberJS/

Para dispositivos móviles es posible escanear el siguiente código QR.

![QR](https://db.tt/2II51Rx7)

En dispositivos móviles basados en Android con navegador Google Chrome, es posible agregar la aplicación a la [pantalla principal], es este caso se hará uso de [manifest.json] para controlar la orientación del dispositivo.

### Stack

Debido a que todos los navegadores aún no soportan algunas de las nuevas funcionalidades de ES6, se hace necesario realizar una "traducción"
de éste a la versión estable como es ES5, para tal fin se ha hecho uso de [BabelJS] además de [Browserify] para el manejo de módulos.

Además de otras librerías que se encuentran específicadas en el archivo **package.json**

Para la instación de estas se debe hacer uso del comando:

```
npm install
```

Para realizar la conversión/empaquetamiento, se deberá ejecutar el comando:

```
npm run watch
```
Para realizar la compresión de los archivos (js/css), se hace uso de los paquetes **uglifyjs** y **clean-css**.

A través del comando:

```
npm run start
```

### Service Worker

Otras de las características asociadas al juego, ha sido la posibilidad de ser jugado offline, para lo cual se ha hecho uso de [Service Worker], se ha tomado como ejemplo la aplicación [airhorn].


### Autor
Jorge Rubaino [@ostjh]
License
----
MIT

[@ostjh]:https://twitter.com/ostjh
[Canvas]:https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
[Peak - Brain training]:http://www.peak.net/
[ES6/ES2015]:http://www.ecma-international.org/ecma-262/6.0/index.html
[Funciones Arrow]:https://googlechrome.github.io/samples/arrows-es6/
[Template Literals]:https://developers.google.com/web/updates/2015/01/ES6-Template-Strings
[Módulos]:https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import
[ECMAScript 6 equivalents in ES5]:https://github.com/addyosmani/es6-equivalents-in-es5#default-parameters
[Addy Osmani]:https://github.com/addyosmani
[BabelJS]:https://babeljs.io/
[Browserify]:http://browserify.org/
[howler]:https://github.com/goldfire/howler.js
[Service Worker]:http://www.html5rocks.com/en/tutorials/service-worker/introduction/?redirect_from_locale=es
[airhorn]:https://github.com/GoogleChrome/airhorn
[pantalla principal]:https://developer.chrome.com/multidevice/images/home_add.png
[manifest.json]:https://developers.google.com/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android
