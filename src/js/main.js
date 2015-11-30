var ref = new Firebase('https://turco-groceries.firebaseio.com/');

$('.grocery-submit').on('click', function () {
  ref.push({
    item: $('.add-grocery-input').val()
  });
  $('.add-grocery-input').val('');
});
