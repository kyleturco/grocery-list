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
    var deleteIcon = '<button id="delete-btn" class="btn btn-default"><i class="fa fa-check-circle-o"></i></button>';
    $('.single-grocery-item').append("<div id='grocery-item'>" + deleteIcon + ' ' + newInput + "</div>");
  }
});

// Adds the grocery items to the page on page load
window.onload = function() {
  ref.once("value", function(allGroceriesSnapshot) {
    allGroceriesSnapshot.forEach(function(grocerySnapshot) {
      var key = grocerySnapshot.key();
      var item = grocerySnapshot.child("item").val();
      var deleteIcon = '<button id="delete-btn" class="btn btn-default"><i class="fa fa-check-circle-o"></i></button>';
      $('.single-grocery-item').append("<div id='grocery-item'>" + deleteIcon + ' ' + item + "</div>");
    })
  });
};

// Removes an item once it's been acquired
$(document).on('click', '#delete-btn', function() {
  console.log("test test");
});
