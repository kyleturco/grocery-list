jQuery(document).ready(function($) {
  // Sets up FB ref
  const ref = new Firebase('https://turco-groceries.firebaseio.com/groceries/')

  // DOM elements
  const $document = $(document)
  const $grocerySubmit = $('.grocery-submit')
  const $groceryInput = $('#add-grocery-input')
  const $singleGrocery = $('.single-grocery-item')
  const $completeBtn = $('.complete-btn')
  const $resetBtn =   $('.reset-list-btn')

  const renderCompleteBtn = '<div class="btn complete-btn"><i class="fa fa-circle-o" aria-hidden="true"></i></div>'

  function render() {
    $singleGrocery.empty()

    ref.once('value', function(allGroceriesSnapshot) {
      allGroceriesSnapshot.forEach(function(grocerySnapshot) {
        const key = grocerySnapshot.key()
        const item = grocerySnapshot.child("groceryItem").val()
        $singleGrocery.append(
          '<div class="grocery-item ' + key + '">' +
          '<p class="grocery-name">' + item + '</p>' +
          renderCompleteBtn + '</div>')
      })
    })
  }

  // click handlers
  $grocerySubmit.on('click', addGroceryItem)
  $document.on('click', '.complete-btn', function(e) {
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

  function updateGroceryData(e) {
    const groceryFbKey = $(e.currentTarget).parent().attr('class').split(' ').slice(1)
    const groceryItemRef = new Firebase(ref + '/' + groceryFbKey)
    groceryItemRef.update({
      isComplete: true
    })
    completeGroceryItem(e)
  }

  function completeGroceryItem(e) {
    $(e.currentTarget).parent().addClass('completed')
    $(e.currentTarget).children().attr('class', 'fa fa-check-circle')
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
