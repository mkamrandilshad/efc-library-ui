#!/usr/bin/env node

/**
 * Test library compatibility against different Node.js and React versions
 * 
 * This script tests all combinations of Node.js and React versions.
 * Requires nvm (Node Version Manager) to be installed for Node version testing.
 * 
 * Usage: node scripts/test-compatibility.js
 * 
 * Note: If nvm is not available, it will test React versions with current Node version only.
 */

const { execSync } = require('child_process');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Test versions matching CI matrix
const testVersions = {
  node: ['18', '20', '22'],
  react: ['18.0.0', '18.2.0', '18.3.0'],
};

// Check if nvm is available
function hasNvm() {
  try {
    // Try to source nvm and check if it's available
    execSync('command -v nvm || [ -s "$HOME/.nvm/nvm.sh" ]', { 
      shell: '/bin/bash',
      stdio: 'ignore' 
    });
    return true;
  } catch {
    // Try alternative check
    try {
      execSync('bash -c "source ~/.nvm/nvm.sh && nvm --version"', { 
        stdio: 'ignore' 
      });
      return true;
    } catch {
      return false;
    }
  }
}

// Get current Node version
function getCurrentNodeVersion() {
  try {
    return execSync('node --version', { encoding: 'utf-8' }).trim();
  } catch {
    return 'unknown';
  }
}

// Switch Node version using nvm
async function switchNodeVersion(version) {
  if (!hasNvm()) {
    return false;
  }
  
  try {
    // Source nvm and switch version
    const command = `bash -c "source ~/.nvm/nvm.sh && nvm use ${version} && node --version"`;
    const output = await exec(command);
    const actualVersion = output.stdout.trim();
    log(`   Switched to Node ${actualVersion}`, 'cyan');
    return true;
  } catch (error) {
    // Try to install if version not available
    try {
      log(`   Installing Node ${version}...`, 'yellow');
      await exec(`bash -c "source ~/.nvm/nvm.sh && nvm install ${version}"`);
      await exec(`bash -c "source ~/.nvm/nvm.sh && nvm use ${version}"`);
      return true;
    } catch (installError) {
      log(`   ⚠️  Could not switch to Node ${version}: ${installError.message}`, 'yellow');
      return false;
    }
  }
}

// Test React version with current Node
async function testReactVersion(reactVersion) {
  try {
    // Install React version
    execSync(`npm install --no-save react@${reactVersion} react-dom@${reactVersion}`, {
      stdio: 'inherit'
    });
    
    // Build
    execSync('npm run build', { stdio: 'inherit' });
    
    // Type check
    execSync('npm run type-check', { stdio: 'inherit' });
    
    return { status: 'PASS' };
  } catch (error) {
    return { status: 'FAIL', error: error.message };
  }
}

// Test a specific Node + React combination
async function testCombination(nodeVersion, reactVersion, currentNodeVersion) {
  const nodeKey = nodeVersion || currentNodeVersion;
  
  log(`\n   🧪 Testing Node ${nodeKey} + React ${reactVersion}...`, 'blue');
  
  // Switch Node version if nvm is available and version specified
  let nodeSwitched = false;
  if (nodeVersion && hasNvm()) {
    nodeSwitched = await switchNodeVersion(nodeVersion);
    if (!nodeSwitched) {
      return {
        node: nodeVersion,
        react: reactVersion,
        status: 'SKIP',
        error: 'Could not switch Node version'
      };
    }
    
    // Reinstall dependencies with new Node version
    log(`   Installing dependencies...`, 'yellow');
    try {
      execSync('npm ci', { stdio: 'inherit' });
    } catch {
      // Fallback to npm install if npm ci fails
      execSync('npm install', { stdio: 'inherit' });
    }
  }
  
  // Test React version
  const result = await testReactVersion(reactVersion);
  
  return {
    node: nodeKey,
    react: reactVersion,
    ...result
  };
}

async function testCompatibility() {
  log('🚀 Starting Compatibility Tests\n', 'blue');
  
  const nvmAvailable = hasNvm();
  const currentNodeVersion = getCurrentNodeVersion();
  
  log('Environment:', 'cyan');
  log(`  Current Node: ${currentNodeVersion}`, 'cyan');
  log(`  nvm available: ${nvmAvailable ? '✅ Yes' : '❌ No'}`, nvmAvailable ? 'green' : 'yellow');
  
  if (!nvmAvailable) {
    log('\n⚠️  nvm not detected. Testing React versions with current Node version only.', 'yellow');
    log('   To test Node versions, install nvm: https://github.com/nvm-sh/nvm', 'yellow');
    log(`   Testing with Node ${currentNodeVersion}\n`, 'yellow');
  }
  
  const results = [];
  const nodeVersionsToTest = nvmAvailable ? testVersions.node : [null];
  
  // Test each Node version
  for (const nodeVersion of nodeVersionsToTest) {
    if (nodeVersion) {
      log(`\n📦 Testing Node.js ${nodeVersion}`, 'blue');
    } else {
      log(`\n📦 Testing with current Node.js ${currentNodeVersion}`, 'blue');
    }
    
    // Test each React version with this Node version
    for (const reactVersion of testVersions.react) {
      const result = await testCombination(nodeVersion, reactVersion, currentNodeVersion);
      results.push(result);
      
      if (result.status === 'PASS') {
        log(`   ✅ PASSED`, 'green');
      } else if (result.status === 'FAIL') {
        log(`   ❌ FAILED: ${result.error}`, 'red');
      } else {
        log(`   ⏭️  SKIPPED: ${result.error}`, 'yellow');
      }
    }
  }
  
  // Restore original state
  log('\n🔄 Restoring original setup...', 'yellow');
  
  if (nvmAvailable) {
    // Try to restore original Node version
    try {
      await exec(`bash -c "source ~/.nvm/nvm.sh && nvm use ${currentNodeVersion}"`);
    } catch {
      // Ignore if we can't restore
    }
  }
  
  // Restore original dependencies
  execSync('npm install', { stdio: 'inherit' });
  
  // Print summary
  log('\n📊 Test Results Summary:', 'blue');
  console.table(results);
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const skipped = results.filter(r => r.status === 'SKIP').length;
  
  log(`\n✅ Passed: ${passed}`, 'green');
  if (failed > 0) {
    log(`❌ Failed: ${failed}`, 'red');
  }
  if (skipped > 0) {
    log(`⏭️  Skipped: ${skipped}`, 'yellow');
  }
  
  if (failed > 0) {
    log('\n💡 Tip: Check CI/CD for full compatibility matrix testing', 'yellow');
    process.exit(1);
  } else if (passed > 0) {
    log(`\n🎉 All tests passed!`, 'green');
    if (!nvmAvailable) {
      log('💡 Install nvm to test multiple Node.js versions locally', 'yellow');
    }
  }
}

// Run tests
testCompatibility().catch(error => {
  log(`\n💥 Fatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});