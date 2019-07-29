import $ from "jquery";

function makeProductItem($template, product) {
    $template.find('.win').attr('productId', product.id);
    $template.find('.product-name').text(product.name);
    $template
        .find('.card-img-top')
        .attr('src', 'images/' + product.picture[0]);
    $template.find('img').attr('alt', product.name);
    $template.find('.product-price').text(product.price);
    return $template;
}

function slideItem(content, item, i) {
    content.find('.carousel-item__title').text(item.name);
    content.find('.carousel-item__subtitle').text(item.subtitle[i]);

    content.find('.carousel-item__description').text(item.description);

    content.find('.carousel-item__image').css('background-image',
        'url(images/' + item.picture[i] + ')');
    return content;
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
    $('#sidebar').addClass('active');
    $('.overlay').addClass('active');
}

function closeCart() {
    $('#sidebar').removeClass('active');
    $('.overlay').removeClass('active');
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

function productInCart(content, item) {
    content.find('.cart-item').attr('id', item.id);
    content.find('.item-title').text(item.name);
    content.find('.item-price').text(item.price);
    content.find('.quontity').text(item.amount);
    content.find('.item-price').attr('price', item.price);
    content.find('.item-img').css('background-image', 'url('+ item.picture+")");
    content.find('.item-price'
    ).text(parseFloat(item.price * item.amount).toFixed(2));
    return content;
}

function updateTotal() {
    var total = 0,
    $cartTotal = $('.cart-total span'),
    items = $('.cart-items');
    items.each(function (i, item) {
        total += parseFloat($(item).find('.item-price').text());
    });
    $cartTotal.text(parseFloat(Math.round(total * 100) / 100).toFixed(2));
}

function showCart() {
    let shoppingCart = getProducts();
    if (shoppingCart.length == 0) {
        console.log("Your Shopping Cart is Empty!");
        return;
    }
    $(".cart-items").empty();
    shoppingCart.forEach(function (item) {
        let template = $($('#cartItem').html())
        $(".cart-items").append(productInCart(template, item));
    });
    updateTotal();
}

function addProductToCart(content, item){
    content.find('.item-title').text(item.find(".product-name").text());
    content.find('.item-price').text(item.find(".product-price").text());
    content.find('.item-price').attr('price', item.find(".product-price").text());
    content.find('.item-img').css('background-image', "url("+item.find("img").attr('src')+")");
    
    content.find(".remove-item").on('click', function() {
        $(this).parents('.cart-item').remove();
    });

    content.find(".minus").on('click', function() {
        let price = parseFloat($(this).parent().siblings().find('.item-price').attr('price'));
        var val = parseInt($(this).siblings('.quontity').text());
        if (val > 1) {
            $(this).siblings('.quontity').text(--val);
        }
        $(this).parent().siblings().find('.item-price').text(parseFloat(price*val).toFixed(2));
    });
    
    content.find(".plus").on('click', function() {
        let price = parseFloat($(this).parent().siblings().find('.item-price').attr('price'));
        var val = parseInt($(this).siblings('.quontity').text());
        $(this).siblings('.quontity').text(++val);
        $(this).parent().siblings().find('.item-price').text(parseFloat(price*val).toFixed(2));
    });

    return content;
}

// var url = 'https://api.myjson.com/bins/gnf45';
const url = 'https://my-json-server.typicode.com/couchjanus/db/products';
$(function () {
    initStorage();

    $('#dismiss, .overlay').on('click',  () => closeCart());
    $('#sidebarCollapse').on('click',  () => openCart());

    var template = $($('#productItem').html());
    
    $.ajax({
        url: url,
        method: 'GET'
    }).then(
        function(data) {
        // console.log(data);
        for (let el of data) {
            $('.showcase')
                .append(makeProductItem(template.clone(), el));
        };

        $(".view-detail").each(function (index, element) {
            $(element).on('click', function () {
                // console.log($(this).attr('data-productId'));
                let dataId = $(this).attr('data-productId');
                let dataItem = data[dataId];
                let carouselItem = $($('#carouselItem').html());

                let detailTemplate = $($('#productDetail').html());

                for (let i = 0; i < dataItem.picture.length; i++) {
                    detailTemplate
                        .find('.carousel-detail')
                        .append(slideItem(carouselItem.clone(), dataItem, i)
                        );
                }
                
                $(".showcase").empty();
                $(".showcase").append(detailTemplate);
                $('.carousel-detail-item').eq(0).addClass('active-slide');

                var total = $('.carousel-detail-item').length;
                var current = 0;

                $('#moveRight').on('click', function () {
                    var next = current;
                    current = current + 1;
                    setSlide(next, current);
                });

                $('#moveLeft').on('click', function () {
                    var prev = current;
                    current = current - 1;
                    setSlide(prev, current);
                });

                function setSlide(prev, next) {
                    var slide = current;
                    if (next > total - 1) {
                        slide = 0;
                        current = 0;
                    }
                    if (next < 0) {
                        slide = total - 1;
                        current = total - 1;
                    }
                    $('.carousel-detail-item').eq(prev).removeClass('active-slide');
                    $('.carousel-detail-item').eq(slide).addClass('active-slide');
                }
            });
        });
        const $template = $($('#cartItem').html());
        
        $(".add-to-cart").each(function(index, element){
            $(element).on('click', function () {
            let id = $(this).closest('.card').find('.win').attr("productId");
           
            fetch(url+"/"+id).then(
                (response) => {
                   response.json().then( 
                       (data) => {
                        addProduct(getProductItem(data));
                       })
            });

                var imgItem = $(this).parents('.card').find('img');
                if (imgItem) {
                    var imgClone = imgItem.clone()
                        .offset({
                            top: imgItem.offset().top,
                            left: imgItem.offset().left
                        })
                        .css({
                            'opacity': '0.5',
                            'position': 'absolute',
                            'height': '150px',
                            'width': '150px',
                            'z-index': '100'
                        })
                        .appendTo($('body'))
                        .animate({
                            'top': $('#sidebarCollapse').offset().top + 10,
                            'left': $('#sidebarCollapse').offset().left + 10,
                            'width': 75,
                            'height': 75
                        }, 1000);

                    imgClone.animate({
                        'width': 0,
                        'height': 0
                    }, function () {
                        $(this).detach()
                    });
                }
                imgItem.css('transform','rotateY(180deg)');
                $(this).parents('.card').find('.win').fadeToggle(1000);

                imgItem.delay(3000).queue(function () {
                    $(this).css({
                        'transform': 'rotateY(0deg)'
                    }).dequeue();
                    $(this).parents('.card').find('.win').fadeOut(1000);
                });
            });
        });
    });  
});