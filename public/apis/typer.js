//Promise based typer API for animating texts

const animateText = (textArg, textLabel, speed, delay) => {
    return new Promise((resolve) => {
        let index = 0;
        let span;
        textLabel.style.height = '100px'
        // Typing Effect: Add characters one by one
        const typeInterval = setInterval(() => {
            if (index < textArg.length) {
                span = document.createElement('span');
                span.classList.add('animate');
                span.textContent = textArg.charAt(index);
                textLabel.append(span);
                index++;
            } else {
                clearInterval(typeInterval); // Stop typing

                // Wait before starting the delete effect
                setTimeout(() => {
                    let deleteIndex = textArg.length - 1;

                    // Deleting Effect: Remove characters one by one
                    const deleteInterval = setInterval(() => {
                        if (deleteIndex >= 0) {
                            textLabel.children[deleteIndex].remove();
                            deleteIndex--;
                        } else {
                            clearInterval(deleteInterval); // Stop deleting
                            resolve(); // Move to next text animation
                        }
                    }, speed/2); // Delete speed (faster than typing)
                }, delay*2);
            }
        }, speed);
    });
};

export { animateText }