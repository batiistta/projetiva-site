/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

const navLink = document.querySelectorAll('.nav__link')
function linkAction(){
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

function scrollHeader(){
    const header = document.getElementById('header')
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

const sections = document.querySelectorAll('section[id]')
function scrollActive(){
    const scrollY = window.pageYOffset
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== PORTFOLIO MODAL ===============*/
const portfolioItems = document.querySelectorAll('.portfolio__item'),
      modal = document.getElementById('portfolio-modal'),
      modalImg = document.getElementById('modal-img'),
      modalTitle = document.getElementById('modal-title'),
      modalDescription = document.getElementById('modal-description'),
      modalClose = document.querySelector('.modal__close')

const portfolioData = {
    'residencia-moderna-2023': {
        title: 'Residência Moderna',
        description: 'Uma residência contemporânea de 450m² que combina linhas clean com materiais naturais. O projeto privilegia a integração entre os ambientes internos e externos, criando uma sensação de amplitude e conexão com a natureza.'
    },
    'casa-minimalista-2023': {
        title: 'Casa Minimalista',
        description: 'Projeto residencial de 380m² que explora os conceitos do minimalismo arquitetônico. Espaços amplos e despojados, com foco na funcionalidade e na qualidade dos materiais.'
    },
    'projeto-sustentavel-2022': {
        title: 'Projeto Sustentável',
        description: 'Residência ecológica de 420m² que incorpora tecnologias sustentáveis e materiais de baixo impacto ambiental. Um exemplo de arquitetura consciente e responsável.'
    }
}

portfolioItems.forEach(item => {
    const button = item.querySelector('.portfolio__button');
    if (button) {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = item.getAttribute('data-project');
            const imgSrc = item.querySelector('.portfolio__img').src;
            const projectData = portfolioData[projectId];

            if (projectData) {
                modalImg.src = imgSrc;
                modalTitle.textContent = projectData.title;
                modalDescription.textContent = projectData.description;
                modal.classList.add('show-modal');
            }
        });
    }
})

if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('show-modal')
    })

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show-modal')
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show-modal')) {
            modal.classList.remove('show-modal')
        }
    })
}

/*=============== LIGHTBOX PARA GALERIA ===============*/
const galleryItems = document.querySelectorAll('.gallery__item');
const galleryImageSources = Array.from(galleryItems).map(item => {
    const img = item.querySelector('.gallery__img');
    return { src: img.src, alt: img.alt };
});
let lightboxInstance = null;
let currentIndex = 0;

function showImage(index) {
    if (!lightboxInstance) return;
    const imgElement = lightboxInstance.querySelector('.lightbox__img');
    const { src, alt } = galleryImageSources[index];
    imgElement.src = src;
    imgElement.alt = alt;
    currentIndex = index;
}

function showNextImage() {
    const nextIndex = (currentIndex + 1) % galleryImageSources.length;
    showImage(nextIndex);
}

function showPrevImage() {
    const prevIndex = (currentIndex - 1 + galleryImageSources.length) % galleryImageSources.length;
    showImage(prevIndex);
}

function destroyLightbox() {
    if (lightboxInstance) {
        document.body.removeChild(lightboxInstance);
        lightboxInstance = null;
        document.removeEventListener('keydown', handleKeydown);
    }
}

function closeLightbox() {
    if (lightboxInstance) {
        lightboxInstance.classList.remove('show-lightbox');
        setTimeout(destroyLightbox, 300);
    }
}

function handleKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
}

function createLightbox(clickedIndex) {
    if (lightboxInstance) return;

    lightboxInstance = document.createElement('div');
    lightboxInstance.className = 'lightbox';
    lightboxInstance.innerHTML = `
        <div class="lightbox__content">
            <button class="lightbox__close">&times;</button>
            <button class="lightbox__nav lightbox__prev"><i class="fas fa-chevron-left"></i></button>
            <img src="" alt="" class="lightbox__img">
            <button class="lightbox__nav lightbox__next"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    document.body.appendChild(lightboxInstance);

    showImage(clickedIndex);

    setTimeout(() => {
        lightboxInstance.classList.add('show-lightbox');
    }, 10);

    lightboxInstance.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lightboxInstance.querySelector('.lightbox__next').addEventListener('click', showNextImage);
    lightboxInstance.querySelector('.lightbox__prev').addEventListener('click', showPrevImage);
    lightboxInstance.addEventListener('click', (e) => {
        if (e.target === lightboxInstance) {
            closeLightbox();
        }
    });
    document.addEventListener('keydown', handleKeydown);
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        createLightbox(index);
    });
});

/*=============== FORMULÁRIO ===============*/
const contactForm = document.getElementById('contact-form')

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const name = formData.get('user_name')
    const email = formData.get('user_email')
    const message = formData.get('message')

    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos.')
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.')
        return
    }

    const submitButton = contactForm.querySelector('.contact__button')
    const originalText = submitButton.innerHTML

    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
    submitButton.disabled = true

    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
        contactForm.reset()
        submitButton.innerHTML = originalText
        submitButton.disabled = false
    }, 2000)
})

/*=============== SMOOTH SCROLL ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight
            const targetPosition = target.offsetTop - headerHeight
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            })
        }
    })
})

/*=============== SCROLL ANIMATIONS ===============*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
        }
    })
}, observerOptions)

document.querySelectorAll('.about__box, .portfolio__item, .gallery__item, .contact__card').forEach(el => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    observer.observe(el)
})

/*=============== LOADING ===============*/
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader')
    if (loader) {
        loader.style.opacity = '0'
        setTimeout(() => {
            loader.style.display = 'none'
        }, 500)
    }
})