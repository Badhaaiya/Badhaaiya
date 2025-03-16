/****Dropdown toggle ****/

$('.locality-selectbox-title').click(function () {
  $('.locality-select').slideToggle('slow')
})

$('.business-fields-selectbox-title').click(function () {
  $('.business-fields-select').slideToggle('slow')
})

$('.business-types-selectbox-title').click(function () {
  $('.business-types-select').slideToggle('slow')
})

$(document).mouseup(function (e) {
  var container = $('.selectbox')

  // if the target of the click isn't the container nor a descendant of the container

  if (!container.is(e.target) && container.has(e.target).length === 0) {
    $('.selectbox-content').slideUp()
  }

  // else{

  //     $(".locality-select").slideDown("slow");

  // }
})

//search box for localities

$('.search-box').keyup(function () {
  var valThis = $(this).val().toLowerCase()

  if (valThis == '') {
    $('#localities > li').show()
  } else {
    $('#localities > li').each(function () {
      var text = $(this).text().toLowerCase()

      text.indexOf(valThis) >= 0 ? $(this).show() : $(this).hide()
    })
  }
})

//search box for business fields

$('.search-box-fields').keyup(function () {
  var valThis = $(this).val().toLowerCase()

  if (valThis == '') {
    $('#business-fields > li').show()
  } else {
    $('#business-fields > li').each(function () {
      var text = $(this).text().toLowerCase()

      text.indexOf(valThis) >= 0 ? $(this).show() : $(this).hide()
    })
  }
})

//search box for business types

$('.search-box-types').keyup(function () {
  var valThis = $(this).val().toLowerCase()

  if (valThis == '') {
    $('business-types > li').show()
  } else {
    $('#business-types > li').each(function () {
      var text = $(this).text().toLowerCase()

      text.indexOf(valThis) >= 0 ? $(this).show() : $(this).hide()
    })
  }
})

/***Count Length of checkbox***/

var $checkboxes = $('#localities input[type="checkbox"]')

var countCheckedCheckboxes = ''

$checkboxes.change(function () {
  countCheckedCheckboxes = $checkboxes.filter(':checked').length

  $('.edit-count-checked-checkboxes').text(countCheckedCheckboxes)
})

if (countCheckedCheckboxes > 0) {
  $('.plzselect').css('display', 'none')

  $('.edit-count-checked-checkboxes').css('display', 'inline-block')

  $('.selected').css('display', 'inline-block')
} else {
  $('.plzselect').css('display', 'block')

  $('.edit-count-checked-checkboxes').css('display', 'none')

  $('.selected').css('display', 'none')
}

/* --------------------------------- 
----------------- ADD SERVICE 
------------------------------------ */

$(document).ready(function () {
  // Floor Add/Remove
  var numFloor = 0
  $('#add_floor_venue').on('click', function () {
    numFloor++
    var newFloor = ' '
    var newFloor = `
            <div id="venue-floor-${numFloor}" class="col-lg-4 mb-2 addon-service">
                <div class="form-group">
                    <h6 class="text-label">Floor ${numFloor} Price</h6>
                    <input type="number" class="form-control" placeholder="Amount" required>
                </div>
            </div>`
    $('#target_venue').append(newFloor)
  })

  $('#remove_floor_venue').on('click', function () {
    if (numFloor > 0) {
      var lastFloor = $(`#venue-floor-${numFloor}`)
      lastFloor.remove()
      numFloor--
    }
  })
  // Floor Add/Remove

  // Venue Floor Combo Add/Remove
  var numCombos1 = 0
  $('#add_floor_combo').on('click', function () {
    numCombos1++
    var newCombo1 = ' '
    var newCombo1 = `
            <div id="venue-floor-combo-${numCombos1}" class="col-lg-3 mb-0 addon-service">
                <div class="form-group">
                    <input type="text" class="form-control mb-2" placeholder="Combo Pack Title" required>
                    <input type="number" class="form-control" placeholder="Amount" required>
                </div>
            </div>`
    $('#target_floor_combo_div').append(newCombo1)
  })

  $('#remove_floor_combo').on('click', function () {
    if (numCombos1 > 0) {
      var lastCombo1 = $(`#venue-floor-combo-${numCombos1}`)
      lastCombo1.remove()
      numCombos1--
    }
  })
  // Venue Floor Combo Add/Remove

  // Venue Field Add/Remove
  var numFields1 = 0
  $('#add_field_venue').on('click', function () {
    numFields1++
    var newField1 = ' '
    var newField1 = `
            <div id="venue-field-${numFields1}" class="col-lg-3 mb-0 addon-service">
                <div class="form-group">
                    <input type="text" class="form-control mb-2" placeholder="Service Title" required>
                    <input type="number" class="form-control" placeholder="Amount" required>
                </div>
            </div>`
    $('#target_venue').append(newField1)
  })

  $('#remove_field_venue').on('click', function () {
    if (numFields1 > 0) {
      var lastField1 = $(`#venue-field-${numFields1}`)
      lastField1.remove()
      numFields1--
    }
  })
  // Venue Field Add/Remove

  // Photographer Field Add/Remove
  var numFields1 = 0
  $('#add_field_photographer').on('click', function () {
    numFields1++
    var newField1 = ' '
    var newField1 = `
            <div id="photographer-field-${numFields1}" class="col-lg-4 mb-0 addon-service">
                <div class="form-group">
                    <input type="text" class="form-control mb-2" placeholder="Service (eg. Candid Photography)" required>
                    <input type="number" name="conguration_full_dayamount[]" required="" class="form-control mb-2" placeholder="Full Day Amount" min="0">
                    <input type="number" name="conguration_half_day_amount[]" required="" class="form-control" placeholder="Half Day Amount" min="0">
                </div>
            </div>`
    $('#target_photographer').append(newField1)
  })

  $('#remove_field_photographer').on('click', function () {
    if (numFields1 > 0) {
      var lastField1 = $(`#photographer-field-${numFields1}`)
      lastField1.remove()
      numFields1--
    }
  })
  // Photographer Field Add/Remove

  // Music Field Add/Remove
  var numFields1 = 0
  $('#add_field_music').on('click', function () {
    numFields1++
    var newField1 = ' '
    var newField1 = `
            <div id="music-field-${numFields1}" class="col-lg-3 mb-0 addon-service">
                <div class="form-group">
                    <input type="text" class="form-control mb-2" placeholder="Service (eg. Party DJ)" required>
                    <input type="number" name="conguration_full_dayamount[]" required="" class="form-control mb-2" placeholder="Full Day Amount" min="0">
                    <input type="number" name="conguration_half_day_amount[]" required="" class="form-control" placeholder="Half Day Amount" min="0">
                </div>
            </div>`
    $('#target_music').append(newField1)
  })

  $('#remove_field_music').on('click', function () {
    if (numFields1 > 0) {
      var lastField1 = $(`#music-field-${numFields1}`)
      lastField1.remove()
      numFields1--
    }
  })
  // Music Field Add/Remove

  // Mehendi Field Add/Remove
  var numFields1 = 0
  $('#add_field_mehendi').on('click', function () {
    numFields1++
    var newField1 = ' '
    var newField1 = `
            <div id="mehendi-field-${numFields1}" class="col-lg-4 mb-0 addon-service">
                <div class="form-group">
                    <input type="text" class="form-control mb-2" placeholder="Service (eg. Bride Mehendi)" required>
                    <input type="number" class="form-control" placeholder="Amount" required>
                </div>
            </div>`
    $('#target_mehendi').append(newField1)
  })

  $('#remove_field_mehendi').on('click', function () {
    if (numFields1 > 0) {
      var lastField1 = $(`#mehendi-field-${numFields1}`)
      lastField1.remove()
      numFields1--
    }
  })
  // Mehendi Field Add/Remove

  // Makeup Field Add/Remove
  var numFields1 = 0
  $('#add_field_makeup').on('click', function () {
    numFields1++
    var newField1 = ' '
    var newField1 = `
            <div id="makeup-field-${numFields1}" class="col-lg-4 mb-0 addon-service">
                <div class="form-group">
                    <input type="text" class="form-control mb-2" placeholder="Service (eg. Bride Makeup)" required>
                    <input type="number" class="form-control" placeholder="Amount" required>
                </div>
            </div>`
    $('#target_makeup').append(newField1)
  })

  $('#remove_field_makeup').on('click', function () {
    if (numFields1 > 0) {
      var lastField1 = $(`#makeup-field-${numFields1}`)
      lastField1.remove()
      numFields1--
    }
  })
  // Makeup Field Add/Remove

  // Decorator Field Add/Remove
  var numFields1 = 0
  $('#add_service_decorator').on('click', function () {
    numFields1++
    var newField1 = ' '
    var newField1 = `
            <div id="decorator-service-${numFields1}" class="col-lg-4 mb-0 addon-service">
            <div class="form-group">
            <input type="text" name="dec_title[]" id="dec_title" class="form-control mb-2" placeholder="Service" required="">
            <input type="number" name="dec_amount[]" id="dec_amount" class="form-control" placeholder="Amount" min="0" max="999999" required="">
            <div class="drop-zone my-2">
                <div class="col">
                    <i class="fa fa-upload scale5"></i>
                    <span class="drop-zone__prompt fs-6">Drop file here or click to upload</span>
                    <input type="file" name="myFile" class="drop-zone__input">
                </div>
            </div>
        </div>
            </div>`
    $('#target_service_decorator').append(newField1)
  })

  $('#remove_service_decorator').on('click', function () {
    if (numFields1 > 0) {
      var lastField1 = $(`#decorator-service-${numFields1}`)
      lastField1.remove()
      numFields1--
    }
  })
  // Deorator Field Add/Remove

  // Venue Date Field Add/Remove
  var numFields1 = 0
  $('#add_date_venue').on('click', function () {
    numFields1++
    var newField1 = ' '
    var newField1 = `
            <div id="date-field-${numFields1}" class="col-lg-3 mb-0 addon-service">
                <div class="form-group">
                    <input class="form-control input-limit-datepicker" type="date" name="unavailable_dates[]">
                </div>
            </div>`
    $('#date_fields').append(newField1)
  })

  $('#remove_date_venue').on('click', function () {
    if (numFields1 > 0) {
      var lastField1 = $(`#date-field-${numFields1}`)
      lastField1.remove()
      numFields1--
    }
  })
  // Venue Date Field Add/Remove

  // Caterer Field Add/Remove
  var numFields2 = 0
  $('#add_field_caterer').on('click', function () {
    numFields2++
    var newField2 = ' '
    var newField2 = `
            <div id="caterer-field-${numFields2}" class="col-lg-12 mb-0 addon-service1">
                    <div class="form-group">
                        <select id="menu_type" class="form-control mb-2" required>
                            <option value="Veg">Veg</option>
                            <option value="Non Veg">Non Veg</option>
                            <option value="Both">Both</option>
                        </select>
                        <input type="text" class="form-control mb-2" placeholder="Item Name" required>
                        <input type="text" class="form-control" placeholder="Menu Option" required>
                    </div>
            </div>`
    $('#menu_add_modal_display').append(newField2)
  })

  $('#remove_field_caterer').on('click', function () {
    if (numFields2 > 0) {
      var lastField2 = $(`#caterer-field-${numFields2}`)
      lastField2.remove()
      numFields2--
    }
  })
  // Caterer Field Add/Remove

  // Caterer Field Add/Remove
  var numFields2 = 0
  $('#add_field_caterer').on('click', function () {
    numFields2++
    var newField2 = ' '
    var newField2 = `
            <div id="caterer-field-${numFields2}" class="col-lg-3 mb-0 addon-service1">
                    <div class="form-group">
                        <select id="menu_type" class="form-control mb-2" required>
                            <option value="Veg">Veg</option>
                            <option value="Non Veg">Non Veg</option>
                            <option value="Both">Both</option>
                        </select>
                        <input type="text" class="form-control mb-2" placeholder="Package Name" required>
                        <input type="text" class="form-control" placeholder="Price per Plate" required>
                    </div>
            </div>`
    $('#target_caterer').append(newField2)
  })

  $('#remove_field_caterer').on('click', function () {
    if (numFields2 > 0) {
      var lastField2 = $(`#caterer-field-${numFields2}`)
      lastField2.remove()
      numFields2--
    }
  })
  // Caterer Field Add/Remove

  // Caterer Date Field Add/Remove
  var numFields1 = 0
  $('#add_date_caterer').on('click', function () {
    numFields1++
    var newField1 = ' '
    var newField1 = `
            <div id="date-field-${numFields1}" class="col-lg-3 mb-0 addon-service">
                <div class="form-group">
                    <input class="form-control" type="date" name="unavailable_dates[]">
                </div>
            </div>`
    $('#date_fields_caterer').append(newField1)
  })

  $('#remove_date_caterer').on('click', function () {
    if (numFields1 > 0) {
      var lastField1 = $(`#date-field-${numFields1}`)
      lastField1.remove()
      numFields1--
    }
  })
  // Caterer Date Field Add/Remove

  // Decorator Field Add/Remove
  var i = 0
  $('#add_field_decorator').on('click', function () {
    var html = ''
    i += 1
    $.ajax({
      success: function (data) {
        html += `<div id="decorator-field-` + i
        html += `" class="col-lg-3 mb-0 addon-service">
                                <div class="form-group">
                                    <input type="text" name="dec_title[]" class="form-control mb-2" placeholder="Service Title" required>
                                    <input type="number" name="dec_amount[]" class="form-control" placeholder="Amount" required>
                                </div>
                            </div>`
        $('#target_decorator').append(html)
      }
    })
  })
  // <input type="file" name="dec_file" multiple class="form-control mb-2" placeholder="File">

  $('#remove_field_decorator').on('click', function () {
    var target3 = $('#target_decorator').find('#decorator-field-' + i)
    $(target3).remove()
    i = i - 1
  })
  // Decorator Field Add/Remove

  // Decorator Date Field Add/Remove
  var numFields1 = 0
  $('#add_date_decorator').on('click', function () {
    numFields1++
    var newField1 = ' '
    var newField1 = `
            <div id="date-field-${numFields1}" class="col-lg-3 mb-0 addon-service">
                <div class="form-group">
                    <input class="form-control input-limit-datepicker" type="date" name="unavailable_dates[]">
                </div>
            </div>`
    $('#date_fields_decorator').append(newField1)
  })

  $('#remove_date_decorator').on('click', function () {
    if (numFields1 > 0) {
      var lastField1 = $(`#date-field-${numFields1}`)
      lastField1.remove()
      numFields1--
    }
  })
  // Decorator Date Field Add/Remove

  // Other Fields Add/Remove
  var numFields3 = 0
  $('#add_field_otherservices').on('click', function () {
    numFields3++
    var newField3 = ' '
    var newField3 = `
            <div id="otherservices-field-${numFields3}" class="col-lg-3 mb-0 addon-service1">
                <div class="form-group">
                    <input type="text" name="title[]" class="form-control mb-2" placeholder="Service Title" required>
                    <input type="number" name="amount[]" class="form-control" placeholder="Amount" required>
                </div>
            </div>`
    $('#target_otherservices').append(newField3)
  })

  $('#remove_field_otherservices').on('click', function () {
    if (numFields3 > 0) {
      var lastField3 = $(`#otherservices-field-${numFields3}`)
      lastField3.remove()
      numFields3--
    }
  })
  // Other Fields Add/Remove

  // Decorator Date Field Add/Remove
  var numFields1 = 0
  $('#add_date_services').on('click', function () {
    numFields1++
    var newField1 = ' '
    var newField1 = `
            <div id="date-field-${numFields1}" class="col-lg-3 mb-0 addon-service">
                <div class="form-group">
                    <input class="form-control input-limit-datepicker" type="date" name="unavailable_dates[]">
                </div>
            </div>`
    $('#date_fields_services').append(newField1)
  })

  $('#remove_date_services').on('click', function () {
    if (numFields1 > 0) {
      var lastField1 = $(`#date-field-${numFields1}`)
      lastField1.remove()
      numFields1--
    }
  })
  // Decorator Date Field Add/Remove

  // $(".venue").hide();
  $('.caterer').hide()
  $('.decorator').hide()
  $('.photographer').hide()
  // $(".makeup").hide();
  // $(".mhendi").hide();
  $('.music').hide()
  // $(".host").hide();
  // $(".magician").hide();
  // $(".alert-danger").hide();
  // $("#menu_package").hide();
  $('#success_message').hide()

  $('#Caterer-check').change(function () {
    if (this.checked) {
      $('.caterer').show(200)
      $('#menu_package').show()
      $('#success_message').hide()
      $('.caterer :input').prop('required', true)
    } else {
      $('.caterer').hide(100)
      $('#menu_package').hide()
      $('#success_message').show()
      $('.caterer :input').removeAttr('required')
    }
  })

  $('#Decorator-check').change(function () {
    if (this.checked) {
      $('.decorator').show(200)
      $('#success_message').show()
      $('.decorator :input').prop('required', true)
    } else {
      $('.decorator').hide(100)
      $('#success_message').show()
      $('.decorator :input').removeAttr('required')
    }
  })

  $('#Music-check').change(function () {
    if (this.checked) {
      $('.music').show(200)
      $('#success_message').show()
      $('.music :input').prop('required', true)
    } else {
      $('.music').hide(100)
      $('#success_message').show()
      $('.music :input').removeAttr('required')
    }
  })

  var monopolyArray = ['']
  if (monopolyArray.indexOf('Caterer') !== -1) {
    $('#Caterer-check').prop('checked', true)
    $('.caterer').show()
  }

  if (monopolyArray.indexOf('Decorator') !== -1) {
    $('#Decorator-check').prop('checked', true)
    $('.decorator').show()
  }

  if (monopolyArray.indexOf('Music') !== -1) {
    $('#Music-check').prop('checked', true)
    $('.music').show()
  }
})

const allCheckboxes = document.getElementById('all-checkboxes')
const checkboxes = document.querySelectorAll('.service_time_check')
/*
allCheckboxes.addEventListener('change', function() {
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = allCheckboxes.checked;
    });
});
*/

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    if (!this.checked) {
      allCheckboxes.checked = false
    } else {
      const allChecked = Array.from(checkboxes).every(function (c) {
        return c.checked
      })
      allCheckboxes.checked = allChecked
    }
  })
})

/*------------------------------------------------
---------------- YES / NO CANCELLATION
------------------------------------------------- */

$(document).ready(function () {
  $('#yes_radio').on('click', function () {
    $('#cancellation_hidden_div').show(100)
  })

  $('#no_radio').on('click', function () {
    $('#cancellation_hidden_div').hide(100)
  })

  // Initial state
  $('#cancellation_hidden_div').hide(100)
})

$(document).ready(function () {
  $('#yes_differ_radio').on('click', function () {
    $('#price_differ_hidden_div').show(200)
    $('#floor_differ_hidden_div').show(200)
  })

  $('#no_differ_radio').on('click', function () {
    $('#price_differ_hidden_div').hide(200)
    $('#floor_differ_hidden_div').hide(200)
  })

  $('#yes_floor_differ_radio').on('click', function () {
    $('#floor_differ_hidden_div').show(200)
    $('.addon-service').show(200)
  })

  $('#no_floor_differ_radio').on('click', function () {
    $('#floor_differ_hidden_div').hide(200)
    $('.addon-service').hide(200)
  })

  $('#yes_floor_combo_radio').on('click', function () {
    $('#floor_combo_hidden_div').show(200)
    $('.addon-service').show(200)
  })

  $('#no_floor_combo_radio').on('click', function () {
    $('#floor_combo_hidden_div').hide(200)
    $('.addon-service').hide(200)
  })

  // Initial state
  $('#price_differ_hidden_div').hide(200)
  $('#floor_differ_hidden_div').hide(200)
  $('#floor_combo_hidden_div').hide(200)
})

var currentPage = 1
var totalPages = 6

function changePage (direction) {
  if (direction === 'prev' && currentPage > 1) {
    currentPage--
  } else if (direction === 'next' && currentPage < totalPages) {
    currentPage++
  }

  updatePagination()
}

function updatePagination () {
  $('.page-content').removeClass('active-page')
  $('#page' + currentPage).addClass('active-page')

  $('#prevBtn').toggleClass('disabled', currentPage === 1)

  if (currentPage === totalPages) {
    $('#nextBtn').html('<a class="page-link" href="#">Submit</a>')
  } else {
    $('#nextBtn').html('<a class="page-link" href="#">Next</a>')
  }
}

$(document).ready(function () {
  // Initialize pagination state
  updatePagination()

  $('#prevBtn').click(function () {
    changePage('prev')
  })

  $('#nextBtn').click(function () {
    if (currentPage === totalPages) {
      // Handle submit logic here
      alert('Form submitted!')
    } else {
      changePage('next')
    }
  })
})

//Drag N Drop Image

document.querySelectorAll('.drop-zone__input').forEach(inputElement => {
  const dropZoneElement = inputElement.closest('.drop-zone')

  dropZoneElement.addEventListener('click', e => {
    inputElement.click()
  })

  inputElement.addEventListener('change', e => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0])
    }
  })

  dropZoneElement.addEventListener('dragover', e => {
    e.preventDefault()
    dropZoneElement.classList.add('drop-zone--over')
  })
  ;['dragleave', 'dragend'].forEach(type => {
    dropZoneElement.addEventListener(type, e => {
      dropZoneElement.classList.remove('drop-zone--over')
    })
  })

  dropZoneElement.addEventListener('drop', e => {
    e.preventDefault()

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0])
    }

    dropZoneElement.classList.remove('drop-zone--over')
  })
})

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail (dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector('.drop-zone__thumb')

  // First time - remove the prompt
  if (dropZoneElement.querySelector('.drop-zone__prompt')) {
    dropZoneElement.querySelector('.drop-zone__prompt').remove()
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement('div')
    thumbnailElement.classList.add('drop-zone__thumb')
    dropZoneElement.appendChild(thumbnailElement)
  }

  thumbnailElement.dataset.label = file.name

  // Show thumbnail for image files
  if (file.type.startsWith('image/')) {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`
    }
  } else {
    thumbnailElement.style.backgroundImage = null
  }
}

// Add config(venue) table ajax

// Remove config(venue) table ajax
$('.remove-btn-config').click(function () {
  var config_tb_id = $(this).data('configid')
  console.log(config_tb_id)
  var amount = $(this).data('amount')
  console.log(amount)

  totalAmount -= parseInt(amount) // Subtract the amount from the total
  $('#total-input-amount').val(totalAmount)
  $('#payed').val(totalAmount)

  var lastField1 = $(`#config_input_id_${config_tb_id}`)
  lastField1.remove()

  // Disable the "Remove" button and enable the "Add" button
  $(this).prop('disabled', true)
  $(this).siblings('.add-btn-venue-config').prop('disabled', false)
})
// Remove config(venue) table ajax

// Add Package(Caterer) table ajax
$('input[name="count_of_persons[]"]').on('input', function () {
  // Get the value of the input field
  var count_persons = $(this).val()
  // Find the corresponding button element and set its data-count attribute to the input value
  $(this).closest('tr').find('[data-count]').attr('data-count', count_persons)
  $(this)
    .closest('tr')
    .find('[data-remove-count]')
    .attr('data-remove-count', count_persons)

  // Update the total input field with the new total amount
  // $('#total-input-amount').val(newTotalAmount);
})

$('.add-btn-venue-pack').click(function () {
  var count2 = parseInt($(this).data('count'))
  var amount2 = parseInt($(this).data('amount2'))
  var packid = $(this).data('packid')
  // console.log(packid);

  totalAmount += parseInt(count2 * amount2)
  console.log(totalAmount)

  $('#total-input-amount').val(totalAmount)
  $('#payed').val(totalAmount)
  $('#balance').val(0)

  $(this).prop('disabled', true)
  $(this).siblings('.remove-btn-pack').prop('disabled', false)

  // $(this).closest('tr').find('[data-count]').attr('data-count', 0);
  // $(this).closest('tr').find('[data-remove-count]').attr('data-remove-count', 0);

  var html = ''
  $.ajax({
    success: function (data) {
      html +=
        `
                    <input id="pack_input_id_` +
        packid +
        `" type="hidden" name="pack_tb_id[]" value="` +
        packid +
        `">
                    <input type="hidden" name="caterer_pack_amount[]" value="` +
        amount2 +
        `">
                    `
      $('#package_id_input_field').append(html)
    }
  })
})
// Add Package(Caterer) table ajax

$('.remove-btn-pack').click(function () {
  var count2 = parseInt($(this).data('remove-count'))
  // console.log(count2);
  var amount2 = parseInt($(this).data('amount2'))
  // console.log(amount2);
  var packid = $(this).data('packid')
  totalAmount -= parseInt(count2 * amount2)

  var lastField1 = $(`#pack_input_id_${packid}`)
  lastField1.remove()

  // console.log(totalAmount)
  $('#total-input-amount').val(totalAmount)
  $('#payed').val(totalAmount)

  //Hey chatgpt please Set This dat-count and data-remove-count Value as null or zero
  $(this).closest('tr').find('[data-count]').attr('data-count', 0)
  $(this).closest('tr').find('[data-remove-count]').attr('data-remove-count', 0)

  // Disable the "Remove" button and enable the "Add" button
  $(this).prop('disabled', true)
  $(this).siblings('.add-btn-venue-pack').prop('disabled', false)
})
// Remove Package(Caterer) table ajax

// Add Package(Decorator) table ajax
$('.add-btn-decorator').click(function () {
  var amount3 = $(this).data('amount3')
  var decorator_tb_id = $(this).data('decorator_tb_id')

  totalAmount += parseInt(amount3)
  $('#total-input-amount').val(totalAmount)
  $('#payed').val(totalAmount)
  $('#balance').val(0)

  $(this).prop('disabled', true)
  $(this).siblings('.remove-btn-decorator').prop('disabled', false)

  var html = ''
  $.ajax({
    success: function (data) {
      html +=
        `
                    <input id="dec_input_id_` +
        decorator_tb_id +
        `" type="hidden" name="decorator_tb_id[]" value="` +
        decorator_tb_id +
        `">
                    <input id="dec_amt_id_` +
        decorator_tb_id +
        `" type="hidden" name="decorator_amount[]" value="` +
        amount3 +
        `">
                    `
      $('#package_id_input_field').append(html)
    }
  })
})
// Add Package(Decorator) table ajax

// Remove Package(Decorator) table ajax
$('.remove-btn-decorator').click(function () {
  var amount3 = $(this).data('amount3')
  var decorator_tb_id = $(this).data('decorator_tb_id')

  totalAmount -= parseInt(amount3) // Subtract the amount from the total
  $('#total-input-amount').val(totalAmount)
  $('#payed').val(totalAmount)

  var lastField1 = $(`#dec_input_id_${decorator_tb_id}`)
  var amtField1 = $(`#dec_amt_id_${decorator_tb_id}`)
  amtField1.remove()
  lastField1.remove()

  // Disable the "Remove" button and enable the "Add" button
  $(this).prop('disabled', true)
  $(this).siblings('.add-btn-decorator').prop('disabled', false)
})
// Package(Decorator) table ajax

// Add Package(Others) table ajax
$('.add-btn-service').click(function () {
  var amount4 = $(this).data('amount3')
  var service_tb_id = $(this).data('service_tb_id')

  totalAmount += parseInt(amount4)
  $('#total-input-amount').val(totalAmount)
  $('#payed').val(totalAmount)
  $('#balance').val(0)

  $(this).prop('disabled', true)
  $(this).siblings('.remove-btn-service').prop('disabled', false)

  var html = ''
  $.ajax({
    success: function (data) {
      html +=
        `
                    <input id="ser_input_id_` +
        service_tb_id +
        `" type="hidden" name="service_tb_id[]" value="` +
        service_tb_id +
        `">
                    <input type="hidden" name="service_amount[]" value="` +
        amount4 +
        `">
                    `
      $('#package_id_input_field').append(html)
    }
  })
})
// Add Package(Others) table ajax

// Remove Package(Others) table ajax
$('.remove-btn-service').click(function () {
  var amount4 = $(this).data('amount3')

  totalAmount -= parseInt(amount4) // Subtract the amount from the total
  $('#total-input-amount').val(totalAmount)
  $('#payed').val(totalAmount)

  var lastField1 = $(`#ser_input_id_${service_tb_id}`)
  lastField1.remove()

  // Disable the "Remove" button and enable the "Add" button
  $(this).prop('disabled', true)
  $(this).siblings('.add-btn-service').prop('disabled', false)
})
// Package(Others) table ajax

$('#payed').on('input', function () {
  var payed = parseFloat($(this).val())
  var totalAmount = parseFloat($('#total-input-amount').val())

  if (!isNaN(payed) && !isNaN(totalAmount)) {
    $('#balance').val(totalAmount - payed)
  } else {
    $('#balance').val('')
  }
})

$('#total-input-amount').on('input', function () {
  var totalAmount = parseFloat($(this).val())
  // var payed = parseFloat($('#payed').val());

  if (!isNaN(totalAmount)) {
    $('#payed').val(totalAmount)
  } else {
    $('#payed').val('')
  }
})

$('#payment_type').on('change', function () {
  var payment_type = $(this).val()
  var total = parseFloat($('#total-input-amount').val())
  var partialAmount = parseFloat($('#partial_amount').val())

  if (payment_type === '1') {
    $('#payed').val(total)
    $('#balance').val(0)
  } else if (payment_type === '0') {
    $('#payed').val('')
    $('#balance').val(partialAmount - parseFloat($('#payed').val()))
    $('#payed').removeAttr('readonly')
  }
})

// Menu Data Add
$('.menu_data_add_btn').click(function () {
  var vendor_id = 'BAV5650'
  var business_category = $('#service_type2').val()
  var menu_type = $('#menu_type').val()
  var items_name = $('#items_name').val()
  var menu_option = $('#menu_option').val()
  var formData = new FormData()
  formData.append('vendor_id', vendor_id)
  formData.append('business_category', business_category)
  formData.append('source', 'web')
  formData.append('menu_type[]', menu_type)
  formData.append('items_name[]', items_name)
  formData.append('menu_option[]', menu_option)
  formData.append('API_KEY', 'c1haN3RkWVA3aHkycVpLRDljTA==')
  $.ajax({
    url: 'vendor_apis/add_menu_items.php',
    type: 'POST',
    data: formData,
    success: function (data) {
      result = $.parseJSON(data)
      if (result.response == 'y') {
        $('#menu_add_modal').modal('hide')
        $('#success_msg').html(result.message)
        $('#success_modal').modal('show')
        setTimeout(function () {
          location.reload()
        }, 1000)
      } else {
        $('#error_msg').html(result.message)
        $('#error-modal').modal('show')
      }
    },
    cache: false,
    contentType: false,
    processData: false
  })
  return false
})
// Menu Data Add

// Menu Data Delete
$('.cat-del').click(function () {
  var cat_tb_id = $(this).data('menu_tb_id')
  $('#cat_delete_id').val(cat_tb_id)
})

$('#caterer_data_delete').submit(function () {
  var vendor_id = 'BAV5650'
  var business_category = $('#service_type2').val()
  var product_delete_id = $('#cat_delete_id').val()
  var update_data = 'menu_data'
  var formData = new FormData()
  formData.append('vendor_id', vendor_id)
  formData.append('business_category', business_category)
  formData.append('product_delete_id', product_delete_id)
  formData.append('update_data', update_data)
  formData.append('source', 'web')
  formData.append('API_KEY', 'c1haN3RkWVA3aHkycVpLRDljTA==')
  $.ajax({
    url: 'vendor_apis/package_delete.php',
    type: 'POST',
    data: formData,
    success: function (data) {
      result = $.parseJSON(data)
      if (result.response == 'y') {
        $('#caterer_delete_modal').modal('hide')
        $('#success_msg').html(result.message)
        $('#success_modal').modal('show')
        setTimeout(function () {
          location.reload()
        }, 1000)
      } else {
        $('#error_msg').html(result.message)
        $('#error-modal').modal('show')
      }
    },
    cache: false,
    contentType: false,
    processData: false
  })
  return false
})
// Menu Data Delete

// Menu Data sHOW
$('.menu_data_btn_show').click(function () {
  var html = ''
  $('#menu_modal').modal('show')
  menu_tb_id_data = result.product_details_array[0]['menu_tb_id']
  menu_type_data = result.product_details_array[0]['menu_type']
  items_name_data = result.product_details_array[0]['items_name']
  options_name_data = result.product_details_array[0]['options_name']
  html += `<div class="col-lg-12 mb-0 addon-service1">
                              <div class="form-group">
                                  <select name="menu_type" id="menu_type" class="form-control mb-2">
                                      <option value="Veg"`
  if (menu_type_data === 'Veg') {
    html += ` selected="selected"`
  }
  html += `>Veg</option>
                    <option value="Non Veg"`
  if (menu_type_data === 'Non Veg') {
    html += ` selected="selected"`
  }
  html += `>Non-Veg</option>
                    <option value="Both"`
  if (menu_type_data === 'Both') {
    html += ` selected="selected"`
  }
  html +=
    `>Both</option>
                                  </select>
                                  <input type="hidden" name="product_id" value="` +
    menu_tb_id_data +
    `">
                                  <input type="hidden" name="service_type" value="2">
                                  <input type="hidden" name="catering_data" value="show_menu_data">
                                  <input type="text" name="items_name" value="` +
    items_name_data +
    `"class="form-control mb-2" placeholder="Items Name">
                                  <input type="text" name="menu_option" value="` +
    options_name_data +
    `" class="form-control mb-2" placeholder="Menu Option">
                              </div>
                          </div>`
  $('#menu_modal_display').html(html)
})
// Menu Data sHOW

function toggleCheck (state, elem) {
  jQuery(elem)
    .closest('form .amenities')
    .find('input:checkbox')
    .prop('checked', state)
}

// Multiple Datepicker

$(document).ready(function () {
  $('#datepicker')
    .datepicker({
      startDate: new Date(),
      multidate: true,
      format: 'dd/mm/yyyy',
      daysOfWeekHighlighted: '5,6',
      datesDisabled: ['31/08/2017'],
      language: 'en'
    })
    .on('changeDate', function (e) {
      // `e` here contains the extra attributes
      $(this)
        .find('.input-group-addon .count')
        .text(' ' + e.dates.length)
    })
})


// Table Scroll
const container = document.querySelector('.table-responsive');
                
let startY;
let startX;
let scrollLeft;
let scrollTop;
let isDown;

container.addEventListener('mousedown',e => mouseIsDown(e));  
container.addEventListener('mouseup',e => mouseUp(e))
container.addEventListener('mouseleave',e=>mouseLeave(e));
container.addEventListener('mousemove',e=>mouseMove(e));

function mouseIsDown(e){
  isDown = true;
  startY = e.pageY - container.offsetTop;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  scrollTop = container.scrollTop; 
}
function mouseUp(e){
  isDown = false;
}
function mouseLeave(e){
  isDown = false;
}
function mouseMove(e){
  if(isDown){
    e.preventDefault();
    //Move vertcally
    const y = e.pageY - container.offsetTop;
    const walkY = y - startY;
    container.scrollTop = scrollTop - walkY;

    //Move Horizontally
    const x = e.pageX - container.offsetLeft;
    const walkX = x - startX;
    container.scrollLeft = scrollLeft - walkX;

  }
}

CKEDITOR.replace('description')
