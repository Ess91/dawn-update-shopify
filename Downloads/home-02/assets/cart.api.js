/* override functions api.jquery.js */
Shopify.onItemAdded = function(line_item) {
  Shopify.getCart();
};

Shopify.onCartUpdate = function(cart) {
  Shopify.cartUpdateInfo(cart, '.cart-item-loop');
};

Shopify.cartUpdateInfo = function(cart, cart_cell_id) {
  var formatMoney = "<span class='money'></span>";
  if ((typeof cart_cell_id) === 'string') {
    var cart_cell = jQuery(cart_cell_id);
    if (cart_cell.length) {

      cart_cell.empty();

      jQuery.each(cart, function(key, value) {

        if (key === 'items') {
      
          if (value.length) {
            jQuery(".cart-item-loop, .cart-item-title, .subtotal-title-area").css({"display": "block"});
            jQuery(".cart-tempty-title").css({"display": "none"});
            
            var table = jQuery(cart_cell_id);
            jQuery.each(value, function(i, item) {
              if(i > 19){
                  return false;
              }
              jQuery('<li class="cart-item"><div class="cart-image"><a href="' + item.url + '"><img src="' + item.image + '" alt="" class="img-fluid"></a></div><div class="cart-title"><a href="' + item.url + '">' + item.title.substring(0, 50) +'</a><div class="cart-pro-info"><span class="quantity">' + item.quantity + ' × </span><span class="new-price">' + Shopify.formatMoney(item.price, "") + '</span></div></div><a class="remove_from_cart" href="javascript:void(0);" onclick="Shopify.removeItem(' + item.variant_id + ')">×</a></li>').appendTo(table);
              
            });
          }
          else {
            jQuery(".cart-item-loop, .cart-item-title, .subtotal-title-area").css({"display": "none"});
      jQuery(".cart-tempty-title").css({"display": "block"});
          }
        }
      });
    }
  }
  
  jQuery(".subtotal-price").html(Shopify.formatMoney(cart.total_price, ""));
  jQuery(".bigcounter").html(cart.item_count);

  jQuery('.currency .active').trigger('click');
}

//Utils
function changeHtmlValue (cell, value) {
  var $cartLinkText = jQuery(cell);
  $cartLinkText.html(value);
};