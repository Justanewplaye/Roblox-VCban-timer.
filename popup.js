document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({ action: "fetchBanStatus" }, (response) => {
        const statusEl = document.querySelector(".status");

        if (response.error) {
            statusEl.textContent = "Error fetching ban status.";
            return;
        }

        // Check if the user is banned and `bannedUntil` exists
        if (response.isBanned && response.bannedUntil !== null) {
            const banEndTime = new Date(response.bannedUntil * 1000); // Convert seconds to milliseconds

            if (isNaN(banEndTime)) { 
                statusEl.textContent = "Ban expiration time is unavailable.";
                return;
            }

            const now = new Date();
            let timeLeft = Math.max(0, (banEndTime - now) / 1000); // Convert milliseconds to seconds
            let timeString = "";

            if (timeLeft >= 86400) { // More than a day
                const days = Math.floor(timeLeft / 86400);
                timeString = `${days} day${days !== 1 ? "s" : ""} remaining`;
            } else if (timeLeft >= 3600) { // More than an hour
                const hours = Math.floor(timeLeft / 3600);
                timeString = `${hours} hour${hours !== 1 ? "s" : ""} remaining`;
            } else if (timeLeft >= 60) { // More than a minute
                const minutes = Math.floor(timeLeft / 60);
                timeString = `${minutes} minute${minutes !== 1 ? "s" : ""} remaining`;
            } else { // Less than a minute
                timeString = `${Math.floor(timeLeft)} second${timeLeft !== 1 ? "s" : ""} remaining`;
            }

            statusEl.textContent = `Ban expires in: ${timeString}.`;
        } else {
            statusEl.textContent = "You are not banned from VC!";
        }
    });
});
