const { execSync } = require('child_process');

const PORT = process.argv[2] || '3001';

try {
  const result = execSync(`netstat -ano | findstr :${PORT}`, { encoding: 'utf8' });
  const lines = result.trim().split('\n');
  const pids = new Set();

  for (const line of lines) {
    if (line.includes('LISTENING')) {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && pid !== '0') pids.add(pid);
    }
  }

  if (pids.size === 0) {
    console.log(`Port ${PORT} is free.`);
    process.exit(0);
  }

  for (const pid of pids) {
    try {
      execSync(`taskkill /PID ${pid} /F`, { encoding: 'utf8' });
      console.log(`Killed process ${pid} on port ${PORT}`);
    } catch (e) {
      // Already dead
    }
  }
} catch (e) {
  // Port was already free
  console.log(`Port ${PORT} is already free.`);
}
