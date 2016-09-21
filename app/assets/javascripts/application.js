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
// require turbolinks
//= require_tree .

$(document).ready(function () {
    dateOnPageLoad();
    var date;
    if (location.search.substr(1).length > 0) {
        date = location.search.substr(1).split("=")[1];
        $('#date').html(date);
    } else {
        date = currentDate();
    }
    queryApi(date);

    //$('.picker').fdatetimepicker({
    //    language: 'en',
    //    pickTime: true,
    //    closeButton: true,
    //    startView: 0,
    //    format: 'hh:ii'
    //});

    //setupDateTimePicker();

    var now = new Date();
    //var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    //var checkout = $('#booking_time_end').fdatetimepicker({
    //    onRender: function (date) {
    //        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
    //    }
    //}).on('changeDate', function (ev) {
    //    checkout.hide();
    //}).data('datepicker');
    var checkout = $('#booking_time_end').fdatetimepicker({
        startDate: now,
        pickTime: 0,
        startView: 0,
        format: 'hh:ii',
        maxView: 0,
        onRender: function(time){
            return time.valueOf() < checkin.date.valueOf() ? 'disabled' : '';
        }
    }).on('changeDate', function () {
        checkout.hide();
    }).data('datetimepicker');
    var checkin = $('#booking_time_start').fdatetimepicker({
        startDate: now,
        startView: 0,
        format: 'hh:ii',
        maxView: 0,
        onRender: function (time) {
            return time.valueOf() < now.valueOf() ? 'disabled' : '';
        }
    }).on('changeDate', function (ev) {
        //if (ev.date.valueOf() > checkout.date.valueOf()) {
        //    var newDate = new Date(ev.date);
        //    newDate.setDate(newDate.getDate() + 1);
        //    checkout.update(newDate);
        //}
        checkin.hide();
        $('#booking_time_end').focus();
    }).data('datetimepicker');


});


function setupDateTimePicker() {


}
