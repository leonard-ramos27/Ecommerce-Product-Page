let data = { "quantity":0, "price":0.00 }

$(document).ready(function(){

    getData()

    // -- On click of the Thumbnail Images --
    $('.btn-thumbnail').click(function(){
        let imgSrc = $(this).attr("data-img-src")
        let index = $(this).attr("data-index")
        $('.product-img-lg').attr("src", imgSrc)
        $('.product-img-lg').parent().attr("data-index", index)
        $('.btn-thumbnail.selected').removeClass("selected")
        $(this).addClass("selected")
    })

    // -- On click of Product Image --
    $("button[data-bs-target='#product-lightbox']").click(function(){
        let index = $(this).attr("data-index")
        const carousel = new bootstrap.Carousel('#carouselLightbox')
        carousel.to(index)
    })

    // -- On click of Plus Icon --
    $('#btn-add-quantity').click(function(){
        $('#txt-quantity').val(function( index, value ) {
            return parseInt(value)+1;
        })
    })

    // -- On click of Minus Icon --
    $('#btn-minus-quantity').click(function(){
        if(parseInt($('#txt-quantity').val()) > 0){
            $('#txt-quantity').val(function( index, value ) {
                return parseInt(value)-1;
            })
        }
    })

    // -- On click of Add to Cart Button --
    $('#btn-add-to-cart').click(function(){
        if(parseInt($('#txt-quantity').val()) > 0){
            data.quantity = parseInt($('#txt-quantity').val())+data.quantity
            data.price = parseFloat(data.quantity*125).toFixed(2)
            displayCart()
            $('#txt-quantity').val("0")
            updateData()
        }
    })

    // -- On click of Remove Icon --
    $('#btn-remove').click(function(){
        data.quantity = 0
        data.price = 0.00
        displayCart()
        updateData()
    })

    // -- On click of Checkout Button --
    $('.btn-checkout').click(function(){
        if(data.quantity > 0){
            data.quantity = 0
            data.price = 0.00
            displayCart()
            updateData()
            Swal.fire({
                icon: 'success',
                title: 'Checkout success!',
                text: 'Thank you for shopping with us.',
                customClass: {
                    confirmButton: 'btn-checkout px-4 text-uppercase',
                },
                allowOutsideClick: false,
            })
        }
        
    })
})


// -- Function to display added items to cart --
function displayCart(){
    if(data.quantity == 0){
        $(".cart-item").css("display", "none")
        $(".cart-checkout").css("display", "none")
        $("#btn-cart .badge").css("display", "none")
        $("#cart-dropdown .dropdown-item.empty").css("display", "block")
    }else{
        $("#cart-dropdown .dropdown-item.empty").css("display", "none")
        $("#btn-cart .badge").text(data.quantity)
        $("#btn-cart .badge").css("display", "inline-block")
        $(".cart-quantity").text(data.quantity)
        $(".cart-price").text("$"+data.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
        $(".cart-item").css("display", "block")
        $(".cart-checkout").css("display", "block")
    }
}

function getData(){
    if(localStorage.getItem('cartdata') === null){
        data.quantity = 0
        data.price = 0.00
    }else{
        data = JSON.parse(localStorage.getItem('cartdata'))
    }
    console.log(data)
    displayCart()
}

function updateData(){
    if(data !== null){
        localStorage.setItem('cartdata', JSON.stringify(data))
    }
}
