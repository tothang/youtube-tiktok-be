const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['app/index.ts'], // Entry point for your application
    bundle: true,                 // Bundle all dependencies
    minify: true,                 // Minify the output for smaller size
    sourcemap: true,              // Generate source maps
    platform: 'node',             // Target Node.js environment
    target: 'node18',             // Node.js version
    outfile: 'dist/index.js',     // Output file
    loader: { '.ts': 'ts' }, // Handle TypeScript files
    external: ['sharp']
}).catch(() => process.exit(1));
