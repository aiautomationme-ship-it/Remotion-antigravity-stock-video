const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * MASTER MASS-PRODUCTION 4K 60FPS RENDER PORTFOLIO PIPELINE
 * Enforces 12x Multi-Thread Core Acceleration (--concurrency=12)
 * and JPEG frame caching for maximum speed without sacrificing visual quality.
 */
const outputDir = 'D:\\remotion+Adobe\\Output\\Output 2';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function renderComposition(comp, outputName, seed = 999) {
  const tempPropsFile = path.join(__dirname, `temp_props_${seed}.json`);
  fs.writeFileSync(tempPropsFile, JSON.stringify({ videoSeed: seed }, null, 2), 'utf-8');

  const outputPath = path.join(outputDir, outputName);
  const isLambdaConfigured = process.env.REMOTION_LAMBDA_FUNCTION_NAME || process.env.AWS_ACCESS_KEY_ID;

  console.log(`\n🚀 [12x Core Acceleration] Initiating ${isLambdaConfigured ? 'AWS Lambda Cloud' : '12x Multi-Threaded Local'} Render: ${comp} (seed=${seed}) -> ${outputName}...`);

  try {
    const renderCmd = isLambdaConfigured
      ? `npx remotion lambda render ${comp} "${outputPath}" --props="${tempPropsFile.replace(/\\/g, '/')}" --privacy=public`
      : `npx remotion render ${comp} "${outputPath}" --props="${tempPropsFile.replace(/\\/g, '/')}" --gl=angle --concurrency=12 --image-format=jpeg`;

    execSync(renderCmd, { stdio: 'inherit', cwd: __dirname });
    console.log(`✅ Successfully compiled ${comp} -> ${outputPath}`);
  } catch (err) {
    console.error(`❌ Render failed for ${comp}:`, err.message);
  } finally {
    if (fs.existsSync(tempPropsFile)) {
      fs.unlinkSync(tempPropsFile);
    }
  }
}

if (require.main === module) {
  const targetComp = process.argv[2] || 'NeuralSupercomputerGrid';
  const targetOutput = process.argv[3] || '032_Neural_Supercomputer_Data_Pathways_Fluid_Grid_4K_60fps_10s.mp4';
  const targetSeed = parseInt(process.argv[4] || '999', 10);
  renderComposition(targetComp, targetOutput, targetSeed);
}

module.exports = { renderComposition };
