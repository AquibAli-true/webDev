      const btn = document.getElementById("parTog");
      btn.addEventListener("click", () => {
        const currentState = btn.getAttribute("data-active");
        if (currentState === "true") {
          btn.setAttribute("data-active", "false");
        } else {
          btn.setAttribute("data-active", "true");
        }
      });