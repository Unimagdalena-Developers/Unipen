import auth  from '../Login-y-registro/assets/js/auth.js'
import { onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

window.addEventListener('DOMContentLoaded', event => {

    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    navbarShrink();

    document.addEventListener('scroll', navbarShrink);

    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
    
    const signInButton  = document.querySelector('#sign-in-btn')

    onAuthStateChanged(auth,(user)=> {
        if(user) {
            signInButton.innerHTML ='<a  class="nav-link" href="/profile" > VER PERFIL</a>'

           
        }
        else {
            signInButton.innerHTML ='<a class="nav-link" href="/Login-y-registro">Iniciar Sesion</a>'

        }
    })
  
});

