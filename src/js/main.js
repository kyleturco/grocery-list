toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

var ref = new Firebase('https://turco-groceries.firebaseio.com/groceries');

$('.grocery-submit').on('click', function() {
  if ($('#add-grocery-input').val().length == 0) {
    toastr["error"]("Error: Please enter a grocery item")
  } else {
    ref.push({
      item: $('#add-grocery-input').val(),
    });
    $('#add-grocery-input').val('');
  }
});

// var itemDisplay = $('#single-grocery-text');
// var itemInput = $('#add-grocery-input');
// var submitBtn = $('.grocery-submit');

ref.once("value", function(allGroceriesSnapshot) {
  allGroceriesSnapshot.forEach(function(grocerySnapshot) {
    var key = grocerySnapshot.key();
    var item = grocerySnapshot.child("item").val();
    console.log(item);
    $('.single-grocery-item').append("<div>" + item + "</div>");
  })
});
