const priceRange = {
    "10K": 8,
    "50K": 12,
    "100K": 16,
    "500K": 24,
    "1M": 36,
};

const sliderBar = document.getElementById("slider-bar"),
      min = sliderBar.min,
      max = sliderBar.max,
      viewsNum = document.getElementById("views-num"),
      value = sliderBar.value,
      price = document.getElementById("price"),
      perMonth= document.getElementById("per-month"),
      toggleSwitch = document.getElementById("toggle");
  
function toggle() {
    // Update background-color of toggle-label to cyan color when switch on
    toggleSwitch.addEventListener("click", () => {
        document.getElementsByClassName("main-container")[0].classList.toggle("switch-on");
        
        // And update per-month pricing based on yearly billing
        if (toggleSwitch.checked) {
            perMonth.textContent = " / year";
            for (let key in priceRange) {
                priceRange[key] *= 0.75;
            }
        } else {
            perMonth.textContent = " / month";
            // Reset priceRange object to original prices
            Object.assign(priceRange, {
                "10K": 8,
                "50K": 12,
                "100K": 16,
                "500K": 24,
                "1M": 36,
            });
        }
        // Call the sliderBar.oninput function to update the price immediately
        sliderBar.oninput();
    });
}
  
toggle(); // Call toggle function outside of sliderBar.oninput

sliderBar.style.background = `linear-gradient(to right, hsl(174, 77%, 80%) 0%, hsl(174, 77%, 80%) ${(value-min)/(max-min)*100}%, hsl(224, 65%, 95%) ${(value-min)/(max-min)*100}%, hsl(224, 65%, 95%) 100%)`;

sliderBar.oninput = function() {
    this.style.background = `linear-gradient(to right, hsl(174,77%,80%) 0%, hsl(174,77%,80%) ${(this.value-this.min)/(this.max-this.min)*100}%, hsl(224,65%,95%) ${(this.value-this.min)/(this.max-this.min)*100}%, hsl(224,65%,95%) 100%)`;

    const [key, value] = Object.entries(priceRange)[sliderBar.value]; //[['10K':8], ['50K':12], ...]

    if (!document.getElementById("toggle").checked) {
        viewsNum.textContent = `${key} PAGEVIEWS`;
        price.textContent = `$${value}.00`;
    } else {
        perMonth.textContent = " / year";
        price.textContent = `$${value}.00`;
    }
};

// Another way of writing code line 53-61
// let entries = Object.entries(priceRange); //[['10K':8], ['50K':12], ...]
//     if (!document.getElementById("toggle").checked) {
//         viewsNum.textContent = `${entries[sliderBar.value][0]} PAGEVIEWS`;
//         price.textContent = `$${entries[sliderBar.value][1]}.00`;
//     } else {
//         perMonth.textContent = " / year";
//         price.textContent = `$${entries[sliderBar.value][1]}.00`;
//     }