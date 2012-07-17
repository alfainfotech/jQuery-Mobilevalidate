jQuery-Mobilevalidate
=====================

jQuery Mobile Form Validation Plugin

* Auto match form fields with built-in patterns and messages
* Compatible with browser-based HTML 5 validations
* Use jQuery Mobile data-* namespace
* Built-in error CSS that works with jQuery Mobile form elements
* Use jQuery Mobile dialogue page to display error (optional)
* Customisable callbacks

Requires
--------

* jQuery Mobile

Example
-------

    $(document).bind('pageinit', function(){
        $('form').mobilevalidate();
    });

Options
-------

    $('form').mobilevalidate({
        trigger: 'submit', // form event to triggers the form validation
        find: 'select,textarea,input[type!="submit"][type!="button"][type!="image"][type!="hidden"]', // selector to filter fields within the form to be validated
        class: 'error', // default CSS class name for invalid fields
        novalidate: false, // disable browser's default HTML5 validation
        css: '.error {box-shadow: 0px 0px 12px #e10000;}', // handy CSS for '.error' class injected into <head> dynamically; avoid by setting it to '' (when external CSS files are used)
        dialog: '#errordialog', // ID selector for the jQuery Mobile Dialog page (data-role="dialog")
        transition: 'slideup', // default changePage transition for the error dialog
        title: 'Please correct the following:', // default title for the error dialog
        delimiter: "\n - " // error message delimiter for alert() when the jQuery Mobile Dialog is not found
    });