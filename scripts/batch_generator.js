const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const maxCores = os.cpus().length || 8;

// Target paths
const dataPath = path.join(__dirname, '../data/videos_to_render.json');
const tempPropsPath = path.join(__dirname, '../data/.temp_props.json');
const outputDir = 'D:\\remotion+Adobe\\Output\\Output 2';
const csvOutputPath = path.join(outputDir, 'adobe_stock_manifest.csv');

if (!fs.existsSync(dataPath)) {
  console.error("❌ Error: data/videos_to_render.json file not found!");
  process.exit(1);
}
const videos = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

console.log(`🚀 Master Batch Generator Initialized for ${videos.length} assets (${maxCores}x CPU Core Acceleration)...`);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let newRows = [];

videos.forEach((video, index) => {
  console.log(`\n📦 [${index + 1}/${videos.length}] Staging Profile (${video.id}): ${video.title || video.id}`);

  const outputFilename = `${video.id}_4K_60fps_10s.mp4`;
  const outputPath = path.join(outputDir, outputFilename);

  const compName = video.composition || (video.type ? 'FinancialGraphBullish' : 'MasterEditorialComposition');

  let propsPayload = {};

  if (compName.startsWith('FinancialGraph') || video.type) {
    propsPayload = {
      type: video.type || 'bullish_growth',
      primaryColor: video.primaryColor || '#00E5FF',
      secondaryColor: video.secondaryColor || '#FF9900',
      showCandles: video.showCandles !== undefined ? video.showCandles : true,
      showVolumeBars: video.showVolumeBars !== undefined ? video.showVolumeBars : true,
      showTrendArrow: video.showTrendArrow !== undefined ? video.showTrendArrow : true,
      showGridScales: video.showGridScales !== undefined ? video.showGridScales : true
    };
  } else {
    propsPayload = {
      niche: video.niche,
      videoSeed: video.videoSeed !== undefined ? video.videoSeed : index + 101,
      geometryType: video.geometryType || 'trig_wave',
      bgType: video.bgType || 'grid_mesh',
      typeStyle: video.typeStyle || 'editorial_hero',
      threeMeshType: video.threeMeshType || 'particle_swarm',
      layoutVariant: video.layoutVariant,
      title: video.title,
      subtitle: video.subtitle,
      customGlow: video.customGlow || undefined,
      customBg: video.customBg || undefined,
      customCoreLight: video.customCoreLight || undefined
    };
  }

  fs.writeFileSync(tempPropsPath, JSON.stringify(propsPayload, null, 2), 'utf-8');
  console.log(`📝 Props staged safely for ${compName}.`);

  console.log(`🎬 Initiating ${maxCores}x Multi-Threaded Remotion render (${compName} -> 4K 60FPS)...`);
  
  try {
    execSync(
      `npx remotion render ${compName} "${outputPath}" --props="${tempPropsPath.replace(/\\/g, '/')}" --gl=angle --concurrency=${maxCores} --image-format=jpeg`,
      { stdio: 'inherit', cwd: path.join(__dirname, '..') }
    );
    console.log(`✅ Render successful! Asset saved to Output 2.`);
    
    newRows.push(`"${outputFilename}","${video.title || video.id}","${video.keywords || 'motion graphics, 4k, 60fps'}"`);
  } catch (error) {
    console.error(`❌ Process Error: Failed compiling item ${video.id}:`, error.message);
  }
});

if (fs.existsSync(tempPropsPath)) {
  fs.unlinkSync(tempPropsPath);
}

if (newRows.length > 0) {
  let existingContent = "Filename,Title,Keywords\n";
  if (fs.existsSync(csvOutputPath)) {
    try {
      existingContent = fs.readFileSync(csvOutputPath, 'utf-8').trim() + "\n";
    } catch (e) {}
  }

  const rowsToAdd = newRows.filter(row => !existingContent.includes(row.split(',')[0]));
  const finalCsv = existingContent + (rowsToAdd.length > 0 ? rowsToAdd.join('\n') + '\n' : '');

  try {
    fs.writeFileSync(csvOutputPath, finalCsv, 'utf-8');
    console.log(`🎉 Pipeline cycle completed. Metadata saved to: ${csvOutputPath}`);
  } catch (err) {
    console.error("❌ Failed writing CSV manifest:", err.message);
  }
}
