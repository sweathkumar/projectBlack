function menuOpen() {
        const menu = document.getElementById("mobileNav");
        const overlay = document.getElementById("overlay");

        if (menu.classList.contains("open")) {
          menu.classList.remove("open");
          overlay.classList.remove("visible");
        } else {
          menu.classList.add("open");
          overlay.classList.add("visible");
        }
      }

      document.addEventListener("click", function (event) {
        const nav = document.querySelector("nav");
        const menu = document.getElementById("mobileNav");
        const overlay = document.getElementById("overlay");

        if (!nav.contains(event.target) && menu.classList.contains("open")) {
          menu.classList.remove("open");
          overlay.classList.remove("visible");
        }
      });

      async function sendToAI() {
      const promptInput = document.getElementById("prompt");
      const inputbox = document.getElementById("inputbox");
      const generating = document.getElementById("generating");
      const userPrompt = promptInput.value.trim();
      if (!userPrompt) return;

      const headingEl = document.getElementById("aiHeading");
      const subheadingEl = document.getElementById("aiSubheading");
      const responseEl = document.getElementById("aiResponse");
      const sendBtn = document.getElementById("sendBtn");

      inputbox.style.display = "none";
      generating.style.display = "block";
      headingEl.textContent = userPrompt;
      subheadingEl.textContent = "Thinking...";
      promptInput.value = "";
      responseEl.innerHTML = "";
      sendBtn.disabled = true;

      try {
        debugger;
        const res = await fetch("https://open-ai-proxy-one.vercel.app/api/ask-ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: userPrompt })
        });

        const data = await res.json();
        if (!data.response) throw new Error("Empty AI response");

        const responseTime = (Math.random() * 1.5 + 1.5).toFixed(1);
        subheadingEl.textContent = `Response in ${responseTime} seconds`;
        responseEl.innerHTML = data.response;
      } catch (err) {
        console.error("Error:", err);
        subheadingEl.textContent = "Please try again later.";
        responseEl.innerHTML = "Something went wrong. Try again later.";
      }

      inputbox.style.display = "flex";
      generating.style.display = "none";
      sendBtn.disabled = false;
    }

    function openAISpace() {
    const aiSpace = document.getElementById("aiSpace");
    if (!aiSpace) return;

    aiSpace.style.display = "block";
    aiSpace.classList.remove("ai-hidden");
    aiSpace.classList.add("ai-visible");
  }

  function closeAISpace() {
    const aiSpace = document.getElementById("aiSpace");
    if (!aiSpace) return;

    aiSpace.classList.remove("ai-visible");
    aiSpace.classList.add("ai-hidden");

    // Delay hiding so animation completes
    setTimeout(() => {
      aiSpace.style.display = "none";
    }, 300);
  }

  // Open on desktop toggle
  document.getElementById("aiToggleBtn")?.addEventListener("click", () => {
    openAISpace();
  });

  // Open on mobile toggle
  document.getElementById("aiToggleBtnmob")?.addEventListener("click", () => {
    openAISpace();
  });

  // Close button (only if included in HTML)
  document.getElementById("aiCloseBtn")?.addEventListener("click", () => {
    closeAISpace();
  });

  // Open automatically on route /aispace
  window.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/aispace") {
      openAISpace();

      // Optional: hide close button
      const closeBtn = document.getElementById("aiCloseBtn");
      if (closeBtn) closeBtn.style.display = "none";
    }
  });

    const promptInput = document.getElementById("prompt");
    const sendBtn = document.getElementById("sendBtn");

    promptInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // Prevent newline
        sendBtn.click();    // Trigger button click
      }
    });

    const wrapper = document.getElementById("aiSpace");

    function handleViewportResize() {
      if (window.visualViewport) {
        function updateHeight() {
          const vh = window.visualViewport.height;
          wrapper.style.height = vh + "px";
        }

        // Initial call
        updateHeight();

        // Listen to keyboard opening/closing
        window.visualViewport.addEventListener("resize", updateHeight);
        window.visualViewport.addEventListener("scroll", updateHeight);
      } else {
        // Fallback for older browsers
        window.addEventListener("resize", () => {
          wrapper.style.height = window.innerHeight + "px";
        });
      }
    }

    handleViewportResize();