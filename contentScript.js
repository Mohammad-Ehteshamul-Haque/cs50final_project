// We need to keep tract of :
// 1. number of key strokes
// 2. Number of backspace
// 3. Time since session started
// 4. number of mouse clicks
// 5. status of user (idle/active) is kept track of every minute



(function () {
    // Number 1 and 2
    let key_strokes = 0;
    let backspaces = 0;
    let mouseclicks = 0;
    let is_idle = true;
    document.addEventListener("keydown", function (event) {
        key_strokes++;
        if (event.key === "Backspace") {
            backspaces++;
        }
        is_idle = false;
    })
    document.addEventListener("click", function () {
        mouseclicks++;
        is_idle = false;
    })
    document.addEventListener("mousemove", function () {
        is_idle = false;
    })
    setInterval(() => {
        const activity = {
            ks_rate: key_strokes,
            bs_rate: backspaces,
            c_rate: mouseclicks,
            idle_status: is_idle
        }
        // Since activity is constant, we can reset the counts to 0 as data is sent to backend every minute
        key_strokes = 0;
        backspaces = 0;
        mouseclicks = 0;
        idle_status = true;
        chrome.runtime.sendMessage({
            type: "activity",
            data: activity
        });
    }, 60000);
})();
