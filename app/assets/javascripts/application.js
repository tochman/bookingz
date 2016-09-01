// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require foundation-datetimepicker
//= require turbolinks
//= require_tree .

(function ($) {
    $.fn.longClick = function (callback, timeout) {
        var timer;
        timeout = timeout || 500;
        $(this).mousedown(function () {
            timer = setTimeout(function () {
                callback();
            }, timeout);
            return false;
        });
        $(document).mouseup(function () {
            clearTimeout(timer);
            return false;
        });
    };

})(jQuery);


function queryApi() {
    $.ajax({
        dataType: "json",
        url: '/api_index.json',
        success: function (response) {
            loadCurrentBookings(response);
            addEvents();
        }
    });
}


function loadCurrentBookings(response) {
    var res = response;
    res.items.forEach(function (item) {
        item.slots.forEach(function (slot) {
            var card = ['#card', item.id].join('-');
            $(card + " .content").append('<div class="action" id="action_' + slot.info.id + '" style="background-color: ' + getBackgroundColor(slot) + '">' + getInfo(slot) + '</div>');
        });
    });
}

function getBackgroundColor(obj) {
    var color = (obj.state == 'booked') ? 'red' : 'green';
    return color;
}

function getInfo(obj) {
    var message = (obj.info.client != null) ? setSlotMessage(obj) : obj.info.time;
    return message;
}

function setSlotMessage(obj){
    var message = [obj.info.time, 'Grupp: '+ obj.info.client, 'Start: ' + obj.info.booking_time.split(' - ')[0], 'Slut: ' + obj.info.booking_time.split(' - ')[1]].join(' ');
    return message;
}

function currentDate() {
    var date = setDate().toJSON().slice(0, 10);
    return date;
}

function setDate() {
    return new Date();
}

function getDispalyedDate() {
    var date = $('#date').text();
    return date;
}

function populateAndShowModal(object) {
    var obj, resource, slot, card, date;
    obj = object;
    card = $(obj).parent().parent();
    resource = card.find('.accordion-title').text();
    slot = $(obj).text();
    date = getDispalyedDate();
    var id = card[0].id.split("-").pop();
    $('#booking_resource_id').val(id);
    card.find('#' + obj.id).css({'color': 'red', 'background-color': 'orange'});
    var modal = new Foundation.Reveal($('#slot-modal'));
    $('#model-content #slot').html([resource, date, slot].join(' - '));
    $('#booking_booking_date').val(date);
    modal.open();
}

function navigateDate(val) {
    var displayedDate = getDispalyedDate();
    var newDate = new Date(displayedDate);
    newDate.setDate(newDate.getDate() + val);
    console.log(newDate);
    return newDate.toJSON().slice(0, 10);

}

function dateOnPageLoad(passed_date) {
    if (typeof passed_date !== 'undefined') {
        MockDate.set(passed_date);
    }
    var date = currentDate();
    $('#date').html(date);

}

function addEvents() {
    $('#previous').click(function () {
        $('#date').html(navigateDate(-1));
    });
    $('#next').click(function () {
        $('#date').html(navigateDate(1));
    });

    $('#previous').longClick(function () {
        //place date time picker code here
        console.log('Looong press!');
    });

    $('[id^=action_]').click(function () {
        populateAndShowModal(this);
    });
}

$(document).ready(function () {
    dateOnPageLoad();
    queryApi();

    $('.picker').fdatetimepicker({
        language: 'en',
        pickTime: true,
        closeButton: true,
        startView: 0,
        format: 'hh:ii'
    });

});
