var ref = 'https://turco-groceries.firebaseio.com/';

$('.btn-default').on('click', function () {
  ref.push({
    item: $('.add-grocery').val()
  });
  $('.add-grocery').val('');
  console.log("this shit worked");
});
