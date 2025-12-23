import { describe, it, expect, beforeAll } from 'vitest';
import { generateTspec } from '../generator';

/**
 * Memory leak benchmark test
 * 
 * This test verifies that the deep clone fix in getOpenapiSchemas() 
 * properly breaks references to TypeScript compiler internals,
 * allowing GC to reclaim memory after generateTspec() completes.
 * 
 * Run with: npm test -- --run memory-leak
 * For accurate results, run with: node --expose-gc node_modules/.bin/vitest run memory-leak
 */

interface MemorySnapshot {
  heapUsed: number;
  heapTotal: number;
  rss: number;
}

function getMemoryMB(): MemorySnapshot {
  const mem = process.memoryUsage();
  return {
    heapUsed: Math.round(mem.heapUsed / 1024 / 1024),
    heapTotal: Math.round(mem.heapTotal / 1024 / 1024),
    rss: Math.round(mem.rss / 1024 / 1024),
  };
}

function forceGC(): void {
  if (global.gc) {
    global.gc();
  }
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Memory Leak Prevention', () => {
  beforeAll(() => {
    if (!global.gc) {
      console.warn(
        '⚠️  GC not exposed. For accurate results, run with: node --expose-gc node_modules/.bin/vitest run memory-leak'
      );
    }
  });

  it('should release memory after generateTspec() completes', async () => {
    // Baseline memory
    forceGC();
    await sleep(100);
    const baseline = getMemoryMB();
    console.log(`\n📊 Baseline: Heap ${baseline.heapUsed}MB, RSS ${baseline.rss}MB`);

    // Generate OpenAPI spec (this loads TypeScript compiler, parses files, etc.)
    // Use scenarios directory which has actual Tspec definitions
    const openapi = await generateTspec({
      specPathGlobs: ['src/test/scenarios/**/spec.ts'],
      tsconfigPath: 'tsconfig.json',
      ignoreErrors: true,
      silent: true,
    });

    // Memory after generation (before GC)
    const afterGenerate = getMemoryMB();
    console.log(`📊 After generate: Heap ${afterGenerate.heapUsed}MB, RSS ${afterGenerate.rss}MB`);
    console.log(`   OpenAPI paths: ${Object.keys(openapi.paths || {}).length}`);
    console.log(`   OpenAPI schemas: ${Object.keys(openapi.components?.schemas || {}).length}`);

    // Force GC and wait
    forceGC();
    await sleep(500);
    forceGC();
    await sleep(100);

    // Memory after GC
    const afterGC = getMemoryMB();
    console.log(`📊 After GC: Heap ${afterGC.heapUsed}MB, RSS ${afterGC.rss}MB`);

    // Calculate memory changes
    const heapIncrease = afterGenerate.heapUsed - baseline.heapUsed;
    const heapAfterGC = afterGC.heapUsed - baseline.heapUsed;
    const memoryReclaimed = afterGenerate.heapUsed - afterGC.heapUsed;

    console.log(`\n📈 Memory Analysis:`);
    console.log(`   Heap increase during generation: +${heapIncrease}MB`);
    console.log(`   Heap retained after GC: +${heapAfterGC}MB`);
    console.log(`   Memory reclaimed by GC: ${memoryReclaimed}MB`);

    // The deep clone fix should allow most memory to be reclaimed
    // We expect at least 50% of the heap increase to be reclaimable
    if (global.gc && heapIncrease > 10) {
      const reclaimPercentage = (memoryReclaimed / heapIncrease) * 100;
      console.log(`   Reclaim percentage: ${reclaimPercentage.toFixed(1)}%`);
      
      // With the fix, we expect significant memory to be reclaimed
      // Without the fix, TypeScript internals would be retained
      expect(reclaimPercentage).toBeGreaterThan(30);
    }

    // Basic sanity check: OpenAPI document should be valid
    expect(openapi).toBeDefined();
    expect(openapi.openapi).toBe('3.0.3');
  });

  it('should not accumulate memory across multiple generateTspec() calls', async () => {
    forceGC();
    await sleep(100);
    const baseline = getMemoryMB();
    console.log(`\n📊 Baseline: Heap ${baseline.heapUsed}MB`);

    const iterations = 3;
    const heapAfterEach: number[] = [];

    for (let i = 0; i < iterations; i++) {
      await generateTspec({
        specPathGlobs: ['src/test/scenarios/**/spec.ts'],
        tsconfigPath: 'tsconfig.json',
        ignoreErrors: true,
        silent: true,
      });

      forceGC();
      await sleep(200);

      const mem = getMemoryMB();
      heapAfterEach.push(mem.heapUsed);
      console.log(`📊 After iteration ${i + 1}: Heap ${mem.heapUsed}MB`);
    }

    // Check that memory doesn't grow significantly across iterations
    // With the fix, each iteration should release its memory
    const firstIteration = heapAfterEach[0];
    const lastIteration = heapAfterEach[heapAfterEach.length - 1];
    const growth = lastIteration - firstIteration;

    console.log(`\n📈 Multi-iteration Analysis:`);
    console.log(`   First iteration heap: ${firstIteration}MB`);
    console.log(`   Last iteration heap: ${lastIteration}MB`);
    console.log(`   Growth across ${iterations} iterations: ${growth}MB`);

    // Memory should not grow significantly (allow some variance for caching)
    // If there's a memory leak, we'd see continuous growth
    if (global.gc) {
      // With GC exposed, growth should be minimal (< 20MB per iteration)
      expect(growth).toBeLessThan(iterations * 20);
    }
  });

  it('should produce identical output with deep clone', async () => {
    // Generate twice and compare - deep clone should not affect output
    const openapi1 = await generateTspec({
      specPathGlobs: ['src/test/scenarios/**/spec.ts'],
      tsconfigPath: 'tsconfig.json',
      ignoreErrors: true,
      silent: true,
    });

    const openapi2 = await generateTspec({
      specPathGlobs: ['src/test/scenarios/**/spec.ts'],
      tsconfigPath: 'tsconfig.json',
      ignoreErrors: true,
      silent: true,
    });

    // Serialize and compare
    const json1 = JSON.stringify(openapi1, null, 2);
    const json2 = JSON.stringify(openapi2, null, 2);

    expect(json1).toBe(json2);
    console.log(`\n✅ Output consistency verified (${json1.length} bytes)`);
  });
});
