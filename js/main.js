$('.calculator-form').on('submit', function(e) {
	e.preventDefault();
	let data = $(this).serializeArray();
	let fields = new Map(); 
	console.log(data);

	function checkfields(name, value) {
		let error;
		let desc;
		(name == 'sumbet') ? desc = 'Сумма ставки': (name == 'coefficient') ? desc = 'Коэффициент' : '';

		if(!value.trim()) {
			return 'Поле <b>'+desc+'</b> пустое.';	
		}

		if(value != value.trim()) {
				$('.form-field__input[name="'+name+'"').val(value.trim());
		}

		if(Number.isNaN(+value)) {
				return 'Поле <b>'+desc+'</b> содержит нечисловое значение.';	
		}

		if(name == 'sumbet') {
			if(!(+value >= 10)) {
				return 'Поле <b>'+desc+'</b> должно содержать значение от 10 и больше';	
			}
		}

		if(name == 'coefficient') {
			if(!(+value >= 1)) {
				return 'Поле <b>'+desc+'</b> должно содержать значение от 1 и больше';	
			}
		}
	}

		for(let field of data) {
			let error = checkfields(field.name, field.value);
			if(error) {
				$('.error').html('<div class="alert alert-danger">'+error+'</div>');
				break;
			}
			fields.set(field.name,field.value); 
		}

		if(fields.get('sumbet') && fields.get('coefficient')) {
			if(!$('.error').is(':empty')) {
				$('.error').empty();
			}
			let sum = fields.get('sumbet') * fields.get('coefficient');
			let profit = sum - fields.get('sumbet');
			$('.form-field_sum').addClass('show');
			$('.form-field_profit').addClass('show');
			$('.calculator__btn').addClass('calculator__btn_color_red');
			$('.calculator__btn').text('Поставить');
			$('.sum').val(sum);
			$('.profit').val(profit);
		}
});