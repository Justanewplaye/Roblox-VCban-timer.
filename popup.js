document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({ action: "fetchBanStatus" }, (response) => {
        const statusEl = document.querySelector(".status");

        if (response.error) {
            statusEl.textContent = "Error fetching ban status.";
            return;
        }

        if (response.isBanned) {
            const banEndTime = new Date(response.banExpiration);
            const now = new Date();
            let timeLeft = Math.max(0, (banEndTime - now) / 1000);
            let timeString = "";

            if (timeLeft >= 86400) {
                const days = Math.floor(timeLeft / 86400);
                timeString = `${days} day${days !== 1 ? "s" : ""} remaining`;
            } else if (timeLeft >= 3600) {
                const hours = Math.floor(timeLeft / 3600);
                timeString = `${hours} hour${hours !== 1 ? "s" : ""} remaining`;
            } else if (timeLeft >= 60) {
                const minutes = Math.floor(timeLeft / 60);
                timeString = `${minutes} minute${minutes !== 1 ? "s" : ""} remaining`;
            } else {
                timeString = `${Math.floor(timeLeft)} second${timeLeft !== 1 ? "s" : ""} remaining`;
            }

            statusEl.textContent = `Ban expires in: ${timeString}.`;
        } else {
            statusEl.textContent = "You are not banned from VC!";
        }
    });
});
