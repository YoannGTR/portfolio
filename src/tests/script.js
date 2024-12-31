document.addEventListener("DOMContentLoaded", function () {
    const customSelect = document.getElementById("customSelectFilter");
    const selected = customSelect.querySelector(".selected");
    const options = customSelect.querySelector(".options");
    const optionItems = options.querySelectorAll(".option");

    // Toggle options display
    selected.addEventListener("click", () => {
        customSelect.classList.toggle("open");
    });

    // Handle option selection
    optionItems.forEach(option => {
        option.addEventListener("click", () => {
            const value = option.getAttribute("data-value");
            const text = option.textContent;

            // Update selected value
            selected.querySelector("span").textContent = text;

            // Remove active class from all options and set it to selected one
            optionItems.forEach(opt => opt.classList.remove("active"));
            option.classList.add("active");

            // Close dropdown
            customSelect.classList.remove("open");

            // If needed, send the value to your form or backend
            console.log("Selected value:", value);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove("open");
        }
    });
});
