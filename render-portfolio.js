const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * RENDER PORTFOLIO PIPELINE SCRIPT
 * Multi-Threaded 4K 60FPS Batch Renderer with 8x Concurrency and JPEG Image Format Clamping
 */
const outputDir = 'D:\\remotion+Adobe\\Output\\Output 2';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function renderComposition(comp, outputName, seed = 999) {
  const tempPropsFile = path.join(__dirname, `temp_props_${seed}.json`);
  fs.writeFileSync(tempPropsFile, JSON.stringify({ videoSeed: seed }, null, 2), 'utf-8');

  const outputPath = path.join(outputDir, outputName);
  console.log(`\n🎬 Initiating 8x Multi-Threaded Render for ${comp} -> ${outputName}...`);

  try {
    execSync(
      `npx remotion render ${comp} "${outputPath}" --props="${tempPropsFile.replace(/\\/g, '/')}" --gl=angle --concurrency=8 --image-format=jpeg`,
      { stdio: 'inherit', cwd: __dirname }
    );
    console.log(`✅ Successfully compiled ${comp} -> ${outputPath}`);
  } catch (err) {
    console.error(`❌ Render failed for ${comp}:`, err.message);
  } finally {
    if (fs.existsSync(tempPropsFile)) {
      fs.unlinkSync(tempPropsFile);
    }
  }
}

// Example invocation if run directly
if (require.main === module) {
  const targetComp = process.argv[2] || 'NeuralSupercomputerGrid';
  const targetOutput = process.argv[3] || '032_Neural_Supercomputer_Data_Pathways_Fluid_Grid_4K_60fps_10s.mp4';
  const targetSeed = parseInt(process.argv[4] || '999', 10);
  renderComposition(targetComp, targetOutput, targetSeed);
}

module.exports = { renderComposition };
