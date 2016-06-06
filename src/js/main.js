jQuery(document).ready(function($) {
  // Sets up FB ref
  var ref = new Firebase('https://turco-groceries.firebaseio.com/groceries/')

  // DOM elements
  var $grocerySubmit = $('.grocery-submit')
  var $groceryInput = $('#add-grocery-input')
  var $singleGrocery = $('.single-grocery-item')
  var $deleteBtn = $('.delete-btn')
  var $document = $(document)

  var deleteBtn = '<div class="btn delete-btn"><i class="fa fa-times-circle" aria-hidden="true"></i></div>'

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

  // click handlers
  $grocerySubmit.on('click', addGroceryItem)
  $document.on('click', '.delete-btn', function(e) {
    removeGroceryItem(e)
  })

  function addGroceryItem() {
    ref.push({
      groceryItem: $groceryInput.val()
    })
    $groceryInput.val('')
    render()
  }

  function removeGroceryItem(e) {
    var groceryFbKey = $(e.currentTarget).parent().attr('class').split(' ').slice(1)
    var groceryItemRef = new Firebase(ref + '/' + groceryFbKey)
    groceryItemRef.remove(function(error) {
      if (error) {
        console.log("Error;", error);
      } else {
        render()
      }
    })
  }

  render()
})
