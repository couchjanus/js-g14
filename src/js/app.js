'use strict';
import { data } from './data.js';

function makeProductItem($template, product) {
    $template.querySelector('.col-md-4').setAttribute('productId', product.id);
    $template.querySelector('.product-name').textContent = product.name;
    $template
        .querySelector('.card-img-top')
        .setAttribute('src', 'images/' + product.picture[0]);
    $template.querySelector('img').setAttribute('alt', product.name);
    $template.querySelector('.product-price').textContent = product.price;
    return $template;
}

function slideItem(content, item, i) {
    content.querySelector('.carousel-item__title').textContent = item.name;
    content.querySelector('.carousel-item__subtitle').textContent =
        item.subtitle[i];

    content.querySelector('.carousel-item__description').textContent =
        item.description;

    content.querySelector('.carousel-item__image').style.backgroundImage =
        'url(images/' + item.picture[i] + ')';

    return content;
}

function addProductToCart(content, item) {
    content.querySelector('.item-title').textContent = item.querySelector(
        '.product-name'
    ).textContent;

    content.querySelector('.item-price').textContent = item.querySelector(
        '.product-price'
    ).textContent;

    content
        .querySelector('.item-price')
        .setAttribute(
            'price',
            item.querySelector('.product-price').textContent
        );

    content.querySelector('.item-img').style.backgroundImage =
        'url(' + item.querySelector('img').getAttribute('src') + ')';
    return content;
}

function _translate(img, offset=-150){
    let rect = img.getBoundingClientRect();
    let elements = ['translate3D('];
    elements.push(rect.left - offset + 'px,');
    elements.push(rect.top - offset + 'px,0)');
    return elements.join('');
}

(function() {
    document
        .querySelector('#dismiss, .overlay')
        .addEventListener('click', function() {
            document.getElementById('sidebar').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        });
    document
        .getElementById('sidebarCollapse')
        .addEventListener('click', function() {
            document.getElementById('sidebar').classList.add('active');
            document.querySelector('.overlay').classList.add('active');
        });

    const template = document.getElementById('productItem').content;

    data.forEach(function(el) {
        document
            .querySelector('.showcase')
            .append(makeProductItem(template, el).cloneNode(true));
    });

    const content = document.getElementById('cartItem').content;

    document.querySelector('.cart-items').addEventListener(
        'click',
        function(e) {
            if (e.target && e.target.matches('.remove-item')) {
                e.target.parentNode.parentNode.remove();
            }
            if (e.target && e.target.matches('.plus')) {
                let el = e.target;
                let price = parseFloat(
                    el.parentNode.nextElementSibling
                        .querySelector('.item-price')
                        .getAttribute('price')
                );
                let val = parseInt(el.previousElementSibling.innerText);
                val = el.previousElementSibling.innerText = val + 1;
                el.parentNode.nextElementSibling.querySelector(
                    '.item-price'
                ).innerText = parseFloat(price * val).toFixed(2);
            }

            if (e.target && e.target.matches('.minus')) {
                let el = e.target;
                let price = parseFloat(
                    el.parentNode.nextElementSibling
                        .querySelector('.item-price')
                        .getAttribute('price')
                );
                let val = parseInt(el.nextElementSibling.innerText);
                if (val > 1) {
                    val = el.nextElementSibling.innerText = val - 1;
                }
                el.parentNode.nextElementSibling.querySelector(
                    '.item-price'
                ).innerText = parseFloat(price * val).toFixed(2);
            }
        },
        false
    );

    const viewDetails = document.querySelectorAll('.view-detail');

    viewDetails.forEach(function(element) {
        element.addEventListener('click', function() {
            let dataId = this.closest('.col-md-4').getAttribute('productId');
            let dataItem = data[dataId];

            let carouselItem = document.getElementById('carouselItem').content;

            let detailTemplate = document.getElementById('productDetail')
                .content;

            for (let i = 0; i < dataItem.picture.length; i++) {
                detailTemplate
                    .querySelector('.carousel-detail')
                    .append(
                        document.importNode(
                            slideItem(carouselItem, dataItem, i),
                            true
                        )
                    );
            }

            document.querySelector('.showcase').innerHTML = '';

            document
                .querySelector('.showcase')
                .append(document.importNode(detailTemplate, true));

            document
                .querySelectorAll('.carousel-detail-item')[0]
                .classList.add('active-slide');

            var total = document.querySelectorAll('.carousel-detail-item')
                .length;

            var current = 0;

            document
                .getElementById('moveRight')
                .addEventListener('click', function() {
                    let next = current;
                    current = current + 1;
                    setSlide(next, current);
                });

            document
                .getElementById('moveLeft')
                .addEventListener('click', function() {
                    let prev = current;
                    current = current - 1;
                    setSlide(prev, current);
                });

            function setSlide(prev, next) {
                let slide = current;
                if (next > total - 1) {
                    slide = 0;
                    current = 0;
                }
                if (next < 0) {
                    slide = total - 1;
                    current = total - 1;
                }
                document
                    .querySelectorAll('.carousel-detail-item')
                    [prev].classList.remove('active-slide');
                document
                    .querySelectorAll('.carousel-detail-item')
                    [slide].classList.add('active-slide');
            }
        });
    });

    let addToCarts = document.querySelectorAll('.add-to-cart');

    addToCarts.forEach(function(addToCart) {
        addToCart.addEventListener('click', function() {
            document
                .querySelector('.cart-items')
                .append(
                    document.importNode(
                        addProductToCart(content, this.closest('.card')),
                        true
                    )
                );

            let imgItem = this.closest('.card').querySelector('img');
            let win = this.closest('.card').querySelector('.win');

            // let rectOrigin = imgItem.getBoundingClientRect();
            // let toLeftStart = rectOrigin.left + 'px';
            // let toTopStart = rectOrigin.top + 'px';
            // console.log(toLeftStart, toTopStart);

            if (imgItem) {
                let imgClone = imgItem.cloneNode(true);

                // imgClone.style.left = 0;
                // imgClone.style.top = 0;
                // imgClone.style.height = '150px';
                // imgClone.style.width = '150px';

                imgClone.classList.add('offset-img');

                document.body.appendChild(imgClone);

                imgItem.style.transform = 'rotateY(180deg)';
                win.style.display = 'block';

                imgClone.animate([{
                    transform: _translate(imgItem)
                    },
                    {
                        transform: _translate(document.querySelector('#sidebarCollapse'), 50) + 'perspective(500px) scale3d(0.1, 0.1, 0.2)'
                    },
                ], {
                    duration: 2000,
                })
                .onfinish = function() {
                    imgClone.remove();
                    imgItem.style.transform = 'rotateY(0deg)';
                    win.style.display = 'none';
                };

                // let rect = document
                //     .querySelector('#sidebarCollapse')
                //     .getBoundingClientRect();
                // let toLeft = rect.left - 50 + 'px';
                // let toTop = rect.top - 50 + 'px';
                // imgClone.animate(
                //     [
                //         {
                //             transform:
                //                 'translate3D(' +
                //                 toLeftStart +
                //                 ',' +
                //                 toTopStart +
                //                 ', 0)',
                //         },
                //         {
                //             transform:
                //                 'translate3D(' +
                //                 toLeft +
                //                 ',' +
                //                 toTop +
                //                 ',0) perspective(500px) scale3d(0.1, 0.1, 0.2)',
                //         },
                //     ],
                //     {
                //         duration: 2000,
                //     }
                // )
                // .onfinish = function() {
                //     imgClone.remove();
                //     imgItem.style.transform = 'rotateY(0deg)';
                //     win.style.display = 'none';
                // };
            }
        });
    });
})();
