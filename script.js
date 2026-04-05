const DEV_MODE = false; // change to false before deploy
const birthday = new Date("April 9, 2026 7:00:00").getTime();

const message = `Ee roju ni birthday...one of the important day in your life.
Its been nearly 390 days for our friendship
1336 reels shared (till 11:14pm April 4th)
6K+ messages
And countless memories
which I will remember for my life.

One of the important person nuvvu.

Oka person ki oka low phase vuntadhi...mental ga chala unstable ga vuntaru...
alanti stage lo nenu vunnapdu naku manchi support ichav...
Chepalsina avasaram ledhu...everytime I am off...ventane vasthav all okay na ani.
anthaku minchi em kavali chepu.

Thank you for everything !!! 💖

Ni kanna mundhu...Uma gadiki thanks...vadivale ga nuvu naku close friend ayindhi..
sorry sorry vadi kanna mundu mana College ki thanks...mana clg lo niku seat icharu ga
sorry sorry seat ichedi govt kadha...usshhh ivi ani vodu.

Nuvu na friend ga aye process lo involve ayina andariki thanks.

Na life motha em ledhu...depression...evariki em chepukolekhapotunna anapdu devudu 
send you. Thanks God also (lol).

Em chepagalanu...treated me so well.

Memories...mana a HIT batch tho were unforgettable.
Uma,nuvvu and nenu.
Mana mugguru friendship elage vundali ani korukuntunna.

Nenu observe chesa...you have a great circle of friends...every one likes u so much, 
Ni manchitanam...pilla bacha esalu...everything makes u special among all.

Apdu apdu naku anipisthadi...ni lanti manchi ammai ki friend ga nenu deserve kanu emo ani...
chala sarlu anipichindhi...ni closemates antha better kadhu nenu ani...sarle avi ani endhuku gani

Party mukhyam bigiluu...(joke chesa le...party em vodhu...asale dieting chestuna..heheheh)

Inka cheptha vunthe chala vuntadhi...ee website saripodu...nenu final ga em chepdham anukunna anthe...

Happy birthday Mahi 💖 !!!

Manchiga happy ga vundhuuu...nuvvu happy ga vunthe chalu...enjoy ur life....dabbulu 
jagratha ga karchu pethu(hahahah)


                                                                    Itlu - Loki ✨

`;

const countdown = document.getElementById("countdown");
const secretContent = document.getElementById("secretContent");
const lockScreen = document.getElementById("lockScreen");
const flash = document.getElementById("flash");
const music = document.getElementById("music");
const typingTarget = document.getElementById("typingText");

const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");

/* TYPE EFFECT */
let isTyping = false; // prevent duplicate typing

function typeText(text, element) {

    if (isTyping) return;
    isTyping = true;

    let i = 0;
    element.innerHTML = "";

    function typing() {
        if (i < text.length) {
            element.innerHTML += text[i] === "\n" ? "<br>" : text[i];
            i++;
            setTimeout(typing, 40); // only typing, no scroll
        }
    }

    typing();
}

/* HEARTS */
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

/* FIREWORKS */
function fireworks() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const spark = document.createElement("div");
            spark.className = "heart";
            spark.innerHTML = "✨";
            spark.style.left = Math.random() * 100 + "vw";
            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 2000);
        }, i * 150);
    }
}

/* REVEAL */
function revealSite() {

    const title = document.getElementById("mainTitle");
    title.style.opacity = "0";
    setTimeout(() => title.style.display = "none", 1000);

    flash.style.opacity = 1;
    setTimeout(() => flash.style.opacity = 0, 400);

    lockScreen.style.display = "none";
    secretContent.classList.remove("hidden");
    document.getElementById("memories").classList.remove("hidden");

    document.body.classList.add("unlocked");

    typeText(message, typingTarget);

    setInterval(createHeart, 300);
    fireworks();
}

/* TAP START */
startBtn.addEventListener("click", async () => {
    startScreen.style.display = "none";
    await music.play().catch(()=>{});
    revealSite();
});

/* COUNTDOWN */
function startCountdown() {
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const diff = birthday - now;

        const d = Math.floor(diff/(1000*60*60*24));
        const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
        const m = Math.floor((diff%(1000*60*60))/(1000*60));
        const s = Math.floor((diff%(1000*60))/1000);

        countdown.innerHTML = `${d}d ${h}h ${m}m ${s}s`;

        if (diff < 0) {
            clearInterval(timer);
            countdown.innerHTML = "🎉 It's Time!";
            startScreen.style.display = "flex";
        }
    }, 1000);
}

/* STARS */
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = Array(100).fill().map(() => ({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2
}));

setInterval(() => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";
    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fill();
    });
}, 50);
startBtn.addEventListener("click", async () => {

    startScreen.style.display = "none";

    try {
        await music.play();
    } catch (e) {
        console.log("Audio blocked", e);
    }

    revealSite();
});
/* INIT */
if (DEV_MODE) {
    countdown.innerHTML = "DEV MODE 🚀";
    startScreen.style.display = "flex";
} else {
    startCountdown();
}