const MiModulo=(()=>{"use strict";let e=[],t=[];const r=["C","D","H","S"],o=["A","J","Q","K"],a=document.querySelector("#btnPedirCarta"),n=document.querySelector("#btnDetener "),l=document.querySelector("#btnNuevoJuego"),s=document.querySelectorAll("small"),d=document.querySelectorAll(".divCartas"),c=(r=2)=>{e=i(),t=[];for(let e=0;e<r;e++)t.push(0);s.forEach(e=>e.innerText=0),d.forEach(e=>e.innerHTML=""),a.disabled=!1,n.disabled=!1},i=()=>{e=[];for(let t=2;t<=10;t++)for(let o of r)e.push(t+o);for(let t of r)for(let r of o)e.push(r+t);return _.shuffle(e)},u=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},h=(e,r)=>(t[r]=t[r]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),s[r].innerText=t[r],t[r]),m=(e,t)=>{const r=document.createElement("img");r.src=`assets/cartas/${e}.png`,r.classList.add("carta"),d[t].append(r)},f=e=>{let r=0;do{const e=u();r=h(e,t.length-1),m(e,t.length-1)}while(r<e&&e<=21);(()=>{const[e,r]=t;setTimeout(()=>{e>21?alert("¡Computadora Gana!"):r===e?alert("¡Empate!"):r<=21&&r>e?alert("¡Computadora gana!"):alert("¡Felicidades, jugador gana!")},50)})()};return a.addEventListener("click",()=>{const e=u(),r=h(e,0);m(e,0),r>21?(console.warn("Lo siento mucho, perdiste."),a.disabled=!0,n.disabled=!0,f(t[0])):21===r&&(a.disabled=!0,n.disabled=!0,f(t[0]))}),n.addEventListener("click",()=>{a.disabled=!0,n.disabled=!0,f(t[0])}),l.addEventListener("click",()=>{console.clear(),c()}),{nuevoJuego:c}})();