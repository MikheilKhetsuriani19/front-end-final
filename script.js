const currencies = document.querySelectorAll(".currency");
const inputs = document.querySelectorAll(".input-box input");
const inputs1 = document.querySelectorAll(".register-form input")
const header = document.querySelector("header");
const burger = document.querySelector(".burger-menu");
const mobileNav = document.querySelector(".mobile-nav");
const navLinks = document.querySelectorAll('a[href^="#"]');
const signupBtn = document.querySelector(".sign-up-button"); // your existing button
const overlay = document.getElementById("signupOverlay");
const closeSignup = document.getElementById("closeSignup");
const form = document.querySelector(".register-form")

burger.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");

    if (targetId === "#" || !targetId === "") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const headerHeight = header.offsetHeight;
    const targetPosition =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight -
      10;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

    
    mobileNav.classList.remove("open");
  });
});


function swapCurrencies() {
  const from = currencies[0];
  const to = currencies[1];

  const fromText = from.textContent.trim();
  const toText = to.textContent.trim();

  from.childNodes[from.childNodes.length - 1].nodeValue = " " + toText;
  to.childNodes[to.childNodes.length - 1].nodeValue = " " + fromText;

  const fromImg = from.querySelector("img").src;
  const toImg = to.querySelector("img").src;
  from.querySelector("img").src = toImg;
  to.querySelector("img").src = fromImg;

  const temp = inputs[0].value;
  inputs[0].value = inputs[1].value;
  inputs[1].value = temp;
}

currencies.forEach(currency => {
  currency.addEventListener("click", swapCurrencies);
});


header.addEventListener("mouseenter", () => {
  header.animate(
    [{ height: "125px" }, { height: "150px" }],
    { duration: 200, fill: "forwards" },
  );
});

header.addEventListener("mouseleave", () => {
  header.animate(
    [{ height: "150px" }, { height: "125px" }],
    { duration: 200, fill: "forwards" },
  );
});


signupBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
  document.body.classList.add("no-scroll");
});

closeSignup.addEventListener("click", hideSignup);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) hideSignup();
});

function hideSignup() {
  overlay.style.display = "none";
  document.body.classList.remove("no-scroll");
}



const priceCard = document.querySelector("cards-p")

const myAPI = "https://694c24b2da5ddabf00362fc4.mockapi.io/itstep";

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    let newUser = {
        idNumber: inputs1[0].value,
        phoneNumber: inputs1[1].value,
        email: inputs1[2].value,
        password: inputs1[3].value,
        password1: inputs1[4].value,
    }
    
    try{
        const resp = await fetch(myAPI, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        let result = await resp.json() //პასუხი სერვერიდან

        if(!resp.ok){
            danger(result.error)
        } else{
            alert("succeced")
            console.log(result)
        }
        

    }   catch(error){
        console.error(error)
    }

})


function danger(err){
    al_danger.innerText = err
    al_danger.style.opacity=1
    setTimeout(() =>{
        al_danger.style.opacity=0
    }, 1350)
}




