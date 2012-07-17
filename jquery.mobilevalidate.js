(function ($) {

	$.fn.mobilevalidate = function (options) {

		var opts = $.extend({
			'trigger': 'submit',
			'find': 'select,textarea,input[type!="submit"][type!="button"][type!="image"][type!="hidden"]',
			'class': 'error',
			'novalidate': false,
			'css': '.error {box-shadow: 0px 0px 12px #e10000;}',
			'dialog': '#errordialog',
			'transition': 'slideup',
			'title': 'Please correct the following:',
			'delimiter': "\n - ",
			'add': function(field, options){
				if ($(field).is('input[type="radio"]') || $(field).is('input[type="checkbox"]')) {
					$('input[name="' + $(field).attr('name') + '"]').each(function(){
						$('label[for="' + $(this).attr('id') + '"]').addClass(options['class']);
					});
				}
				else if ($(field).is('select')) {
					$(field).parent().addClass(options['class']);
				}	
				else {
					$(field).addClass(options['class']);
				}
			},
			'remove': function(field, options){
				if ($(field).is('input[type="radio"]') || $(field).is('input[type="checkbox"]')) {
					$('input[name="' + $(field).attr('name') + '"]').each(function(){
						$('label[for="' + $(this).attr('id') + '"]').removeClass(options['class']);
					});							
				}
				else if ($(field).is('select')) {
					$(field).parent().removeClass(options['class']);
				}	
				else {
					$(field).removeClass(options['class']);
				}
			},
			'label': function (field) {
				var field_id = $(field).attr('id');
				var field_name = $(field).attr('name');
				var label = '';

				if ($(field).is('input[type="radio"]') || $(field).is('input[type="checkbox"]')) { 
					label = $(field).parent().parent().prev().text().replace(/\s*:$/, '');
					if (! label) {
						label = field_name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
							return letter.toUpperCase();
						});
					}
					return label;
				}
				else {
					if (field_id) {
						var field_label = $('label[for="' + field_id + '"]');
						
						if (field_label) {
							label = field_label.text().replace(/\s*:$/, '');
						}
					}

					if (! label) {
						label = field_name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
							return letter.toUpperCase();
						});
					}
				}

				return label;
			},
			'callback': function(messages, options){
				if ($(options['dialog']).length) {

					var formatted_message =  "\n<ul>\n" + $.map(messages, function(val, i){
						return '<li>' + val + '</li>';
					}).join("\n") + "\n</ul>";

					if (options['title']) {
						formatted_message = '<h2>' + options['title'] + '</h2>' + formatted_message;
					}

					var content_divs = $(options['dialog']).find('div:jqmData(role="content")');

					if (content_divs.length) {
						$(content_divs.get(0)).html(formatted_message);
					}
					else {
						$(options['dialog']).html(formatted_message);
					}
					
					$.mobile.changePage($(options['dialog']), {
						transition: options['transition'],
						reverse: false,
						changeHash: true
					});
				}
				else {
					alert(options['title'] + options['delimiter'] + messages.join(options['delimiter']));
				}

				return false;						
			},
			'messages': {
				'input': 'Enter "%FIELDNAME%"',
				'checkbox': 'Check one or more "%FIELDNAME%"',
				'radio': 'Choose "%FIELDNAME%"',
				'select': 'Select an option from "%FIELDNAME%"',
				'textarea': 'Fill in the "%FIELDNAME%"'
			},
			'fields': {
				'integer': {pattern: /^-?\s*[0-9]+$/, message: 'Enter an integer for "%FIELDNAME%"'},
				'numeric': {pattern: /^-?\s*[0-9]+\.?[0-9]*$|^-?\s*\.[0-9]+$/, message: 'Enter a number for "%FIELDNAME%"'},
				'float': {pattern: /^-?\s*[0-9]+\.[0-9]+$/, message: 'Enter a number for "%FIELDNAME%"'},
				'postcode': {pattern: /^\d{3,4}$/, message: 'Enter a valid "%FIELDNAME%"'},
				'datetime': {pattern: /^(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/[0-9]{4}|([0-9]{4}\-0?[1-9]|1[0-2])\-(0?[1-9]|[1-2][0-9]|3[0-1])\s+[0-9]{1,2}:[0-9]{2}$/, message: 'Enter DD/MM/YYYY HH:SS for "%FIELDNAME%"'},
				'date': {pattern: /^(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/[0-9]{4}|([0-9]{4}\-0?[1-9]|1[0-2])\-(0?[1-9]|[1-2][0-9]|3[0-1])$/, message: 'Enter DD/MM/YYYY for "%FIELDNAME%"'},
				'time': {pattern: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, message: 'Enter HH:SS for "%FIELDNAME%"'},
				'month': {pattern: /^(0?[1-9]|[1-2][0-9]|3[0-1])\-(0?[1-9]|1[0-2])$/, message: 'Enter YYYY-MM for "%FIELDNAME%"'}, // HTML 5
				'first_name': {pattern: /^[a-zA-Z]+[- ]?[a-zA-Z]*$/},
				'last_name': {pattern: /^[a-zA-Z]+[- ]?[a-zA-Z]+\s*,?([a-zA-Z]+|[a-zA-Z]+\.)?$/},
				'email': {pattern: /^[\w\-\+\._]+\@[a-zA-Z0-9][-a-zA-Z0-9\.]*\.[a-zA-Z]+$/},
				'confirm_password': {pattern: /^[\w.!?@#$%&*]{5,}$/, validate: function(field){
					var password_field = $(field).closest('form').find('input[type="password"][name!="' + $(field).attr('name') + '"]');
					if ($(field).val() && password_field.length) {
						if ($(field).val() == password_field.val()) {
							return true;
						}
						else {
							return false;
						}
					}
					else {
						return true;
					}
				}, message: '"%FIELDNAME%" must match "Password"'},
				'password': {pattern: /^[\w.!?@#$%&*]{5,}$/, message: 'Enter "%FIELDNAME%" with minimum 5 characters'},
				'money': {pattern: /^\-?\d{1,11}(\.\d{2})?$/},
				'percentage': {pattern: /^-?\s*[0-9]+\.?[0-9]*$|^-?\s*\.[0-9]+$/},
				'file': {pattern: /^[\w\s.!?@#$\(\)\'\_\-:%&*\/\\\\\[\]]+$/, message: 'Choose a file for "%FIELDNAME%"'}
			}
		}, options);
		
		var that = this;
		var that_selector = that.selector;
		var selector_initialised = that.jqmData(that_selector);

		if (! selector_initialised) {

			if (opts.novalidate) {
				$(that).attr('novalidate', 'novalidate'); 	
			}

			if (opts.css) {
				$('<style type="text/css"></style>').html(opts.css).appendTo('head');		
			}

			var fields = $(that).find(opts.find);

			fields.each(function(){

				var this_field = $(this);

				if (this_field.is('input[type="radio"]') || this_field.is('input[type="checkbox"]')) {

					var field_name = this_field.attr('name');
					var field_validate = $('input[name="' + field_name + '"]').jqmData('validate');

					if (! field_validate) {

						var field_message = this_field.jqmData('message');

						if (! field_message) {
							var message_label = opts.label(this);

							$.map(opts.fields, function(value, key) {
								if (! this_field.jqmData('match') && field_name.match(key)) {

									if (value.message) {
										field_message = value.message.replace('%FIELDNAME%', message_label);
									}

									this_field.jqmData('match', key);
								}
							});

							if (! field_message) {
								if (this_field.is('input[type="radio"]')) {
									field_message = opts.messages['radio'].replace('%FIELDNAME%', message_label);
								}
								else {
									field_message = opts.messages['checkbox'].replace('%FIELDNAME%', message_label);
								}
							}

							this_field.jqmData('message', field_message);

						}

						this_field.jqmData('validate', 'true');

					}

				}
				else {
					
					var field_validate = $(this).jqmData('validate');
					var field_required = this_field.attr('required');
					var field_pattern = this_field.attr('pattern');
					var field_message = this_field.jqmData('message');

					if (field_validate != 'false' || (field_required || field_pattern || field_message)) {

						this_field.jqmData('validate', 'true');

						var field_id = this_field.attr('id');
						var field_name = this_field.attr('name');

						var message_label = opts.label(this);

						$.map(opts.fields, function(value, key) {

							if (! this_field.jqmData('match') && field_name.match(key)) {

								if (! field_pattern && value.pattern) {
									var value_pattern = value.pattern + ''; // stringify regex
									this_field.attr('pattern', value_pattern.substring(1, value_pattern.length -1)); 
								}

								if (! field_message) {

									if (value.message) {
										field_message = value.message.replace('%FIELDNAME%', message_label);
									}

								}

								this_field.jqmData('match', key);
							}

						});

						if (! field_message) {

							if (this_field.is('input')) {

								var field_type = this_field.attr('type');
								if (opts.messages[field_type]) {
									field_message = opts.messages[field_type].replace('%FIELDNAME%', message_label);	
								}
								else {
									field_message = opts.messages['input'].replace('%FIELDNAME%', message_label);
								}
								
							}
							else if (this_field.is('select')) {
								field_message = opts.messages['select'].replace('%FIELDNAME%', message_label);
							}
							else if (this_field.is('textarea')) {
								field_message = opts.messages['select'].replace('%FIELDNAME%', message_label);
							}

						}

						if (! this_field.jqmData('message')) {
							this_field.jqmData('message', field_message);
						}

					}

				}
			});

			
			$(that).each(function(){

				$(this).bind(opts.trigger, function(){

					var this_form = this;
					var fields = $(this).find(opts.find);
					var errors = 0;
					var error_messages = [];

					fields.each(function(){

						if ($(this).jqmData('validate') == 'true') {

							opts.remove(this, opts);

							if ($(this).is('input[type="radio"]') || $(this).is('input[type="checkbox"]')) {

								var field_name = $(this).attr('name');
								var field_required = $('input[name="' + field_name + '"]').attr('required');

								if ($(this).is('input[type="radio"]')) {
									
									if (field_required) {
										var value = $('input[name="' + field_name + '"]:checked').val();
										if (value == null || value === "") {
											errors++;
											error_messages.push($(this).jqmData('message'));
											opts.add(this, opts);
										}
									}
								}
								else {
									
									if (field_required) {

										var values = $('input[name="' + field_name + '"]:checked').map(function(){return $(this).val();});

										if (! values.length) {
											errors++;
											error_messages.push($(this).jqmData('message'));
											opts.add(this, opts);
										}
									}
								}
								
							}	
							else {
								var pattern = $(this).attr('pattern');
								var value = $(this).val();
								var matched = $(this).jqmData('match');

								if ($(this).attr('required')) {
									if (matched && opts.fields[matched].validate) {
										if (! opts.fields[matched].validate(this)) {
											errors++;
											error_messages.push($(this).jqmData('message'));
											opts.add(this, opts);
										}
									}
									else if (pattern) {
										var regex = new RegExp(pattern.replace(/^\//, '').replace(/\/$/, ''));

										if ((value == null || value === "") || ! regex.test(value)) {
											errors++;
											error_messages.push($(this).jqmData('message'));
											opts.add(this, opts);
										}
									}
									else {

										if (value == null || value === "") {
											errors++;
											error_messages.push($(this).jqmData('message'));
											opts.add(this, opts);
										}
									}
								}
								else {
									if (! (value == null || value === "") && matched && opts.fields[matched].validate) {
										if (! opts.fields[matched].validate(this)) {
											errors++;
											error_messages.push($(this).jqmData('message'));
											opts.add(this, opts);
										}
									}
									else if (! (value == null || value === "") && pattern) {
										var regex = new RegExp(pattern);

										if (! regex.test(value)) {
											errors++;
											error_messages.push($(this).jqmData('message'));
											opts.add(this, opts);
										}
									}
								}
							}
						}

					});
					
					if (errors) {
						return opts.callback(error_messages, opts);
					}
					else {
						return true;
					}

				});

			});

			that.jqmData(that_selector, 1);

		}

	};
})(jQuery);