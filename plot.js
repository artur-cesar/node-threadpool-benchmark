const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync(path.join(__dirname, 'results.csv'), 'utf-8')
  .trim()
  .split('\n')
  .slice(1) //remove header

const threads = [];
const times = [];

for (const line of raw) {
  const [thread, time] = line.split(',')
  threads.push(Number(thread))
  times.push(Number(time))
}

const width = 600;
const height = 400;
const margin = 50;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, width, height)


ctx.fillStyle = '#000000';
ctx.font = '20px Arial';
ctx.fillText('Tempo Total vs Thread Pool Size', margin, 40);

const barWidth = 80;
const maxTime = Math.max(...times);
const scale = (height - margin * 2) / maxTime;

threads.forEach((thread, i) => {
  const barHeight = times[i] * scale;
  const x = margin + i * (barWidth + 40);
  const y = height - margin - barHeight;

  ctx.fillStyle = '#4682B4';
  ctx.fillRect(x, y, barWidth, barHeight);

  ctx.fillStyle = '#000000';
  ctx.font = '14px Arial';
  ctx.fillText(`${times[i].toFixed(2)}s`, x + 10, y - 10);
  ctx.fillText(`${thread} threads`, x, height - margin + 20);
});

ctx.strokeStyle = '#000000';
ctx.beginPath();
ctx.moveTo(margin, height - margin);
ctx.lineTo(width - margin + 20, height - margin);
ctx.stroke();

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('result.png', buffer);

console.log('✅ Chart saved as result.png');
