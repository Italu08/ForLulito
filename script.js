document.addEventListener('DOMContentLoaded', () => {

    // --- Referencias a los elementos del HTML ---
    const mainContent = document.getElementById('main-content');
    const loveStatementSection = document.getElementById('loveStatementSection');
    const letterContent = document.getElementById('letterContent');
    const finalQuestionSection = document.getElementById('finalQuestionSection');
    const buttonControls = document.getElementById('buttonControls');
    const confirmationScreen = document.getElementById('confirmationScreen');
    const backgroundMusic = document.getElementById('backgroundMusic'); // Referencia al audio

    // Botones
    const readLetterButton = document.getElementById('readLetterButton');
    const showQuestionButton = document.getElementById('showQuestionButton');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

    // Elementos del Modal (Pop-up)
    const modalOverlay = document.getElementById('modalOverlay');
    const confirmButton = document.getElementById('confirmButton');

    // Inicialmente, ocultamos las secciones de la Carta, Pregunta y Botones
    if (letterContent) letterContent.classList.add('hidden');
    if (finalQuestionSection) finalQuestionSection.classList.add('hidden');
    if (buttonControls) buttonControls.classList.add('hidden');


    // --- 1. Lógica del botón "Leer Carta" (Inicia Música) ---
    if (readLetterButton && loveStatementSection && letterContent) {
        readLetterButton.addEventListener('click', () => {
            // INTENTO DE REPRODUCIR MÚSICA con la interacción del usuario
            if (backgroundMusic) {
                backgroundMusic.play().catch(error => {
                    console.log("Error al reproducir audio (Probablemente bloqueo del navegador):", error);
                });
            }

            // Oculta la sección de "Me gustas mucho"
            loveStatementSection.classList.add('hidden');
            
            // Muestra la carta
            letterContent.classList.remove('hidden');
            
            // Desplázate automáticamente a la carta para que la vea
            letterContent.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- 2. Lógica para Continuar a la Pregunta ---
    if (showQuestionButton && letterContent && finalQuestionSection && buttonControls) {
        showQuestionButton.addEventListener('click', () => {
            // Oculta la carta
            letterContent.classList.add('hidden');
            
            // Muestra la pregunta final y los botones
            finalQuestionSection.classList.remove('hidden');
            buttonControls.classList.remove('hidden');
            
            // Desplázate automáticamente a la pregunta
            finalQuestionSection.scrollIntoView({ behavior: 'smooth' });
            
            // Inicializa la posición del botón 'No' para que pueda escapar
            if (noButton) noButton.style.position = 'absolute'; 
        });
    }

    // --- 3. Lógica del botón "No" (Mover) ---
    function moveButton(event) {
        if (event) {
             event.preventDefault(); 
        }
        
        // Solo movemos el botón si la sección de control de botones está visible.
        if (buttonControls && !buttonControls.classList.contains('hidden')) {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const buttonWidth = noButton.offsetWidth;
            const buttonHeight = noButton.offsetHeight;

            // Define la zona de movimiento: Dentro de la sección de pregunta y botones
            let sectionTop = finalQuestionSection.offsetTop;
            let sectionBottom = sectionTop + finalQuestionSection.offsetHeight + buttonControls.offsetHeight;
            
            // Por seguridad, si no se encuentra la sección, usamos toda la ventana
            if (sectionTop === 0) {
                 sectionBottom = screenHeight;
            }

            let randomX = Math.floor(Math.random() * (screenWidth - buttonWidth));
            let randomY = Math.floor(Math.random() * (sectionBottom - sectionTop - buttonHeight)) + sectionTop;
            
            // Usamos 'fixed' para que se mueva por toda la ventana de forma fluida
            noButton.style.position = 'fixed'; 
            noButton.style.left = randomX + 'px';
            noButton.style.top = randomY + 'px';
        }
    }

    if (noButton) {
        noButton.addEventListener('mouseover', moveButton);
        noButton.addEventListener('click', moveButton);
    }


    // --- 4. Lógica del botón "Sí" y Confirmación ---
    if (yesButton && modalOverlay) {
        yesButton.addEventListener('click', () => {
            modalOverlay.classList.remove('hidden');
        });
    }

    if (confirmButton && modalOverlay && confirmationScreen) {
        confirmButton.addEventListener('click', () => {
            modalOverlay.classList.add('hidden');
            
            // Detenemos la música si dice que SÍ
            if (backgroundMusic) {
                 backgroundMusic.pause();
                 backgroundMusic.currentTime = 0;
            }

            // Ocultamos la pregunta y los botones
            if (finalQuestionSection) finalQuestionSection.classList.add('hidden');
            if (buttonControls) buttonControls.classList.add('hidden');
            
            // Mostramos la pantalla de celebración final
            confirmationScreen.classList.remove('hidden');
            confirmationScreen.scrollIntoView({ behavior: 'smooth' });
        });
    }
});