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

// Saves the grocery item to Firebase
// Calls the function to display it on the page
$('.grocery-submit').on('click', function() {
  if ($('#add-grocery-input').val().length == 0) {
    toastr["error"]("Error: Please enter a grocery item")
  } else {
    var input = $('#add-grocery-input').val();
    var newInput = input.charAt(0).toUpperCase() + input.slice(1);
    ref.push({
      item: newInput,
    });
    $('#add-grocery-input').val('');
    $('.single-grocery-item').append("<div>" + newInput + "</div>");  }
});


// Adds the grocery items to the page
window.onload = function() {
  ref.once("value", function(allGroceriesSnapshot) {
    allGroceriesSnapshot.forEach(function(grocerySnapshot) {
      var key = grocerySnapshot.key();
      var item = grocerySnapshot.child("item").val();
      $('.single-grocery-item').append("<div>" + item + "</div>");
    })
  });
}
