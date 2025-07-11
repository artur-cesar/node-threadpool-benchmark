const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const TASKS = 10;
const THREADPOOL_SIZE = process.env.UV_THREADPOOL_SIZE || 4;
const start = Date.now();

const resultPath = path.join(__dirname, 'results.csv')

if (!fs.existsSync(resultPath)) {
  fs.writeFileSync(resultPath, 'threads,time\n');
}

console.log(`\n🧵 UV_THREADPOOL_SIZE = ${THREADPOOL_SIZE}`)
console.log(`\🚀 Firing ${TASKS} tasks with pbkdf2...\n`)

let completed = 0;
for (let i = 0; i < TASKS; i++) {
  crypto.pbkdf2('password', 'salt', 1000000, 64, 'sha512', () => {
    const time = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`✅ Task ${i + 1} finished in ${time}s`)

    completed++;
    if (completed === TASKS) {
      const total = ((Date.now() - start) / 1000).toFixed(2)
      console.log(`\n🏁 All tasks wask concluded in ${total}s\n`)

      const outputLine = `${THREADPOOL_SIZE},${total}\n`;

      fs.appendFileSync(resultPath, outputLine);
      console.log(`📦 Saved in results.csv: [${outputLine.trim()}]`)
    }
  })
}