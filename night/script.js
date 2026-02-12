var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars with random opacity values
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

const button = document.getElementById("valentinesButton");

button.addEventListener("click", () => {
  if (button.textContent === "Click Me! ❤") {
    button.textContent = "loading...";
    fetch('send_mail.php')
      .then(response => {
        if (response.ok) {
          button.textContent = "Check Your Email 🙃";
        } else {
          console.error('Failed to send email');
          button.textContent = "Error 😞";
        }
      })
      .catch(error => {
        // Handle network errors or other issues
        console.error('Error:', error);
        button.textContent = "Error 😞";
      });
  }
});

// ======= MUSIC PLAYER =======
/**
 * You can use your own mp3 file by putting it in the 'public/music/music.mp3' path.
 * Be sure the file exists for auto play to work. Otherwise, it will gracefully fail!
 */
const audio = document.createElement("audio");
audio.src = "public/walts_c.mp3";
audio.loop = true;
audio.preload = "auto";
audio.style.display = "none";
document.body.appendChild(audio);

// Try autoplay on user interaction (required by most browsers)
function tryAutoPlay() {
    audio.play().catch(() => {
        // Blocked (not user gesture yet)
    });
}
window.addEventListener("click", tryAutoPlay, { once: true });
window.addEventListener("touchstart", tryAutoPlay, { once: true });

let musicMuted = false;

// Music toggle button UI
function createMusicButton() {
    // If already exists, don't re-add
    if (document.getElementById("musicMuteButton")) return;
    const btn = document.createElement("button");
    btn.id = "musicMuteButton";
    btn.title = "Mute / Unmute";
    btn.innerHTML = '<span id="musicBtnIcon" style="vertical-align:-1px;">🔊</span>';
    btn.style.position = "fixed";
    btn.style.bottom = "24px";
    btn.style.right = "24px";
    btn.style.background = "#fff";
    btn.style.color = "#2d2dff";
    btn.style.border = "2px solid #2d2dff";
    btn.style.borderRadius = "50%";
    btn.style.width = "44px";
    btn.style.height = "44px";
    btn.style.fontSize = "1.55em";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.boxShadow = "0 2px 16px rgba(60,40,200,0.13)";
    btn.style.zIndex = 2048;
    btn.style.cursor = "pointer";
    btn.style.transition = "background 0.27s";
    btn.onmouseover = () => { btn.style.background = "#e9eaff"; };
    btn.onmouseout = () => { btn.style.background = "#fff"; };

    btn.onclick = function() {
        musicMuted = !musicMuted;
        audio.muted = musicMuted;
        // Also if muted, pause the audio; if unmuted, play
        if (musicMuted) {
            audio.pause();
            document.getElementById("musicBtnIcon").textContent = "🔇";
        } else {
            audio.play().catch(()=>{}); // try play if not muted
            document.getElementById("musicBtnIcon").textContent = "🔊";
        }
    };

    document.body.appendChild(btn);
}

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24); // Adjust font size based on screen width
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";
    
    // glow effect
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    if(frameNumber >= 3250 &&  frameNumber < 4000){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("everyday day I cannot believe how lucky I am", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    //fades out the text by decreasing the opacity
    if(frameNumber >= 4000 && frameNumber < 4750){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("everyday day I cannot believe how lucky I am", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    //needs this if statement to reset the opacity before next statement on canvas
    if(frameNumber == 4750){
        opacity = 0;
    }
    if(frameNumber > 4750 && frameNumber < 5500){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {           //shortens long sentence for mobile screens
            drawTextWithLineBreaks(["amongst trillions and trillions of stars,", "over billions of years"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst trillions and trillions of stars, over billions of years", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 5500 && frameNumber < 6250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["amongst trillions and trillions of stars,", "over billions of years"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst trillions and trillions of stars, over billions of years", canvas.width/2, canvas.height/2);
        }

        opacity = opacity - 0.01;
    }

    if(frameNumber == 6250){
        opacity = 0;
    }
    if(frameNumber > 6250 && frameNumber < 7000){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("to be alive, and to get to spend my life with you", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 7000 && frameNumber < 7750){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("to be alive, and to get to spend my life with you", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 7750){
        opacity = 0;
    }
    if(frameNumber > 7750 && frameNumber < 8500){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("is so incredibly unlikely", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 8500 && frameNumber < 9250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("is so incredibly unlikely", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 9250){
        opacity = 0;
    }
    if(frameNumber > 9250 && frameNumber < 10000){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and here I am to get the impossible", "chance to get to know you"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("and here I am to get the impossible chance to get to know you", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 10000 && frameNumber < 10750){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and here I am to get the impossible", "chance to get to know you"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("and here I am to get the impossible chance to get to know you", canvas.width/2, canvas.height/2);
        }
        
        opacity = opacity - 0.01;
    }

    if(frameNumber == 10750){
        opacity = 0;
    }
    if(frameNumber > 10750 && frameNumber < 18250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["Sara, I love you so much, more than", "all the time and space in the universe can contain"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("Sara, I love you so much, more than all the time and space in the universe can contain", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }

    // Timing constants for smooth sequential fade-ins
    const webLineStart = 11550; // "Let's capture..." line fade-in start (delay after previous)
    const webLineFadeInDuration = 100; // ~100 frames = ~1.6s
    const buttonFadeInDuration = 100;
    const buttonStartFrame = webLineStart + webLineFadeInDuration + 30; // button starts after "Let's capture..." fades in

    // Add global for smooth fades (must be kept outside drawText, you can hoist if necessary)
    if (typeof window.captureLineOpacity === 'undefined') window.captureLineOpacity = 0;
    if (typeof window.buttonOpacity === 'undefined') window.buttonOpacity = 0;

    if (frameNumber >= 11000 && frameNumber < 99999) {
        context.fillStyle = `rgba(45, 45, 255, ${secondOpacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and I can't wait to spend all my life", " to share my love with you!"], canvas.width / 2, (canvas.height/2 + 60), fontSize, lineHeight);
        } else {
            context.fillText("and I can't wait to spend all my life to share my love with you!", canvas.width/2, (canvas.height/2 + 50));
        }

        secondOpacity = secondOpacity + 0.01;
    }

    // Fade overlay state
    let fadeOverlayOpacity = 0;
    let isFading = false;

    if (frameNumber >= 11250 && frameNumber < 99999) {
        // Draw "Happy Valentine's Day <3>"
        context.fillStyle = `rgba(45, 45, 255, ${thirdOpacity})`;

        // Draw main Valentine's wish
        context.fillText("Happy Valentine's Day <3", canvas.width/2, (canvas.height/2 + 120));
        thirdOpacity = thirdOpacity + 0.01;

        // --- Animated sequential fade-in for "Let's capture..." line ---
        // Calculate opacity for the 'Let's capture...' line based on frame
        if (frameNumber > webLineStart) {
            window.captureLineOpacity = Math.min(1, (frameNumber - webLineStart) / webLineFadeInDuration);
        } else {
            window.captureLineOpacity = 0;
        }

        if (window.captureLineOpacity > 0) {
            context.save();
            context.globalAlpha = window.captureLineOpacity * thirdOpacity; // link to parent line fade for consistency
            context.fillStyle = `rgba(45, 45, 255, 1)`; // always use full blue, alpha handled by globalAlpha
            context.fillText(
                "Let's capture our love and store it indefinitely on the World Wide Web.",
                canvas.width/2,
                (canvas.height/2 + 170)
            );
            context.globalAlpha = 1;
            context.restore();
        }

        // --- BTN fade-in (Say cheese!) ---
        let showBtn = false;
        let btnFade = 0;
        if (frameNumber > buttonStartFrame) {
            window.buttonOpacity = Math.min(1, (frameNumber - buttonStartFrame) / buttonFadeInDuration);
            showBtn = (window.buttonOpacity > 0);
            btnFade = window.buttonOpacity;
        } else {
            window.buttonOpacity = 0;
        }

        if (showBtn) {
            // Create the button if it doesn't exist yet
            let keyButton = document.getElementById('archiveKey');
            if (!keyButton) {
                keyButton = document.createElement('button');
                keyButton.id = 'archiveKey';
                keyButton.textContent = 'Say cheese!';
                keyButton.style.position = 'fixed';
                keyButton.style.left = '50%';
                keyButton.style.top = 'calc(50% + 200px)';
                keyButton.style.transform = 'translateX(-50%)';
                keyButton.style.padding = '16px 28px';
                keyButton.style.fontSize = '1.2rem';
                keyButton.style.background = '#ffffff';
                keyButton.style.borderRadius = '12px';
                keyButton.style.border = '2px solid #2d2dff';
                keyButton.style.color = '#2d2dff';
                keyButton.style.cursor = 'pointer';
                keyButton.style.zIndex = 1001;
                keyButton.style.boxShadow = '0 3px 15px rgba(60,40,200,0.21)';
                keyButton.style.transition = 'background 0.3s,color 0.3s, opacity 0.2s';
                keyButton.style.opacity = '0'; // Start hidden

                keyButton.onmouseover = function() {
                    keyButton.style.background = '#2d2dff';
                    keyButton.style.color = '#fff';
                };
                keyButton.onmouseout = function() {
                    keyButton.style.background = '#fff';
                    keyButton.style.color = '#2d2dff';
                };

                keyButton.onclick = function() {
                    // Start fade overlay
                    fadeOverlayOpacity = 1; // Full white
                    isFading = true;

                    // Hide all other elements (including the canvas)
                    Array.from(document.body.children).forEach(function(el) {
                        if (el !== keyButton && el.id !== "archivePolaroid") el.style.display = 'none';
                    });
                    keyButton.style.display = 'none';

                    // Polaroid will show after short fade
                    setTimeout(function() {
                        // Remove overlay if already present
                        const existPolaroid = document.getElementById('archivePolaroid');
                        if (existPolaroid) existPolaroid.remove();

                        // Create the polaroid div
                        const polaroid = document.createElement('div');
                        polaroid.id = "archivePolaroid";
                        polaroid.style.position = "fixed";
                        polaroid.style.top = "50%";
                        polaroid.style.left = "50%";
                        polaroid.style.transform = "translate(-50%, -50%)";
                        polaroid.style.background = "#fff";
                        polaroid.style.border = "6px solid #e6e6e6";
                        polaroid.style.borderBottom = "50px solid #fff";
                        polaroid.style.borderRadius = "19px";
                        polaroid.style.boxShadow = "0 8px 36px 12px #dedffe9a, 0 2px 12px 2px rgba(150, 92, 228, 0.11)";
                        polaroid.style.padding = "24px 16px 34px 16px"; // Less wide on x-axis (left/right padding reduced)
                        polaroid.style.display = "flex";
                        polaroid.style.flexDirection = "column";
                        polaroid.style.alignItems = "center";
                        polaroid.style.zIndex = 1002;
                        polaroid.style.minWidth = "200px"; // less minimum width for a less-wide table
                        polaroid.style.maxWidth = "350px"; // make the card less wide overall
                        polaroid.style.width = "90vw"; // limit width to 90vw for mobile
                        polaroid.style.fontFamily = "monospace, monospace, sans-serif";
                        polaroid.style.transition = "box-shadow 0.25s";

                        // "X" close button
                        const closeBtn = document.createElement('span');
                        closeBtn.textContent = "✖";
                        closeBtn.title = "Remove";
                        closeBtn.style.position = "absolute";
                        closeBtn.style.top = "-16px";
                        closeBtn.style.right = "-16px";
                        closeBtn.style.background = "#fff";
                        closeBtn.style.border = "2px solid #e5e5e5";
                        closeBtn.style.borderRadius = "50%";
                        closeBtn.style.width = "38px";
                        closeBtn.style.height = "38px";
                        closeBtn.style.display = "flex";
                        closeBtn.style.alignItems = "center";
                        closeBtn.style.justifyContent = "center";
                        closeBtn.style.cursor = "pointer";
                        closeBtn.style.fontSize = "1.32rem";
                        closeBtn.style.boxShadow = "0 1px 7px rgba(60,40,200,0.12)";
                        closeBtn.style.zIndex = 1012;
                        closeBtn.style.transition = "background 0.2s";
                        closeBtn.onmouseover = function() {
                            closeBtn.style.background = "#ffe7ef";
                        }
                        closeBtn.onmouseout = function() {
                            closeBtn.style.background = "#fff";
                        }
                        closeBtn.onclick = function() {
                            polaroid.remove();
                            isFading = false;
                            fadeOverlayOpacity = 0;
                            // Reveal previously hidden elements and remove fade overlay
                            document.body.style.background = "";
                            Array.from(document.body.children).forEach(function(el) {
                                if (el.style && el.id !== "archivePolaroid") el.style.display = "";
                            });
                            // Remove overlay if exists
                            let fadeOverlayDiv = document.getElementById('fadeBackOverlay');
                            if (fadeOverlayDiv) fadeOverlayDiv.remove();
                        };

                        // Polaroid photo area (make image full size, table less wide)
                        const photoFrame = document.createElement('div');

                        photoFrame.style.width = "100%"; // Make image area as wide as the polaroid
                        photoFrame.style.maxWidth = "300px"; // Match polaroid maxWidth
                        photoFrame.style.height = "52vw";
                        photoFrame.style.maxHeight = "480px";
                        photoFrame.style.aspectRatio = "4/3";
                        photoFrame.style.display = "flex";
                        photoFrame.style.alignItems = "center";
                        photoFrame.style.justifyContent = "center";
                        photoFrame.style.marginBottom = "26px";
                        photoFrame.style.overflow = "hidden";
                        photoFrame.style.position = "relative";

                        // Main polaroid photo: show image/img.jpeg, make it full size
                        const img = document.createElement('img');
                        img.src = "public/images/img.jpg";
                        img.alt = "Polaroid";
                        img.style.width = "100%";
                        img.style.height = "100%";
                        img.style.objectFit = "cover";
                        img.style.display = "block";
                        // Make sure the image is as large as possible within its frame
                        img.onerror = function() {
                            // fallback if image isn't found
                            photoFrame.textContent = "💞";
                            photoFrame.style.fontSize = "4em";
                            photoFrame.style.color = "#db599d";
                            photoFrame.style.textAlign = "center";
                            img.remove();
                        };
                        photoFrame.appendChild(img);

                        // Polaroid label / caption
                        const title = document.createElement('div');
                        title.textContent = "Our love, locked away for the world to remember.";
                        title.style.fontWeight = "bold";
                        title.style.fontSize = "1.06em";
                        title.style.marginTop = "3px";
                        title.style.marginBottom = "12px";
                        title.style.color = "#2d2dff";
                        title.style.textAlign = "center";
                        title.style.maxWidth = "95%"; // Keep caption from overflowing

                        // Archive link
                        const archiveLink = document.createElement('a');
                        archiveLink.href = "https://web.archive.org/";
                        archiveLink.target = "_blank";
                        archiveLink.style.color = "#ce4b99";
                        archiveLink.style.fontWeight = "bold";
                        archiveLink.style.textDecoration = "underline";
                        archiveLink.style.fontSize = "1.18em";
                        archiveLink.style.marginTop = "0.3em";
                        archiveLink.style.textAlign = "center";
                        archiveLink.style.maxWidth = "95%";
                        archiveLink.textContent = "View on Internet Archive 💞";

                        polaroid.appendChild(closeBtn);
                        polaroid.appendChild(photoFrame);
                        polaroid.appendChild(title);
                        polaroid.appendChild(archiveLink);
                        document.body.appendChild(polaroid);

                        // Overlay fade (using separate div - z-index below polaroid)
                        if (!document.getElementById('fadeBackOverlay')) {
                            const fadeOverlayDiv = document.createElement('div');
                            fadeOverlayDiv.id = 'fadeBackOverlay';
                            fadeOverlayDiv.style.position = 'fixed';
                            fadeOverlayDiv.style.top = 0;
                            fadeOverlayDiv.style.left = 0;
                            fadeOverlayDiv.style.width = "100%";
                            fadeOverlayDiv.style.height = "100%";
                            fadeOverlayDiv.style.background = "#fff";
                            fadeOverlayDiv.style.pointerEvents = "none";
                            fadeOverlayDiv.style.zIndex = 1000;
                            fadeOverlayDiv.style.transition = "opacity 2s";
                            fadeOverlayDiv.style.opacity = fadeOverlayOpacity;
                            document.body.appendChild(fadeOverlayDiv);
                        }
                    }, 700);
                };

                keyButton.style.opacity = "0"; // ensure hidden for fade-in
                document.body.appendChild(keyButton);
            }
            // Animate opacity on existing button
            let keyButtonEl = document.getElementById('archiveKey');
            if (keyButtonEl) {
                keyButtonEl.style.opacity = `${btnFade}`;
                keyButtonEl.style.pointerEvents = btnFade > 0.9 ? "auto" : "none";
            }
        }
    }

    // --- Draw the fade overlay and animate its fade out ---
    // This draws the fade-out overlay if isFading is true and polaroid is present.
    (function handleFadeOverlay() {
        // Only trigger if fade-out is in progress and overlay exists
        const fadeDiv = document.getElementById('fadeBackOverlay');
        if (isFading && fadeDiv) {
            // Animate the opacity towards 0
            fadeOverlayOpacity -= 0.025;
            if (fadeOverlayOpacity < 0) fadeOverlayOpacity = 0;

            fadeDiv.style.opacity = fadeOverlayOpacity;

            // When almost transparent, remove and reveal bg
            if (fadeOverlayOpacity <= 0.02) {
                isFading = false;
                fadeDiv.remove();
            }
        }
    })();

    // Add music button (if not present)
    createMusicButton();

    // Reset the shadow effect after drawing the text
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
}

function draw() {
    context.putImageData(baseFrame, 0, 0);

    drawStars();
    updateStars();
    drawText();

    if (frameNumber < 99999) {
        frameNumber++;
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

// Auto play after a few seconds in case user hasn't interacted
setTimeout(() => { audio.play().catch(()=>{}); }, 3000);

window.requestAnimationFrame(draw);