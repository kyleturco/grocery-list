jQuery(document).ready(function($) {
  // Sets up FB ref
  const ref = new Firebase('https://turco-groceries.firebaseio.com/groceries/')

  // DOM elements
  const $grocerySubmit = $('.grocery-submit')
  const $groceryInput = $('#add-grocery-input')
  const $singleGrocery = $('.single-grocery-item')
  const $deleteBtn = $('.delete-btn')
  const $document = $(document)

  const deleteBtn = '<div class="btn delete-btn"><i class="fa fa-times-circle" aria-hidden="true"></i></div>'

  function render() {
    $singleGrocery.empty()

    ref.once('value', function(allGroceriesSnapshot) {
      allGroceriesSnapshot.forEach(function(grocerySnapshot) {
        const key = grocerySnapshot.key()
        const item = grocerySnapshot.child("groceryItem").val()
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
    const groceryFbKey = $(e.currentTarget).parent().attr('class').split(' ').slice(1)
    const groceryItemRef = new Firebase(ref + '/' + groceryFbKey)
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
