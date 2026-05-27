import "../config/env.js";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Question from "../models/Question.js";

const samples = [
  { topic: "Arrays", difficulty: "Medium", category: "DSA",
    title: "Two Sum Variant",
    prompt: "Given an array of integers and a target, return the indices of two numbers that add up to the target. Optimize for time complexity.",
    idealAnswer: "Use a hash map to store complement-to-index in one pass, O(n) time and O(n) space.",
    tags: ["hashmap", "array"] },
  { topic: "Trees", difficulty: "Medium", category: "DSA",
    title: "Binary Tree Level Order Traversal",
    prompt: "Return the level order traversal of a binary tree as a list of lists.",
    idealAnswer: "Use BFS with a queue, tracking level size each iteration.",
    tags: ["bfs", "tree"] },
  { topic: "System Design", difficulty: "Hard", category: "System Design",
    title: "Design a URL Shortener",
    prompt: "Design a scalable URL shortener service. Discuss schema, hashing, and read/write paths.",
    idealAnswer: "Base62 encoding of an auto-increment id, KV store for lookups, CDN for redirects, write-through cache.",
    tags: ["scalability", "design"] },
  { topic: "Behavioural", difficulty: "Easy", category: "Behavioural",
    title: "Conflict Story",
    prompt: "Tell me about a time you disagreed with a teammate. How did you resolve it?",
    idealAnswer: "Use STAR. Focus on listening, finding shared goals, and the outcome.",
    tags: ["star", "leadership"] },
];

(async () => {
  await connectDB();
  await Question.deleteMany({});
  await Question.insertMany(samples);
  console.log(`Seeded ${samples.length} questions`);
  await mongoose.disconnect();
})();
