import { eq } from "drizzle-orm";
import { db, pool } from "./db/db.js";
import { commentary, matches } from "./db/schema.js";

async function main() {
  try {
    console.log("Performing sports CRUD operations...");

    const [newMatch] = await db
      .insert(matches)
      .values({
        sport: "football",
        homeTeam: "Mumbai Strikers",
        awayTeam: "Delhi Rangers",
        status: "scheduled",
        startTime: new Date(),
      })
      .returning();

    if (!newMatch) {
      throw new Error("Failed to create match");
    }

    console.log("CREATE: New match created:", newMatch);

    const foundMatch = await db
      .select()
      .from(matches)
      .where(eq(matches.id, newMatch.id));
    console.log("READ: Found match:", foundMatch[0]);

    const [newCommentary] = await db
      .insert(commentary)
      .values({
        matchId: newMatch.id,
        minute: 12,
        sequence: 1,
        period: "first_half",
        eventType: "shot",
        actor: "A. Sharma",
        team: newMatch.homeTeam,
        message: "A. Sharma takes a shot from outside the box.",
        metadata: { xG: 0.08 },
        tags: ["attack", "shot"],
      })
      .returning();

    console.log("CREATE: New commentary created:", newCommentary);

    const [updatedMatch] = await db
      .update(matches)
      .set({ status: "live", homeScore: 1 })
      .where(eq(matches.id, newMatch.id))
      .returning();

    if (!updatedMatch) {
      throw new Error("Failed to update match");
    }

    console.log("UPDATE: Match updated:", updatedMatch);

    await db.delete(matches).where(eq(matches.id, newMatch.id));
    console.log("DELETE: Match and related commentary deleted.");

    console.log("\nCRUD operations completed successfully.");
  } catch (error) {
    console.error("Error performing CRUD operations:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
    console.log("Database pool closed.");
  }
}

main();
