import auth  from '../login-and-register/assets/js/auth.js'
import { onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getDocs, collection, } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import database  from "./database.js"
window.addEventListener('DOMContentLoaded', async(event) => {

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
            signInButton.innerHTML ='<a class="nav-link" href="/login-and-register">Iniciar Sesion</a>'

        }
    })

    const rentsContainer = document.querySelector('.rents-container')

    let html = '';
    rentsContainer.innerHTML = `
    <div id="loader-container">
        <div id="loader" class="d-flex align-items-center" style="width:200px; margin:auto; margin-top:50px;" >
            <strong>Loading...</strong>
            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </div>
    </div>`
    const querySnapshot = await getDocs(collection(database, "rents"));
    querySnapshot.forEach((doc) => {
        const rent =  doc.data()
        html += `
        <div class="col-lg-4 col-sm-6 mb-4">
            <div class="portfolio-item">
                <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${rent.id}">
                    <div class="portfolio-hover">
                        <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                    </div>
                    <img class="img-fluid" src="${rent.photo}" alt="Rent Photo" />
                </a>
                <div class="portfolio-caption">
                    <div class="portfolio-caption-heading">${rent.name}</div>
                    <div class="portfolio-caption-subheading text-muted">${rent.description}</div>
                </div>
            </div>
        </div>
        

        <div class="portfolio-modal modal fade" id="portfolioModal${rent.id}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.png"
                        alt="Close modal" /></div>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="modal-body">
                                <h2 class="text-uppercase">${rent.name}</h2>
                                <img class="img-fluid d-block mx-auto" src="${rent.photo}" alt="Rent photo" />
                                <p>${rent.description}</p>
                                <ul class="list-inline">
                                    <li>
                                        <strong>Dirección:</strong>
                                        ${rent.address}
                                    </li>
                                    <li>
                                        <strong>Precio:</strong>
                                        ${rent.value}
                                    </li>
                                </ul>
                                <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal"
                                    type="button">
                                    <i class="fas fa-xmark me-1"></i>
                                    Close Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
        `
    });
    rentsContainer.innerHTML = html
  
});

