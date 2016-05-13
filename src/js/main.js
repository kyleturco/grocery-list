jQuery(document).ready(function($) {

  var ref = new Firebase('https://turco-groceries.firebaseio.com/groceries/')

  var $grocerySubmit = $('.grocery-submit')
  var $groceryInput = $('#add-grocery-input')
  var $singleGrocery = $('.single-grocery-item')

  function render() {
    $singleGrocery.empty()
    
    ref.once('value', function(allGroceriesSnapshot) {
      allGroceriesSnapshot.forEach(function(grocerySnapshot) {
        var key = grocerySnapshot.key()
        var item = grocerySnapshot.child("groceryItem").val()
        $singleGrocery.append('<div>' + key + ': ' + item + '</div>')
      })
    })
  }

  function addGrocery() {
    ref.push({
      groceryItem: $groceryInput.val()
    })
    $groceryInput.val('')
    render()
  }

  $grocerySubmit.on('click', addGrocery)

  render()
})
