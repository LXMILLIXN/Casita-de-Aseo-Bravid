document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.perfil');
    button.addEventListener('onclick', menu);

    function menu() {
        const menuSesion = document.querySelector('.menu_sesion');
        if (menuSesion.hasAttribute('hidden')) {
            menuSesion.removeAttribute('hidden');
        } else {
            menuSesion.setAttribute('hidden', '');
        }
    }
});
 