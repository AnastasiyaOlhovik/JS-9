const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),r=document.querySelector("body");t.addEventListener("click",(function(l){if(o)return;o=!0,r.style.backgroundColor=n(),t.setAttribute("disabled",!0),e.removeAttribute("disabled",!0),d=setInterval((()=>{r.style.backgroundColor=n(),t.setAttribute("disabled",!0)}),1e3)})),e.addEventListener("click",(function(r){o=!1,t.removeAttribute("disabled",!0),e.setAttribute("disabled",!0),clearInterval(d)})),e.setAttribute("disabled",!0);let o=!1,d=null;function n(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}
//# sourceMappingURL=01-color-switcher.3444d285.js.map
