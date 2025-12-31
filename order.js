document.addEventListener("DOMContentLoaded", () => {

  //  INIT EMAILJS
  emailjs.init("c1dUZhKhFQVH37FZt"); 

  //  Service name from localStorage
  const service = localStorage.getItem("serviceType") || "Custom Order";

  document.getElementById("serviceTitle").innerText = service;
  document.getElementById("giftType").value = service;

  const form = document.getElementById("orderForm");
  const successMsg = document.getElementById("successMsg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    successMsg.innerText = "Sending...";
    successMsg.style.color = "white";

    /* ===================================================
       1 ADMIN MAIL (YOU RECEIVE USER DETAILS)
    =================================================== */
    
         

    emailjs.sendForm(
      "service_j8h4rdc",        
      "template_foodwg4",     
      this
    )
    .then(() => {

        fireConfetti();
        
        showSuccess();


    


      /* ===============================================
         2 AUTO-REPLY MAIL (USER RECEIVES CONFIRMATION)
      =============================================== */
      return emailjs.sendForm(
        "service_j8h4rdc",      
        "template_yelc5mc",     
        form
      );

    })
    .then(() => {
      successMsg.innerText =
        "Thank you ❤️ We’ve received your request. Please check your email.";
      successMsg.style.color = "limegreen";
      form.reset();
    })
    .catch((error) => {
      successMsg.innerText =
        "Something went wrong ❌ Please try again.";
      successMsg.style.color = "red";
      console.error("EmailJS Error:", error);
    });

  });
});


function showSuccess(){
  successMsg.innerHTML = `
    <div class="success-box">
      <div class="tick"></div>
      <p>Thank you ❤️<br>We will contact you soon.</p>
    </div>
  `;
}
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<60;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2 + 0.5,
    dx: (Math.random()-0.5)*0.3,
    dy: (Math.random()-0.5)*0.3
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="rgba(255,255,255,0.4)";
    ctx.fill();
    p.x+=p.dx;
    p.y+=p.dy;
    if(p.x<0||p.x>canvas.width) p.dx*=-1;
    if(p.y<0||p.y>canvas.height) p.dy*=-1;
  });
  requestAnimationFrame(animate);
}
animate();

function fireConfetti() {
  const isMobile = window.innerWidth < 768;

  confetti({
    particleCount: isMobile ? 80 : 150,
    spread: isMobile ? 70 : 120,
    startVelocity: isMobile ? 30 : 45,
    origin: { y: 0.6 },
    colors: ['#ffffff', '#EB1000', '#ff9f9f']
  });
}


function showSuccessTick(){
  const tick = document.getElementById("successCheck");
  tick.style.display = "block";
}

function showSuccess(){
  document.getElementById("successBox").style.display = "flex";
}

