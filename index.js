
(function () {
    class SlideShow {
        constructor(startIndex, element) {
            this.startIndex = startIndex;
            this.currentIndex = this.startIndex;
            this.element = element;
            this.slides = this.element.querySelectorAll('.slide');
            this.setActiveSlide();
            this.next();
            this.prev();
        }

        setActiveSlide() {
            this.slides.forEach((item, index) => {
                if (index === this.currentIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            })

        }

        next() {
            let nextBtn = this.element.querySelector('[data-way="next"]');
            nextBtn.addEventListener('click', () => {
                if (this.currentIndex === this.slides.length - 1) {
                    this.currentIndex = 0;
                } else {
                    this.currentIndex++;
                }
                this.setActiveSlide();
            })

        }

        prev() {
            let prevBtn = this.element.querySelector('[data-way="prev"]');
            prevBtn.addEventListener('click', () => {
                if (this.currentIndex === 0) {
                    this.currentIndex = this.slides.length - 1;
                } else {
                    this.currentIndex--;
                }
                this.setActiveSlide();
            })
        }
    }

    let slideShow = document.querySelectorAll('.slideshow');

    slideShow.forEach(item => {
        new SlideShow(0, item)
    })
}());

const animItems = document.querySelectorAll(`._anim-items`);
if (animItems.length > 0) {
  window.addEventListener(`scroll`, animOnScroll);

  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffSet = offset(animItem).top;
      const animStart = 1000;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      if (
        pageYOffset > animItemOffSet - animItemPoint &&
        pageYOffset < animItemOffSet + animItemHeight
      ) {
        animItem.classList.add(`_active`);
      } else {
        if (!animItem.classList.contains(`_anim-no-hide`)) {
          animItem.classList.remove(`_active`);
        }
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect();
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
 
//   animOnScroll();
  setTimeout(() => {
    animOnScroll();
  }, 300);
}


const modelController = ({ modal, btnOpen, btnClose, menu, time = 300 }) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);
  const men = document.querySelector(menu);

  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  const closeModal = event => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      event.code === 'Escape'
      ) {
      
      modalElem.style.opacity = 0;
      men.style.visibility = 'visible';
      men.style.opacity = 1;
      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
      }, time);

      window.removeEventListener('keydown', closeModal);
    }
  }

  const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    men.style.visibility = 'hidden';
    men.style.opacity = 0;
    window.addEventListener('keydown', closeModal)
  };

  buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modalElem.addEventListener('click', closeModal);
};
modelController({
modal: '.application',
btnOpen: '.buttonOpen',
btnClose: '.SingInBlok1280',
menu: '.menu'
});
modelController({
  modal: '.contakt-info-modal',
  btnOpen: '.contacts-mod-wid',
  btnClose: '.catalog_of_services_close',
  menu: '.menu'
});

let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');
menuBtn.addEventListener('click', function(){
	menu.classList.toggle('active');
})

window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
      var keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
          this.value = new_value;
        }
        if (event.type == "blur" && this.value.length < 5) {
          this.value = "";
        }
      }
  
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
  
    });
  
});

const TELEGRAM_BOT_TOKEN = '6447117307:AAH7HztVqr5kIgkb0kSxHAeglxoB74-8-5k';
const TELEGRAM_CHAT_ID = '-1001881302219';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

const button_send = document.getElementById('bt_send')
const form_send = document.getElementById('form');

if(button_send) {
    form_send.addEventListener('submit', 
      async function sendEmailTelegram(event) {
      event.preventDefault();
      const form = event.target;
      let name_send = document.getElementById('name_C').value;
      let phone_send = document.getElementById('phone_C').value;
      let city_send = document.getElementById('pass_C').value;
      let data_send = document.getElementById('formData').value;
      let time_send = document.getElementById('formTime').value;
      let servise_send = document.getElementById('formService').value;

      const opacity_mod = document.querySelector('.opacity_m');
      const men_br = document.querySelector('.menu')


      const res_send = document.querySelector('.send-result_blok')
      const modalElem_res_send = document.querySelector('.form__send-result_blok_web');
    
      const text_webpage = `Заявка с сайта!\nимя: ${name_send}\nТелефон: ${phone_send}\nГород: ${city_send} \nДата: ${data_send}\nВремя ${time_send}\nУслуга: ${servise_send}`;
      console.log(text_webpage)
      try {
        button_send.textContent = 'Loading...';
        const response = await fetch(API, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: text_webpage,
          })
        })
        if (response.ok) {
          modalElem_res_send.style.cssText = `
          display: flex;
          visibility: visible;
          opacity: 1;
          `
          setTimeout(() => modalElem_res_send.style.display = 'none', 3000);
          opacity_mod.style.visibility = 'hidden';
          // setTimeout(() => opacity_mod.style.display = 'none', 3000);
          opacity_mod.style.opacity = 0;
          men_br.style.visibility = 'visible';
          men_br.style.opacity = 1;
          form.reset()
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
          console.error(error);
          res_send.textContent = 'Заявка не отправлена! Попробуйте позже.';
          res_send.style.color = 'red';

       } finally {
          button_send.textContent = 'Отправить';
      }
  })
}

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
  get: function () {
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
  }
});
document.body.on('click touchstart', function () {
  const videoElement = document.getElementById('vido');
  if (videoElement.playing) {
    // video is already playing so do nothing
  }
  else {
    // video is not playing
    // so play video now
    videoElement.play();
  }
});

// Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
//   get: function () {
//   return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
//   }
//   });
  
//   document.body.addEventListener("click", playVideoOnLowPower);
//   document.body.addEventListener("touchstart", playVideoOnLowPower);
//   function playVideoOnLowPower(){
//   try{
//   const videoElements = document.querySelectorAll(".vid");
//   for (let i = 0; i < videoElements.length; i++) {
//   if (videoElements[i].playing) {
//   // video is already playing so do nothing
//   console.log('Playing');
//   }
//   else {
//   // video is not playing so play video now
//   videoElements[i].play();
//   console.log('Not Playing');
//   }
//   }
//   }
//   catch(err) {
//   console.log(err);
// }
// }
// $('body').on('click touchstart', function () {
//   const videoElement = document.getElementById('home_video');
//   if (videoElement.playing) {
//       // video is already playing so do nothing
//   }
//   else {
//       // video is not playing
//       // so play video now
//       videoElement.play();
//   }
// });
