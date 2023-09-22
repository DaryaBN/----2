
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
      const animStart = 4;

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

  setTimeout(() => {
    animOnScroll();
  }, 300);
}
const modelController = ({ modal, btnOpen, btnClose, btnCloseMobile, }) => {
    const buttonElems = document.querySelectorAll(btnOpen);
    const modalElem = document.querySelector(modal);
    const buttonElemsMobile = document.querySelector(btnCloseMobile);
    // const menuClose = document.querySelector(menu);
    // const elFooter = document.body.querySelector('footer');
    

    modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    `;
  
const closeModal = (event) => {
    const { target } = event;
    if (
    target === modalElem ||
    target.closest(btnClose) ||
    target.closest(btnCloseMobile)
    ) {
    modalElem.style.opacity = 0;
    // menuClose.style.visibility = 'visible'
    // menuClose.style.opacity = 1;
    // elFooter.style.visibility = 'visible'
    // elFooter.style.opacity = 1;
    setTimeout(() => {
        modalElem.style.visibility = 'hidden';
    }, 300);
    }
};

const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    // menuClose.style.visibility = 'hidden';
    // menuClose.style.opacity = 0;
    // elFooter.style.visibility = 'hidden';
    // elFooter.style.opacity = 0;
};

buttonElems.forEach((btnOp) => {
    btnOp.addEventListener('click', openModal);
});
modalElem.addEventListener('click', closeModal);
// buttonElemsMobile.addEventListener('touchmove', closeModal);
};
modelController({
modal: '.application',
btnOpen: '.buttonOpen',
btnClose: '.SingInBlok1280',
btnCloseMobile: '.SingInHandler',
// menu:'.open_Menu',
});

let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');
menuBtn.addEventListener('click', function(){
	menu.classList.toggle('active');
})


const TELEGRAM_BOT_TOKEN = '5756450089:AAHvxRuBQjuTez7CbSAL5DFCPEwMmo7lZXg';
const TELEGRAM_CHAT_ID = '-1001881302219';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

addEventListener('submit', 
async function sendEmailTelegram(event) {
    event.preventDefault();

    const form = event.target;
    const formBtn = document.querySelector('.form__submit-button button')
    const formSendResult = document.querySelector('.form__send-result')
    formSendResult.textContent = '';
    const modalElem = document.querySelector('.modal');
    const modalElem_result = document.querySelector('.form__send-result_blok');

    const { name, phone, pass, Data, Time, Service} = Object.fromEntries(new FormData(form).entries());
    
    const text = `Заявка с сайта!\nимя: ${name}!\nТелефон: ${phone}\nГород: ${pass}\nДата: ${Data}\nВремя ${Time}\nУслуга: ${Service}`;

 
    try {
        formBtn.textContent = 'Loading...';

        const response = await fetch(API, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            })
        })
        
        if (response.ok) {
            formSendResult.textContent = 'Спасибо за ваше обращение! Мы свяжемся с вами в выбранное вами время.';
            modalElem.style.cssText = `
                display: flex;
                visibility: hidden;
                opacity: 0;
                transition: opacity 300ms ease-in-out;
            `;
            modalElem_result.style.cssText = `
            display: flex;
            visibility: visible;
            opacity: 1;
            `
            setTimeout(() => modalElem_result.style.display = 'none', 3000);
            
            form.reset()
        } else {
            throw new Error(response.statusText);
        }

    } catch (error) {
        console.error(error);
        formSendResult.textContent = 'Анкета не отправлена! Попробуйте позже.';
        formSendResult.style.color = 'red';

    } finally {
        formBtn.textContent = 'Отправить';
    }
})

// const modelController2 = ({ modal, btnOpen, btnClose, }) => {
//     const buttonElems = document.querySelectorAll(btnOpen);
//     const modalElem = document.querySelector(modal);
    
//     // modalElem.style.cssText = `
//     // display: blok;
//     // visibility: hidden;
//     // opacity: 0;
//     // transition: opacity 300ms ease-in-out;
//     // `;
  
//     const closeModal = (event) => {
//         const { target } = event;
//         if (
//         target === modalElem ||
//         target.closest(btnClose)
//         ) {
//         modalElem.style.opacity = 0;
//         setTimeout(() => {
//             // modalElem.style.visibility = 'hidden';
//             modalElem.style.display = 'none';
//         }, 300);
//         }
//     };

//     const openModal = () => {
//         modalElem.style.visibility = 'visible';
//         modalElem.style.opacity = 1;
//         modalElem.style.display = 'blok';
        
//     };

//     buttonElems.forEach((btnOp) => {
//         btnOp.addEventListener('click', openModal);
//     });
//     modalElem.addEventListener('click', closeModal);
// };
// modelController2({
//     modal: '.catalog_of_services_modal_a',
//     btnOpen: '.catalog',
//     btnClose: '.catalog_of_services_close',
// });
// modelController2({
//     modal: '.catalog_of_services_modal_b',
//     btnOpen: '.catalog',
//     btnClose: '.catalog_of_services_close',
// });
// modelController2({
//     modal: '.catalog_of_services_modal_c',
//     btnOpen: '.catalog',
//     btnClose: '.catalog_of_services_close',
// });
// modelController2({
//     modal: '.catalog_of_services_modal4',
//     btnOpen: '.catalog4',
//     btnClose: '.catalog_of_services_close',
// });
// modelController2({
//     modal: '.catalog_of_services_modal5',
//     btnOpen: '.catalog5',
//     btnClose: '.catalog_of_services_close',
// });
// modelController2({
//     modal: '.catalog_of_services_modal6',
//     btnOpen: '.catalog6',
//     btnClose: '.catalog_of_services_close',
// });   
// modelController2({
//     modal: '.catalog_of_services_modal7',
//     btnOpen: '.catalog7',
//     btnClose: '.catalog_of_services_close',
// });
// modelController2({
//     modal: '.catalog_of_services_modal8',
//     btnOpen: '.catalog8',
//     btnClose: '.catalog_of_services_close',
// });
// modelController2({
//     modal: '.catalog_of_services_modal9',
//     btnOpen: '.catalog9',
//     btnClose: '.catalog_of_services_close',
// });

// modelController2({
//     modal: '.catalog_of_services_modal10',
//     btnOpen: '.catalog10',
//     btnClose: '.catalog_of_services_close',
// });
// modelController2({
//     modal: '.catalog_of_services_modal11',
//     btnOpen: '.catalog11',
//     btnClose: '.catalog_of_services_close',
// });
// modelController2({
//     modal: '.catalog_of_services_modal12',
//     btnOpen: '.catalog12',
//     btnClose: '.catalog_of_services_close',
// });

// let time = 2,
// cc = 1;
// $(window).scroll(function() {
// $('#counter15').each(function() {
//   var
//     cPos = $(this).offset().top,
//     topWindow = $(window).scrollTop();
//   if (cPos < topWindow + 200) {
//     if (cc < 2) {
//       $(".number").addClass("viz");
//       $('div').each(function() {
//         var
//           i = 1,
//           num = $(this).data('num'),
//           step = 1000 * time / num,
//           that = $(this),
//           int = setInterval(function() {
//             if (i <= num) {
//               that.html(i);
//             } else {
//               cc = cc + 2;
//               clearInterval(int);
//             }
//             i++;
//           }, step);
//       });
//     }
//   }
// });
// });

// const TELEGRAM_BOT_TOKEN1 = '6650284780:AAEou1P0YrFf-bOJG13SOPeLn8bx0suPXEI';
// const TELEGRAM_CHAT_ID1 = '-1001677029352';
// const API1 = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN1}/sendMessage`

// document.getElementById('but').addEventListener('click',
// async function sendEmailTelegram2(event) {
//     event.preventDefault();
//     const formSendResult = document.querySelector('.textarea__send-result');
//     let a = document.getElementById('comment_text').value;
//     const text = `Отзыв с сайта!\n${a}!`;
//     console.log(text)
//     try {
//             const response = await fetch(API1, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     chat_id: TELEGRAM_CHAT_ID1,
//                     text,
//                 })
//             })
//             if (response.ok) {
//                 formSendResult.style.cssText = `
//                 display: flex;
//                 visibility: visible;
//                 opacity: 1;
//                 `;
//                 formSendResult.textContent = 'Спасибо за ваш отзыв! Как только отзыв пройдет проверку, он будет опубликован!';
//                 setTimeout(() => formSendResult.style.display = 'none', 3000);
                
//                 // a = ' ';
//                 // a.reset()
//             } else {
//                 throw new Error(response.statusText);
//             }
    
//         } catch (error) {
//             console.error(error);
//             formSendResult.textContent = 'Отзыв не отправлен! Попробуйте позже.';
//             formSendResult.style.color = 'red';
    
//         } finally {
//             console.log("отправлен")
//         }
// });


// addEventListener('submit2', 
// async function sendEmailTelegram2(event) {
//     event.preventDefault();

//     const form = event.target;
//     console.log(form)
//     // const formBtn = document.querySelector('.ftextarea_submit_blok')
//     // const formSendResult = document.querySelector('.textarea__send-result')
//     // formSendResult.textContent = '';

//     // let text = document.querySelector('.textarea_comements_blok')
//     const {comment_text} = Object.fromEntries(new FormData(form).entries());
//     const text = `Отзыв с сайта!\nотзыв:${comment_text}!`;
//     console.log(text)
 
    // try {
    //     formBtn.textContent = 'Loading...';

    //     const response = await fetch(API1, {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             chat_id: TELEGRAM_CHAT_ID1,
    //             text,
    //         })
    //     })
        
    //     if (response.ok) {
    //         formSendResult.style.cssText = `
    //             display: flex;
    //             visibility: hidden;
    //             opacity: 0;
    //             transition: opacity 300ms ease-in-out;
    //         `;
    //         formSendResult.textContent = 'Спасибо за ваш отзыв! Как только отзыв пройдет проверку, он будет опубликован!';
    //         setTimeout(() => modalElem_result.style.display = 'none', 3000);
            
    //         form.reset()
    //     } else {
    //         throw new Error(response.statusText);
    //     }

    // } catch (error) {
    //     console.error(error);
    //     formSendResult.textContent = 'Отзыв не отправлен! Попробуйте позже.';
    //     formSendResult.style.color = 'red';

    // } finally {
    //     formBtn.textContent = 'Отправить';
    // }
// })

// const tim = 4000;
// const step = 1;

// function outNum(num, elem){
//     let l = document.querySelector(elem);
//     n = 0;
//     let t = Math.round(tim/(num/step));
//     let interval = setInterval(() => {
//         n = n + step;
//         if (n == num) {
//             clearInterval(interval)
//         }
//         l.innerHTML = n
//     },
//         t);
// }
// outNum(15, '#out-1');
// outNum(23, '#out-2');
// outNum(4, '#out-3');
// let form = document.querySelector('.form_body');
// let Service = form.querySelector('.Service');
// let Data = form.querySelector('.Dat');
// let Time = form.querySelector('.Tm');
// let NameClass = form.querySelector('.name_req');
// let City = form.querySelector('.sity_req');
// let Phone = form.querySelector('.phone_req');

// const TOKEN = "5756450089:AAHvxRuBQjuTez7CbSAL5DFCPEwMmo7lZXg";
// const CHAT_ID = "-1001881302219";
// const URI_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;


// document.getElementById('form').addEventListener('submit', function(e) {
    
// async function sendFormTelegram (event){
// event.preventDefault();

// const form = event.target;


//     const text = `Заявка с сайта!\n
//     услуга: ${Service.value}\n
//     дата: ${Data.value}\n
//     время: ${Time.value}\n
//     ФИО:  ${NameClass.value}\n
//     Город: <b> ${City.value}\n
//     Телефон: ${Phone.value}
//     `;

    // let message = `<b>Заяка с сайта!<b>\n`;
    // // message += `<b> Отправитель:</b> ${this.name.value}`;
    // message += `<b>услуга: <b> ${Service.value}\n`;
    // message += `<b>дата: <b> ${Data.value}\n`;
    // message += `<b>время: <b> ${Time.value}\n`;
    // message += `<b>ФИО: <b> ${NameClass.value}\n`;
    // message += `<b>Город: <b> ${City.value}\n`;
    // message += `<b>Телефон: <b> ${Phone.value}\n`;
    // console.log(message)
    // try {

    // const response = await fetch(URI_API, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         chat_id: CHAT_ID,
    //         text,
    //     })
    // });
    // if (response.ok) { // если HTTP-статус в диапазоне 200-299
    //     // получаем тело ответа (см. про этот метод ниже)
    //     Service.value = "";
    //     Data.value = ""
    //     Time.value = ""
    //     NameClass.value = ""
    //     City.value = ""
    //     Phone.value = ""
    //     console.log('отправлено')
    //   } else {
    //     throw new Error(response.statusText)
    //   }

    // } catch (error) {
    //     console.log(error)
    //     console.log("ошибка")
    // } finally {
    //     console.log("ok")
    // }
    
    // axios.post(URI_API,{
    //     chat_id: CHAT_ID,
    //     parse_mode: 'html',
    //     text: message
    // })
//     fetch('http://example.com/movies.json')
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });
    // .then((res) => {
    //     Service.value = "";
    //     Data.value = ""
    //     Time.value = ""
    //     NameClass.value = ""
    //     City.value = ""
    //     Phone.value = ""
    //     console.log('отправлено')
    // })
    // .catch((err) =>{
    //     console.warn(err)

    // })
    // .finally(() => [
    //     console.log('спасибо')
    // ])
// })
//   console.log('услуга: ', Service.value);
//   console.log('дата: ', Data.value);
//   console.log('время: ', Time.value);
//   console.log('ФИО: ', NameClass.value);
//   console.log('Город: ', City.value);
//   console.log('Телефон: ', Phone.value);

//   const currentDate = new Date().toISOString().slice(0, 10);// текущая дата (обрезанная до год-месяц-день)
  
//   const Phone_Error = /^((8|\+7)[\-]?)?(\(?\d{3}\)?[\-]?)?[\d\-]{7,10}$/;

//   let ErrorBlok = form.querySelectorAll('.form_item');

//   if(Data.value < currentDate) {
//     ErrorBlok[1].style.cssText = `
//     box-shadow: 0 0 15px red
//     `;
//   }
//   if(NameClass.value.length <= 0){
//     ErrorBlok[3].style.cssText = `
//     box-shadow: 0 0 15px red
//     `;
//   }
//   if(City.value.length <= 0){
//     ErrorBlok[4].style.cssText = `
//     box-shadow: 0 0 15px red
//     `;
//   }
//   if((Phone.value.length <= 0)){
//     ErrorBlok[5].style.cssText = `
//     box-shadow: 0 0 15px red
//     `;
//   }
//   if((Phone.value.length > 0)){
//     if(Phone_Error.test(Phone.value) === false){
//     ErrorBlok[5].style.cssText = `
//     box-shadow: 0 0 15px red
//     `;
//   }
//   }




// })

// document.addEventListener('DOMContentLoaded', function(){
//     const form = document.getElementById('form');
//     form.addEventListener('submit', formSend);

//     async function formSend(e) {
//         e.preventDefault();

//         let error = formVelidate(form);
//     }
    
//     function formVelidate(form) {
//         let error = 0;
//         let formReq = document.querySelectorAll('._req')

//         for (let index = 0; index < formReq.length; index++) {
//             const input = formReq[index];
//             formRemoveError(input);

//             if(input.classList.contains('._phone')){
//                 if(phoneTest(input)){
//                 formAddError(input);
//                 error++;
//                 }
//             }else if (input.classList.contains('._dat')){
//                 if(validDate(input)) {
//                 formAddError(input);
//                 error++
//             }else if (input.value === '') {
//                 function formAddError(input)
//                 error++
//                 }
                
//             } 
            
//         }
//     }
//     function formAddError(input) {
//         input.parentElement.classList.add('._error');
//         input.classList.classList.add('._error');
//     }
//     function formRemoveError(input) {
//         input.parentElement.classList.remove('._error');
//         input.classList.classList.remove('._error');
//     }
//     function phoneTest(input){
//         return /^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value);
//     }
//     function validDate(input) {
//         const inputDate = new Date(document.getElementById('formData').value).toISOString().slice(0, 10); // введенная дата (обрезанная до год-месяц-день)
//         const currentDate = new Date().toISOString().slice(0, 10); // текущая дата (обрезанная до год-месяц-день)
//         return (inputDate > currentDate) // возвращаем true или false
//       }

// });

