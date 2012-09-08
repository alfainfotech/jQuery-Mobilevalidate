jQuery-Mobilevalidate
=====================

jQuery Mobile Form Validation Plugin

* Auto-match form fields with built-in patterns and messages by field name
* Honours browser-based HTML 5 validations via pattern and required attributes
* Use regex pattern or custom validation callback to validate fields
* Compatible with jQuery Mobile data-* namespace
* Built-in error CSS and code to work with jQuery Mobile enhanced form elements
* Use jQuery Mobile dialogue page to display validation errors (optional)
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
        find: 'select:not(:disabled)[name],textarea:not(:disabled)[name],input:not(:disabled)[type!="submit"][type!="button"][type!="image"][type!="hidden"][name]', // selectors to filter fields to be validated
        class: 'validate-error', // default CSS class name for invalid fields
        css: '.validate-error {box-shadow: 0px 0px 12px #e10000;}', // handy CSS injected into <head> dynamically; avoid by setting it to '' (when external CSS files are used)
        novalidate: false, // set true to disable browser's default HTML5 validation. Useful for checkbox groups (with the same "name") as browsers understand only individual checkboxes with 'required' attribute
        dialog: '#errordialog', // ID selector for the jQuery Mobile Dialog page (data-role="dialog") used as error popup
        transition: 'slideup', // default changePage() transition for the error dialog
        title: 'Please correct the following:', // default title for the error dialog
        delimiter: "\n - ", // error message delimiter for alert() when the jQuery Mobile Dialog is not found
        'bind': {
            'text': 'change', // validation trigger for text input elements, e.g. text, textarea
            'select': 'change' // validation trigger for non-input elements, e.g. select, checkbox, radio
        },
    });
