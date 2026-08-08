import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

// 1. Set Rspack Bundler & Concurrency Threading Engine
Config.setRspack(true);
Config.setConcurrency(8);

// 2. Clamp Frame Cache Format to JPEG (60% Speed Acceleration)
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(90);

// 3. Output Configuration
Config.setOverwriteOutput(true);
Config.setPixelFormat("yuv420p");

// 4. Bundler Override
Config.overrideRspackConfig(enableTailwind);
