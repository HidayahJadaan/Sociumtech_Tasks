const basketball = document.querySelector('.basketball');
const hoop = document.querySelector('.hoop');
const line = document.getElementsByClassName('line');
let isShooting = false;

basketball.addEventListener('click', () => {
    if (!isShooting) {
        isShooting = true;

        // Move the basketball towards the hoop
        basketball.style.transition = 'transform 0.5s ease-in-out';
        basketball.style.zIndex = '-1';
                    //   bounceBasketball(3); // Start bouncing 5 times

        basketball.style.transform = 'translateY(-600px) scale(0.5)';
        // line.style.zIndex = '5';


        // When the basketball reaches the hoop
        setTimeout(() => {
            basketball.style.transition = 'transform 2s ease-in-out'; // Slowly return to original position
            basketball.style.transform = 'translateY(0)';

            // Check if the basketball is inside the hoop
            const basketballRect = basketball.getBoundingClientRect();
            const hoopRect = hoop.getBoundingClientRect();

            if (
                basketballRect.right >= hoopRect.left &&
                basketballRect.left <= hoopRect.right &&
                basketballRect.bottom >= hoopRect.top
            ) {
                console.log('Score!');
            }

            // After returning, reset the transition to none
            setTimeout(() => {
                basketball.style.transition = 'none';
                isShooting = false;
                basketball.style.zIndex = '5';

            }, 2000); 
        }, 500);
    }
});

function bounceBasketball(bounceCount) {
    const bounceInterval = setInterval(() => {
        if (bounceCount <= 0) {
            clearInterval(bounceInterval);
            return;
        }

        // Apply the bounce animation
        basketball.style.animation = 'bounce 0.5s ease';
        bounceCount--;

        // Reset the animation after it completes
        setTimeout(() => {
            basketball.style.animation = 'none';
        }, 500); 
    }, 1000); 
}
