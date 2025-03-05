chrome.runtime.onInstalled.addListener(() => {
    console.log("Roblox VC Ban Timer installed.");
});

async function getBanStatus() {
    const response = await fetch("https://voice.roblox.com/v1/settings", {
        credentials: "include"
    });

    if (!response.ok) {
        return { error: "Failed to fetch ban status" };
    }

    const data = await response.json();
    return data;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchBanStatus") {
        getBanStatus().then(sendResponse);
        return true;
    }
});
