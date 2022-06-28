
const templateButtonToTop= `<a href="#" class="to-top"><svg class="icon-to-top" viewbox="0 0 60 100"><path d="M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z"></path></svg></a>`;

document.body.insertAdjacentHTML('afterbegin',templateButtonToTop );

const buttonToTop = document.querySelector('.to-top');

createButtonToTop ()

export function createButtonToTop (){
    window.addEventListener('scroll', handleButton);
    handleButton ()
}

export function removeButtonToTop() {
    window.removeEventListener('scroll', handleButton);
    buttonToTop.classList.remove('active');
}

 function handleButton (){

    if (window.pageYOffset > 120) {
        buttonToTop.classList.add('active');
        return
    }

    buttonToTop.classList.remove('active');
}

