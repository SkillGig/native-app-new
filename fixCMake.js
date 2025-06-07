// fixCMake.js
const fs = require('fs');
const path = require('path');

const cmakePath = path.join(__dirname, 'android', 'app', 'build', 'generated', 'autolinking', 'src', 'main', 'jni', 'Android-autolinking.cmake');

if (!fs.existsSync(cmakePath)) {
    console.error('❌ CMake file not found:', cmakePath);
    process.exit(1);
}

console.log('✅ Found CMake file, patching:', cmakePath);

let content = fs.readFileSync(cmakePath, 'utf8');

// Patch all add_subdirectory(...) calls
const patchedContent = content.replace(/add_subdirectory\(([^)]+)\)/g, (match, p1) => {
    const cleanedPath = p1.trim();
    return `if (EXISTS "${cleanedPath}")\n    add_subdirectory(${cleanedPath})\nendif()`;
});

fs.writeFileSync(cmakePath, patchedContent, 'utf8');

console.log('🎉 Patch applied successfully! You can now build safely.');
