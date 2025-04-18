// js/worker.js

self.onmessage = function(e) {
    if (e.data === "start") {
        let sum = 0;
        for (let i = 1; i <= 10; i++) sum += i;
        postMessage(sum);
    }
};
