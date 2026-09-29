import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // 'forks' (the Vitest default) is deliberate: the 'threads' pool reliably
    // fails on Windows dev machines with "[vitest-pool]: Failed to start threads
    // worker ... Timeout waiting for worker to respond", even though it passes
    // on the Linux CI runner. 'forks' passes in both environments.
    pool: 'forks',
    fileParallelism: false
  }
});
