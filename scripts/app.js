var modulo = angular.module('prueba',[]);

modulo.controller('MainCtrl', function ($scope) {
  'use strict';
  $scope.pene=[];
});


modulo.directive('arrastrar', function(){
  function link(scope,element,attrs) {

    element.attr('draggable', "true")

    /* Funcion de arrastrado */
    if (!scope.arrastrando){
      scope.arrastrando = function(event) {
        var x = (event.clientX - event.target.offsetLeft - (event.target.offsetWidth/2));
        var y = (event.clientY - event.target.offsetTop - 15);
        var z = 100;
        var newPosition = {};
        newPosition.left = event.target.offsetLeft + x;
        newPosition.right = event.target.offsetLeft + x + event.target.offsetWidth;
        newPosition.top = event.target.offsetTop + y;
        newPosition.bottom = event.target.offsetTop + y + event.target.offsetHeight;

        var container = document.querySelector('#container')
        if (container.offsetLeft < newPosition.left && container.offsetWidth + container.offsetLeft > newPosition.right &&
            container.offsetTop < newPosition.top && container.offsetHeight + container.offsetTop > newPosition.bottom ){
          event.target.style.transform = 
            event.target.style.webkitTransform = 
            'translate3d(' + x + 'px, ' + y + 'px,' + z + 'px)';
        } 
      }
    };/* end if*/

    if (!scope.deleteShadow) {
      scope.normalizar = function  (event) {
        var img =document.createElement('img');
        img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
        var imagen = document.createElement('img');
        imagen.src = "http://icons.iconarchive.com/icons/designbolts/despicable-me-2/128/Minion-Amazed-icon.png";
        event.dataTransfer.setDragImage(img,20,20);
      }
    }/* end if */
    element.on('drag', arrastrando);
    element.on('dragstart', deleteShadow);

  };
  return {link: link};
});

modulo.directive('container',function () {
  function link(scope,element,attrs) {

    if (!scope.soltarObjeto) {
      scope.soltarObjeto = function (evento){

        evento.preventDefault();
        evento.stopPropagation();
        evento.target.style.transition = "";
        evento.target.style.boxShadow = "";

        var id = evento.dataTransfer.getData("element");
        if (id && document.getElementsByTagName(id).length === 0){
          var element;
          element = document.createElement(id);
          element.setAttribute("arrastrar","");
          element.setAttribute('username', "mortega5");
          element.style.position = "absolute";

          element.style.top = (event.pageY ) + "px";
          element.style.left = (event.pageX) + "px";

          event.target.appendChild(element);
        }
      }
    };/* end if */

    if (!scope.entraArrastre) {
      scope.entraArrastre = function (evento){evento.preventDefault()};
    };/* end if */

    if (!scope.quitarSombras) {
      scope.quitarSombras = function(event) {
        event.preventDefault();
        event.target.style.transition = "";
        event.target.style.boxShadow = "";
      };
    }; /* end if */

    if (!scope.mostrarSombra) {
      scope.mostrarSombra = function(event) {
        if (event.target.id == 'container') {
          event.target.style.transition = "all 0.2s";
          event.target.style.boxShadow = "0px 0px 10px black";
        };
      };
    }; /* end if */

    element.on('drop',scope.soltarObjeto);
    element.on('dragover',scope.entraArrastre);
    element.on('dragleave',scope.quitarSombras);
    element.on('dragenter',scope.mostrarSombra);
  }
  return {link:link};
});


modulo.directive('addelement', function () {
  function link (scope,element, attrs) {
    if (!scope.comienzo) {
      scope.comienzo = function (evento) {
        evento.dataTransfer.setData("element",evento.target.id);

        var imagen = document.createElement('img');
        imagen.src = "http://icons.iconarchive.com/icons/designbolts/despicable-me-2/128/Minion-Amazed-icon.png";
        event.dataTransfer.setDragImage(imagen,0,0);
        var container = document.querySelector('#container')
        container.style.boxShadow = "5px 5px 5px solid black";
      };
    } /* end if */

    element.attr('draggable', 'true');
    element.on('dragstart',comienzo);
  };
  return {link:link};
});