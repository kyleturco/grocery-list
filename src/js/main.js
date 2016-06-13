jQuery(document).ready(function($) {
  // Sets up FB ref
  const ref = new Firebase('https://turco-groceries.firebaseio.com/groceries/')

  // DOM elements
  const $document = $(document)
  const $grocerySubmit = $('.grocery-submit')
  const $groceryInput = $('#add-grocery-input')
  const $singleGrocery = $('.single-grocery-item')
  const $deleteBtn = $('.delete-btn')
  const $resetBtn =   $('.reset-list-btn')

  const deleteBtn = '<div class="btn delete-btn"><i class="fa fa-times-circle" aria-hidden="true"></i></div>'

  function render() {
    $singleGrocery.empty()

    ref.once('value', function(allGroceriesSnapshot) {
      allGroceriesSnapshot.forEach(function(grocerySnapshot) {
        const key = grocerySnapshot.key()
        const item = grocerySnapshot.child("groceryItem").val()
        $singleGrocery.append(
          '<div class="grocery-item ' + key + '">' +
          '<p class="grocery-name">' + item + '</p>' +
          deleteBtn + '</div>')
      })
    })
  }

  // click handlers
  $grocerySubmit.on('click', addGroceryItem)
  $document.on('click', '.delete-btn', function(e) {
    updateGroceryData(e)
  })
  $resetBtn.on('click', resetList)

  function addGroceryItem() {
    const input = $groceryInput.val()
    const newInput = input.charAt(0).toUpperCase() + input.slice(1)
    ref.push({
      groceryItem: newInput,
      isComplete: false
    })
    $groceryInput.val('')
    render()
  }

  function completeGroceryItem(e) {
    $(e.currentTarget).parent().addClass('completed')
  }

  function updateGroceryData(e) {
    const groceryFbKey = $(e.currentTarget).parent().attr('class').split(' ').slice(1)
    const groceryItemRef = new Firebase(ref + '/' + groceryFbKey)
    groceryItemRef.update({
      isComplete: true
    })
    completeGroceryItem(e)
  }

  function resetList() {
    ref.remove(function(error) {
      if (error) {
        console.log("Error;", error)
      } else {
        render()
      }
    })
  }

  render()
})
