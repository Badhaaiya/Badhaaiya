 (function ($) {
    'use strict'

    document.addEventListener('DOMContentLoaded', function () {
        var calendarEl = document.getElementById('calendar')
        var calendar = new FullCalendar.Calendar(calendarEl, {
            customButtons: {
                UpcomingBookings: {
                    text: 'Upcoming Bookings',
                    click: function () {
                        $('#upcoming-booking-modal').modal('show')
                    }
                },
                CompletedBookings: {
                    text: 'Completed Bookings',
                    click: function () {
                        $('#completed-booking-modal').modal('show')
                    }
                }
            },
            headerToolbar: {
                left: 'UpcomingBookings CompletedBookings',
                center: 'title',
                right: 'today prev,next'
            },
            editable: false,
            droppable: false,
            dayCellDidMount: function (info) {
                var button = document.createElement('button')
                button.className = 'dayButton btn btn-sm'
                button.innerHTML =
                    '<a href="/Badhaaiya/Addofflinebooking"><i class="fas fa-plus fa-lg"></i></a>'
                button.setAttribute('data-date', info.date.toISOString())
                info.el
                    .getElementsByClassName('fc-daygrid-day-frame')[0]
                    .appendChild(button)
            },
            weekNumbers: false,
            navLinks: false,
            nowIndicator: true,
            events: function (fetchInfo, successCallback, failureCallback) {
                $.ajax({
                    url: '/Badhaaiya/GetEvents',
                    type: 'GET',
                    data: {
                        start: fetchInfo.startStr,
                        end: fetchInfo.endStr
                    },
                    success: function (data) {
                        successCallback(data)
                    },
                    error: function () {
                        failureCallback()
                    }
                })
            },
            eventColor: '#ffcfe3',
            eventTimeFormat: {
                hour: 'numeric',
                minute: '2-digit',
                meridiem: 'short'
            }
        })
        calendar.render()
    })
})(jQuery)








//; (function ($) {
//    'use strict'

//    document.addEventListener('DOMContentLoaded', function () {
//        var calendarEl = document.getElementById('calendar')
//        var calendar = new FullCalendar.Calendar(calendarEl, {
//            customButtons: {
//                UpcomingBookings: {
//                    text: 'Upcoming Bookings',
//                    click: function () {
//                        $('#upcoming-booking-modal').modal('show')
//                    }
//                },
//                CompletedBookings: {
//                    text: 'Completed Bookings',
//                    click: function () {
//                        $('#completed-booking-modal').modal('show')
//                    }
//                }
//            },
//            headerToolbar: {
//                left: 'UpcomingBookings CompletedBookings',
//                center: 'title',
//                right: 'today prev,next'
//            },
//            editable: false,
//            droppable: false,
//            dayCellDidMount: function (info) {
//                var button = document.createElement('button')
//                button.className = 'dayButton btn btn-sm'
//                button.innerHTML =
//                    '<a href="add-offline-booking.php"><i class="fas fa-plus fa-lg"></i></a>'
//                button.setAttribute('data-date', info.date.toISOString())
//                info.el
//                    .getElementsByClassName('fc-daygrid-day-frame')[0]
//                    .appendChild(button)
//            },
//            weekNumbers: false,
//            navLinks: false,
//            nowIndicator: true,
//            events: function (fetchInfo, successCallback, failureCallback) {
//                $.ajax({
//                    url: '/Calendar/GetEvents',
//                    type: 'GET',
//                    success: function (data) {
//                        successCallback(data)
//                    },
//                    error: function () {
//                        failureCallback()
//                    }
//                })
//            },
//            eventColor: '#ffcfe3',
//            eventTimeFormat: {
//                hour: 'numeric',
//                minute: '2-digit',
//                meridiem: 'short'
//            }
//        })
//        calendar.render()
//    })
//})(jQuery)























//;(function ($) {
//  'use strict'

//  document.addEventListener('DOMContentLoaded', function () {
//    /* initialize the external events
//			-----------------------------------------------------------------*/

//    // var containerEl = document.getElementById('external-events')
//    // new FullCalendar.Draggable(containerEl, {
//    //   itemSelector: '.external-event',
//    //   eventData: function (eventEl) {
//    //     return {
//    //       title: eventEl.innerText.trim()
//    //     }
//    //   }
//    // })

//    //// the individual way to do it
//    // var containerEl = document.getElementById('external-events-list');
//    // var eventEls = Array.prototype.slice.call(
//    //   containerEl.querySelectorAll('.fc-event')
//    // );
//    // eventEls.forEach(function(eventEl) {
//    //   new FullCalendar.Draggable(eventEl, {
//    //     eventData: {
//    //       title: eventEl.innerText.trim(),
//    //     }
//    //   });
//    // });

//    /* initialize the calendar
//			-----------------------------------------------------------------*/

//    var calendarEl = document.getElementById('calendar')
//    var calendar = new FullCalendar.Calendar(calendarEl, {
//      customButtons: {
//        UpcomingBookings: {
//          text: 'Upcoming Bookings',
//          click: function () {
//            $('#upcoming-booking-modal').modal('show')
//          }
//        },
//        CompletedBookings: {
//          text: 'Completed Bookings',
//          click: function () {
//            $('#completed-booking-modal').modal('show')
//          }
//        }
//      },

//      headerToolbar: {
//        left: 'UpcomingBookings CompletedBookings',
//        center: 'title',
//        right: 'today prev,next'
//      },

//      // selectable: true,
//      // selectMirror: true,
//      // select: function (arg) {
//      //   	var title = prompt('Event Title:')
//      //   	if (title) {
//      //   	  	calendar.addEvent({
//      //   	  	  title: title,
//      //   	  	  start: arg.start,
//      //   	  	  end: arg.end,
//      //   	  	  allDay: arg.allDay
//      //   	  	})
//      //   	}
//      //   	calendar.unselect()
//      // },

//      editable: false,
//      droppable: false, // this allows things to be dropped onto the calendar

//      // Add the dayCellDidMount callback
//      dayCellDidMount: function (info) {
//        // Create a button element
//        var button = document.createElement('button')
//        button.className = 'dayButton btn btn-sm'
//        button.innerHTML =
//          '<a href="Addofflinebooking"><i class="fas fa-plus fa-lg"></i></a>'

//        // Add a data-date attribute with the date of the cell
//        button.setAttribute('data-date', info.date.toISOString())

//        // Append the button to the content of the day cell
//        info.el
//          .getElementsByClassName('fc-daygrid-day-frame')[0]
//          .appendChild(button)
//      },

//      weekNumbers: false,
//      navLinks: false, // can click day/week names to navigate views
//      editable: false,
//      selectable: false,
//      nowIndicator: true,
//      events: [
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-01-01',
//          display: 'background',
//          className: ['OnlineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-01-08',
//          display: 'background',
//          className: ['OfflineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-01-30',
//          display: 'background',
//          className: ['OnlineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-01-05',
//          display: 'background',
//          className: ['OfflineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-01-12',
//          display: 'background',
//          className: ['OnlineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-01-25',
//          display: 'background',
//          className: ['OnlineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-01-28',
//          display: 'background',
//          className: ['OfflineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-01-01',
//          display: 'background',
//          className: ['OnlineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-01-08',
//          display: 'background',
//          className: ['OfflineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-01-30',
//          display: 'background',
//          className: ['OnlineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-01-05',
//          display: 'background',
//          className: ['OfflineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-01-12',
//          display: 'background',
//          className: ['OnlineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-01-25',
//          display: 'background',
//          className: ['OnlineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-01-28',
//          display: 'background',
//          className: ['OfflineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-02-03',
//          display: 'background',
//          className: ['OnlineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-02-08',
//          display: 'background',
//          className: ['OfflineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-02-29',
//          display: 'background',
//          className: ['OnlineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-02-05',
//          display: 'background',
//          className: ['OfflineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-02-12',
//          display: 'background',
//          className: ['OnlineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-02-25',
//          display: 'background',
//          className: ['OnlineEvent']
//        },
//        {
//          title: '#BBN1234567 John Doe 9876543210 ₹1,30,000',
//          start: '2024-02-28',
//          display: 'background',
//          className: ['OfflineEvent']
//        }
//      ],
//      eventColor: '#ffcfe3',
//      eventTimeFormat: {
//        hour: 'numeric',
//        minute: '2-digit',
//        meridiem: 'short'
//      }
//    })
//    calendar.render()
//  })
//})(jQuery)
