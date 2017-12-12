// main.js
var update = document.getElementById('update')

update.addEventListener('click', function () {
  // Send PUT Request here
fetch('hotels', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'hotel_id': '09',
    'hotel_name': 'Holiday Inn'
  })
})
fetch({ /* request */ })
.then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.log(data)
  window.location.reload(true)
})
})