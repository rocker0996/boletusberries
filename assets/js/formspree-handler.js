// Обработчик форм для Formspree
document.addEventListener('DOMContentLoaded', function() {
    // Обработка всех форм с action на Formspree
    const forms = document.querySelectorAll('form[action*="formspree.io"]');
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');
            const successMessage = document.getElementById('success-message');
            const errorMessage = document.getElementById('error-message');
            
            // Показываем индикатор загрузки
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.value = 'Отправка...';
            }
            
            // Скрываем предыдущие сообщения
            if (successMessage) successMessage.style.display = 'none';
            if (errorMessage) errorMessage.style.display = 'none';
            
            // Отправляем данные на Formspree
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function(response) {
                if (response.ok) {
                    // Успешная отправка
                    form.reset();
                    
                    // Показываем сообщение об успехе
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        // Плавно прокручиваем к форме, но не слишком сильно
                        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                    
                    // Скрываем сообщение об ошибке если было показано
                    if (errorMessage) errorMessage.style.display = 'none';
                    
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(function(error) {
                console.error('Error:', error);
                
                // Показываем сообщение об ошибке
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    // Плавно прокручиваем к форме, но не слишком сильно
                    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Скрываем сообщение об успехе если было показано
                if (successMessage) successMessage.style.display = 'none';
            })
            .finally(function() {
                // Восстанавливаем кнопку
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.value = submitButton.getAttribute('data-original-value') || 'Отправить';
                }
            });
        });
        
        // Сохраняем оригинальный текст кнопки
        const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');
        if (submitButton && !submitButton.getAttribute('data-original-value')) {
            submitButton.setAttribute('data-original-value', submitButton.value);
        }
    });
    
    // Автоматическое скрытие уведомлений через 5 секунд
    setTimeout(function() {
        const successMessages = document.querySelectorAll('#success-message');
        const errorMessages = document.querySelectorAll('#error-message');
        
        successMessages.forEach(function(msg) {
            if (msg.style.display === 'block') {
                msg.style.display = 'none';
            }
        });
        
        errorMessages.forEach(function(msg) {
            if (msg.style.display === 'block') {
                msg.style.display = 'none';
            }
        });
    }, 5000);
});
