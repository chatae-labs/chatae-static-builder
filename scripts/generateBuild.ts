#!/usr/bin/env bun

import { execSync } from "child_process";
import { existsSync, mkdirSync, copyFileSync } from "fs";
import { join } from "path";

interface BuildResult {
  id: string;
  success: boolean;
  error?: string;
}

async function processId(id: string): Promise<BuildResult> {
  const worktreePath = join(process.cwd(), id);
  const resultPath = join(worktreePath, "src", "result.tsx");
  const outputPath = join(process.cwd(), "outputs", id);
  const inputPath = join(process.cwd(), "inputs", id);

  try {
    console.log(`Processing ID: ${id}`);

    if (!existsSync(inputPath)) {
      console.error(`Input file not found at ${inputPath}`);
      return {
        id,
        success: false,
        error: `Input file not found at ${inputPath}`,
      };
    }

    if (existsSync(worktreePath)) {
      execSync(`git worktree remove --force ${id}`, { stdio: "inherit" });
    }

    // Create git worktree
    console.log(`Creating worktree for ${id}...`);
    execSync(`git worktree add -f ${id} main`, { stdio: "inherit" });

    // Move file into worktree
    execSync(`mv ${inputPath} ${resultPath}`, {
      stdio: "inherit",
    });

    // Run build in worktree
    console.log(`Building ${id}...`);
    execSync("bun run build", {
      cwd: worktreePath,
      stdio: "inherit",
    });

    // Create output directory
    if (!existsSync(outputPath)) {
      mkdirSync(outputPath, { recursive: true });
    }

    // Copy dist/index.html to outputs/ID/index.html
    const sourceFile = join(worktreePath, "dist", "index.html");
    const targetFile = join(outputPath, "index.html");

    if (existsSync(sourceFile)) {
      copyFileSync(sourceFile, targetFile);
      console.log(`Copied build output for ${id}`);
    } else {
      throw new Error(`Build output not found at ${sourceFile}`);
    }

    // Clean up worktree
    console.log(`Cleaning up worktree for ${id}...`);
    execSync(`git worktree remove --force ${id}`, { stdio: "inherit" });

    console.log(`Successfully processed ${id}`);
    return { id, success: true };
  } catch (error) {
    console.error(`Error processing ${id}:`, error);

    // Attempt to clean up worktree even if there was an error
    try {
      if (existsSync(worktreePath)) {
        execSync(`git worktree remove --force ${id}`, { stdio: "inherit" });
      }
    } catch (cleanupError) {
      console.error(`Failed to cleanup worktree for ${id}:`, cleanupError);
    }

    return {
      id,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: bun run generateBuild.ts <ID1> [ID2] [ID3] ...");
    console.error("Example: bun run generateBuild.ts feature-123 bugfix-456");
    process.exit(1);
  }

  const ids = args;
  console.log(`Processing ${ids.length} IDs: ${ids.join(", ")}`);

  // Ensure outputs directory exists
  const outputsDir = join(process.cwd(), "outputs");
  if (!existsSync(outputsDir)) {
    mkdirSync(outputsDir, { recursive: true });
  }

  // Process all IDs in parallel
  const startTime = Date.now();
  const results = await Promise.all(ids.map((id) => processId(id)));
  const endTime = Date.now();

  // Report results
  console.log("\n=== Build Results ===");
  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`Total processed: ${results.length}`);
  console.log(`Successful: ${successful.length}`);
  console.log(`Failed: ${failed.length}`);
  console.log(`Time taken: ${endTime - startTime}ms`);

  if (successful.length > 0) {
    console.log("\nSuccessful builds:");
    successful.forEach((r) => console.log(`  ✓ ${r.id}`));
  }

  if (failed.length > 0) {
    console.log("\nFailed builds:");
    failed.forEach((r) => console.log(`  ✗ ${r.id}: ${r.error}`));
  }

  // Exit with error code if any builds failed
  if (failed.length > 0) {
    process.exit(1);
  }

  console.log("\nAll builds completed successfully!");
}

// Run the main function
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
