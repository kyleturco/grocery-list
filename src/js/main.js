$(document).ready(function ready() {

  var ref = new Firebase('https://turco-groceries.firebaseio.com/groceries/');

  function init() {
    loadItems();

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
      $('.single-grocery-item').append("<div id='grocery-item' data-id=''>" + deleteIcon + ' ' + newInput + "</div>");
    }
  });

  // Adds the grocery items to the page on page load
  function loadItems() {
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
    ref.once("value", function(allGroceriesSnapshot) {
      allGroceriesSnapshot.forEach(function(grocerySnapshot) {
        var key = grocerySnapshot.key();
        console.log(key);
        // ref.child(key).remove();
      })
    });
  });

  // Toastr settings
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


    //     vm.deleteIncome = function (item) {
    //       var profileRef = new Firebase('https://bankroll.firebaseio.com/profiles/' + $rootScope.auth.uid + '/income');
    //       profileRef.child(item.$id).remove(function(error){
    //         if (error) {
    //           console.log("Error;", error);
    //         } else {
    //           console.log("Removed successfully");
    //           vm.loadIncome();
    //         }
    //       });
    //     };


    // var onComplete = function(error) {
    //   if (error) {
    //     console.log('Synchronization failed');
    //   } else {
    //     console.log('Synchronization succeeded');
    //   }
    // };
    // fredRef.remove(onComplete);

  }
  init();
});
