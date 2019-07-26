'use strict';
import { data } from './data.js';

function makeProductItem($template, product) {
    $template.querySelector('.win').setAttribute('productId', product.id);
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

function dataItem(id) {
    return data[id];
}

function getProductItem(item) {
    return {
        id: item.id,
        price:item.price,
        name:item.name,
        picture:"images/"+item.picture[0]
	}    
}

function initStorage() {
    window.localStorage.getItem("basket") ?
      window.localStorage.getItem("basket") :
      window.localStorage.setItem("basket",JSON.stringify([]));
}

function openCart(shoppingCart) {
    showCart(shoppingCart);
    document.getElementById('sidebar').classList.add('active');
    document.querySelector('.overlay').classList.add('active');
}

function closeCart() {
    document.getElementById('sidebar').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
}


function getProducts() {
    return JSON.parse(window.localStorage.getItem("basket"));
}

class Product {
    constructor(id, name, price, picture, amount){
          this.id = id;
          this.name = name;
          this.price = price;
          this.picture = picture;
          this.amount = amount;
    }
}

function saveCart(prod) {
    let tmpProducts = getProducts();
    console.log(tmpProducts);
    tmpProducts.push(new Product(prod.id,prod.name,prod.price,prod.picture,1));
    window.localStorage.setItem("basket",JSON.stringify(tmpProducts));
}

function addProduct(prod){
    let tmpProducts = getProducts();

    if(tmpProducts.length > 0){
      let exist = tmpProducts.some(elem => {
        return elem.id === prod.id;
      });
      if(exist){
        tmpProducts.forEach(elem => {
            if(elem.id === prod.id){
              elem.amount += 1;
            }
        })
      }else{
        tmpProducts.push(new Product(prod.id,prod.name,prod.price,prod.picture,1));
      }
    }
    else{
      tmpProducts.push(new Product(prod.id,prod.name,prod.price,prod.picture,1));
    }
    window.localStorage.setItem("basket",JSON.stringify(tmpProducts));

}

function plusProduct(id){
    let tmpProducts = getProducts();
    tmpProducts.forEach(elem => {
        if(elem.id === +(id)){
          elem.amount += 1;
        }
    });
    window.localStorage.setItem("basket",JSON.stringify(tmpProducts));
}

function minusProduct(id){
    let tmpProducts = getProducts();
    tmpProducts.forEach(elem => {
        if(elem.id === +(id)){
          elem.amount -= 1;
        }
    });
    window.localStorage.setItem("basket",JSON.stringify(tmpProducts));
}

function removeProduct(index){
    let tmpProducts = getProducts();
    tmpProducts.splice(tmpProducts.indexOf(tmpProducts.find(x => x.id === +(index))), 1);
    window.localStorage.setItem("basket",JSON.stringify(tmpProducts));
}

function productInCart(content, item) {
    content.querySelector('.cart-item').setAttribute('id', item.id);
    content.querySelector('.item-title').textContent = item.name;
    content.querySelector('.item-price').textContent = item.price;
    content.querySelector('.quontity').textContent = item.amount;
    
    content.querySelector('.item-price').setAttribute(            'price', item.price);
    content.querySelector('.item-img').style.backgroundImage= 'url('+ item.picture+")";

    content.querySelector('.item-price'
    ).innerText = parseFloat(item.price * item.amount).toFixed(2);

    return content;
}

function updateTotal() {
    var quantities = 0,
    total = 0,
    $cartTotal = document.querySelector('.cart-total span'),
    items = document.querySelector('.cart-items').children;
    Array.from(items).forEach(function (item) {
        total += parseFloat(item.querySelector('.item-price').textContent);
    });
    $cartTotal.textContent = parseFloat(Math.round(total * 100) / 100).toFixed(2);
}
function showCart() {
    let shoppingCart = getProducts();
    if (shoppingCart.length == 0) {
        console.log("Your Shopping Cart is Empty!");
        return;
    }
    document.querySelector(".cart-items").innerHTML = '';
    shoppingCart.forEach(function (item) {
        let template = document.getElementById("cartItem").content;
        productInCart(template, item);
        
        document.querySelector(".cart-items").append(document.importNode(productInCart(template, item), true));

    });
    updateTotal();
}


(function() {

    initStorage();
    
    if (localStorage.basket) {
        console.log("It's basket storage");
    }

    document
        .querySelector('#dismiss, .overlay')
        .addEventListener('click', () => closeCart());

    document
        .getElementById('sidebarCollapse')
        .addEventListener('click', () => openCart());

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
                let index = e.target.closest('.cart-item').getAttribute('id');
                removeProduct(index);
                e.target.parentNode.parentNode.remove();
                updateTotal();
            }
            if (e.target && e.target.matches('.plus')) {
                let el = e.target;
                let price = parseFloat(
                    el.parentNode.nextElementSibling
                        .querySelector('.item-price')
                        .getAttribute('price')
                );

                let id = el.closest('.cart-item').getAttribute('id');
                plusProduct(id);
                let val = parseInt(el.previousElementSibling.innerText);
                val = el.previousElementSibling.innerText = val + 1;
                
                el.parentNode.nextElementSibling.querySelector(
                    '.item-price'
                ).innerText = parseFloat(price * val).toFixed(2);
                updateTotal();
            }

            if (e.target && e.target.matches('.minus')) {
                let el = e.target;
                let price = parseFloat(
                    el.parentNode.nextElementSibling
                        .querySelector('.item-price')
                        .getAttribute('price')
                );
                
                let val = parseInt(el.nextElementSibling.innerText);
                let id = el.closest('.cart-item').getAttribute('id');
                if (val > 1) {
                    minusProduct(id);
                    val = el.nextElementSibling.innerText = val - 1;
                }
                el.parentNode.nextElementSibling.querySelector(
                    '.item-price'
                ).innerText = parseFloat(price * val).toFixed(2);
                updateTotal();
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
            // saveCart(getProductItem(dataItem(this.closest('.card').querySelector('.win').getAttribute("productId"))));
            // console.log(dataItem(this.closest('.card').querySelector('.win').getAttribute("productId")));
            
            addProduct(getProductItem(dataItem(this.closest('.card').querySelector('.win').getAttribute("productId"))));

            let imgItem = this.closest('.card').querySelector('img');
            let win = this.closest('.card').querySelector('.win');

            if (imgItem) {
                let imgClone = imgItem.cloneNode(true);
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
            }
        });
    });

    // =================Очистка всего хранилища================
    document.querySelector('.clear-cart').addEventListener('click', () => {
        localStorage.removeItem('basket');
        initStorage();
        document.querySelector('.cart-items').innerHTML = '';
        updateTotal();
    });

})();
