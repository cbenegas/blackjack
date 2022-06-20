/* 
2C = Two of Clubs (Tréboles)
2D = Two of Diaminds (Diamantes)
2H = Two of Hearts (Corazones)
2S = Two of Spades (Picas)
*/


/* Patron modulo: 
   **************
    Creo una funcion anonima autoinvocada para que no pueda ser ejecutada desde la consola del navegador
    Se recomienda siempre utilizar el modo estricto (use strict) en el patron modulo, para evitar errores

( () => {
    'use strict'

    // codigo de mi programa

})();

   */

const MiModulo = (() => {
    'use strict'

    let deck = [],
        puntosJugadores = [];
    
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];


    // Referencias del HTML
    const btnPedirCarta = document.querySelector( '#btnPedirCarta' ),
          btnDetener = document.querySelector( '#btnDetener ' ),
          btnNuevoJuego = document.querySelector( '#btnNuevoJuego' ),

          indicadorPuntos = document.querySelectorAll( 'small' ),
          divCartasJugadores = document.querySelectorAll( '.divCartas' );

    
    // Esta fincion inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        puntosJugadores = [];
        for( let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }
        
        indicadorPuntos.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedirCarta.disabled = false;
        btnDetener.disabled = false;
    }
        

    const crearDeck = () => {
        deck = [];
        for( let i = 2; i <= 10; i++ ){
            for( let tipo of tipos ){
                deck.push( i + tipo );
            }
        }

        for(let tipo of tipos ){
            for( let esp of especiales){
                deck.push( esp + tipo);
            }
        }
        return _.shuffle( deck ); 
    }

    // Esta funcion pertime tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    const valorCarta = ( carta ) => {
        // Recorto el valor de la carta, independientemente del palo
        const valor = carta.substring( 0, carta.length - 1 );
        return  isNaN( valor ) ?
                (( valor === 'A' ) ? 11 : 10) :
                valor * 1; // Al multiplicar el string 5 por un numero, el resultado es un numero.
    }

    // Turno: 0 = Primer Jugador y el ultimo sera la computadora.
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        indicadorPuntos[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    } 

    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
    }

    const determinarGanador = () => {
        
        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout( () => {
            ( puntosMinimos > 21 ) ? alert('¡Computadora Gana!') : 
            ( puntosComputadora === puntosMinimos ) ? alert("¡Empate!") : 
            ( puntosComputadora <= 21 && puntosComputadora > puntosMinimos ) ? alert('¡Computadora gana!') :
            alert('¡Felicidades, jugador gana!');
        } , 50);
    }
    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
            crearCarta( carta, puntosJugadores.length -1);

        }while( (puntosComputadora < puntosMinimos) && puntosMinimos <= 21 );
        
        determinarGanador();
    }


    // Eventos
    btnPedirCarta.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );
        
        crearCarta( carta, 0 );

        if( puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste.');
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugadores[0] );
        }
        else if( puntosJugador === 21 ){
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugadores[0] );
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugadores[0] );
    });

    btnNuevoJuego.addEventListener('click', () => {
        console.clear();

        inicializarJuego();
    })

    // Todo lo que retornemos, será publico.
    return {
       nuevoJuego: inicializarJuego    // Para el "exterior" la funcion "inicializarJuego" se llama "nuevoJuego"
    };

})();


