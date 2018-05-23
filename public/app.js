$(document).ready(() => {
  // $.ajax('/article.html', {
  //   success: function(htmlData, status) {
  //     // Find some DOM element and the html to it.
  //     $('body').append(htmlData);
  //   }
  // });

  function htmlForProduct(product) {
    let html = `<li><span>${product.name}</span> - <span>${product.price}</span></li>`
    return html;
  }

  // function htmlForProduct(product) {
  //   let $li =  $('<li>');
  //   let $name = $('<span>').text(product.name);
  //   let $price = $('<span>').text(product.price);

  //   $li.append($name)
  //   $li.append($price)

  //   return $li;
  // }

  // Render the list of products
  $.ajax('/products').done(function(products) {
    // 1. Iterate through the products
    for (productId in products) {
      let product = products[productId];

      // 2. Make a <li> for each product object
      let html = htmlForProduct(product)

      // 3. Append each of the <li> to the <ul>
      $('#products').append(html);
    }
  });

  // Setup AJAX on the form
  $('form').on('submit', function(e) {
    e.preventDefault();

    // 1. Get the data
    let data = $(this).serialize();
    console.log(data);

    // 2. Send the data to the server using AJAX
    $.ajax('/products', { method: 'POST', data: data }).done(function(product) {
      // 3. Render base on the response we get back
      let html = htmlForProduct(product);
      $('#products').append(html);

      // 4. Clear the form
      $('input[name="name"]').val('');
      $('input[name="price"]').val('');
    })
  })
});