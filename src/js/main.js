jQuery(document).ready(function($) {

  var ref = new Firebase('https://turco-groceries.firebaseio.com/groceries/')

  var $grocerySubmit = $('.grocery-submit')
  var $groceryInput = $('#add-grocery-input')
  var $singleGrocery = $('.single-grocery-item')
  var $deleteBtn = $('#delete-btn')

  var deleteBtn = '<div class="btn btn-default" id="delete-btn">X</div>'

  function render() {
    $singleGrocery.empty()

    ref.once('value', function(allGroceriesSnapshot) {
      allGroceriesSnapshot.forEach(function(grocerySnapshot) {
        var key = grocerySnapshot.key()
        var item = grocerySnapshot.child("groceryItem").val()
        $singleGrocery.append('<div class="grocery-item ' + key + '">' + item + deleteBtn + '</div>')
      })
    })
  }

  function addGrocery(ref) {
    ref.push({
      groceryItem: $groceryInput.val()
    })
    $groceryInput.val('')
    render()
  }


  $(document).on('click', '#delete-btn', function(e) {
    getFbKey(e)
  })

  function getFbKey(e) {
    console.log($(e.currentTarget).parent().attr('class'))
  }

  $grocerySubmit.on('click', addGrocery)

  render()
})
