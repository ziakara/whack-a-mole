$(document).ready(function() {
    let timeLeft = 20;
    let gameRunning = false;
    let intervalID;
    let score = 0;

    const holes = $(".hole");

    // returns a random hole
    function getRandomHole() {
        const randomHole = Math.floor(Math.random() * holes.length);
        return $(holes[randomHole]);
    }

    function randomTime(min, max) {
        return time = Math.floor(Math.random() * (max - min) + min);
    }

    // spawns a mole in a random hole
    function spawnMole() {
        const hole = getRandomHole();
        hole.css("background-image", "url('mole.png')");
        
        setTimeout(function() {
            hole.css("background-image", "url('hole.png')");
            if (gameRunning) {
                spawnMole();
            }
        }, randomTime(500, 3000));
    }

    // click a mole and increase score
    holes.click(function() {
        // only if game is running and time is left
        if (gameRunning && timeLeft > 0) {
            if ($(this).css('background-image').includes('mole.png')) {
                score++;
                $("#score").text(score);
                $(this).css('background-image', 'url("hole.png")');
            }
        }
    });

    // set all moles back to holes
    function clearMoles() {
        $(".hole").css("background-image", "url('hole.png')");
    }

    // used to aid with timer below
    // https://stackoverflow.com/questions/21670438/make-countdown-start-after-button-is-clicked
    // updates html timer + sets alert
    function updateTimer() {
        if (timeLeft === 0) {
            $("#time").text(timeLeft);
            // function to delay the alert by 1 sec so it displays after 0
            setTimeout(function() {
                gameRunning = false;
                clearInterval(intervalID);
                clearMoles();
                alert('Game is over!');
            }, 1000);
        }

        else if (timeLeft > 0) {
            $("#time").text(timeLeft);
        }
        timeLeft--;
    }

    // starts the game
    function startGame(){
        timeLeft = 20;
        score = 0;
        $("#time").text(timeLeft);
        $("#score").text(score);
        if (intervalID){
            clearInterval(intervalID);
        }
        if (!gameRunning) {
            intervalID = setInterval(updateTimer, 1000);
            gameRunning = true;
            spawnMole();
        }
    }

    // stops the game and clears everything
    function stopGame(){
        gameRunning = false;
        clearInterval(intervalID);
        timeLeft = 20;
        $("#time").text(timeLeft);
        clearMoles();
        score = 0;
        $("#score").text(score);
    }

    // click the reset button
    $("#reset-game").click(function() {
        if (gameRunning){
            stopGame();
        }
        else {
            startGame();
        }
    });

    // intialize timer and score
    $("#time").text(timeLeft);
    $("#score").text(score);
});