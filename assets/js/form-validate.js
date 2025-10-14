function valid_datas(form) {
	const $form = jQuery(form);
	const $status = jQuery('#form_status');

	const name = form.name.value.trim();
	const email = form.email.value.trim();
	const subject = form.subject.value.trim();
	const partner_type = form.partner_type.value.trim();
	const message = form.message.value.trim();

	if (name === '') {
		$status.html('<span class="wrong">Вы должны ввести имя</span>');
		notice(form.name);
	} else if (email === '') {
		$status.html('<span class="wrong">Ваш email не указан или указан неверно</span>');
		notice(form.email);
	} else if (subject === '') {
		$status.html('<span class="wrong">Введите ваш город</span>');
		notice(form.subject);
	} else if (partner_type === '') {
		$status.html('<span class="wrong">Выберите тип партнера</span>');
		notice(form.partner_type);
	} else if (message === '') {
		$status.html('<span class="wrong">Поле "Сообщение" обязательно к заполнению</span>');
		notice(form.message);
	} else {
		$status.html('<span class="loading">Идет отправка сообщения...</span>');
		$form.animate({ opacity: 0.3 });
		$form.find('input,textarea,select,button').css('border', 'none').attr('disabled', 'disabled');

		jQuery.ajax({
			url: 'mail.php',
			type: 'post',
			data: $form.serialize(),
			complete: function (data) {
				$status.html('<div class="success"><i class="fas fa-check-circle"></i><h3>Спасибо!</h3><p>Мы свяжемся с вами в ближайшее время.</p></div>');
				$form.css({ opacity: 1 });
				$form.find('input,textarea,select').val('');
				$form.find('button[type="submit"]').hide(); // скрыть кнопку после отправки
			}
		});
	}

	return false;
}

function notice(field) {
	jQuery('form').find('input,textarea,select').css('border', 'none');
	field.style.border = '1px solid red';
	field.focus();
}