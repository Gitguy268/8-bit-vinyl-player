// Usage: node reduced.js  — prefers-reduced-motion: the spin stays, arm vibration and the bump go
const { chromium } = require('playwright'); const path = require('path');
const { HTML, offKeys } = require('./lib');
(async () => {
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  await offKeys(p);
  await p.goto('file://' + path.resolve(HTML) + '?demo&debug'); await p.waitForTimeout(800);
  await p.evaluate(() => { const e = document.getElementById('impSlider'); e.value = 1; e.dispatchEvent(new Event('input')); });
  await p.click('#playBtn'); await p.waitForTimeout(4200);
  const s = await p.evaluate(async () => {
    const tf = () => document.getElementById('discCanvas')._deg, arm = () => document.getElementById('tonearm').style.transform;
    const a = [tf()], arms = [];
    for (let i = 0; i < 30; i++) { await new Promise(r => requestAnimationFrame(r)); a.push(tf()); arms.push(parseFloat(arm().match(/rotate\(([-\d.]+)/)[1])); }
    const jitter = Math.max(...arms.slice(1).map((v, i) => Math.abs(v - arms[i])));
    return { spinning: new Set(a).size > 10, armStepMax: jitter, bump: document.getElementById('turntable').classList.contains('bump') };
  });
  console.log(`reduced motion: record spinning ${s.spinning}; largest arm step between frames ${s.armStepMax.toFixed(4)}° (groove drift only, shown in 0.25° steps); bump animation ${s.bump}`);
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no console errors');
  await b.close();
})();
