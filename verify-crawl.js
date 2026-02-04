
// Native fetch is global in Node 20+
import fs from 'fs';

async function checkUrl(url) {
    try {
        const res = await fetch(url);
        console.log(`Checking ${url}...`);
        console.log(`Status: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.log(`Content Preview (first 200 chars):`);
        console.log(text.substring(0, 200).replace(/\n/g, ' '));
        console.log('-----------------------------------');
        return { status: res.status, text };
    } catch (e) {
        console.error(`Failed to fetch ${url}:`, e.message);
        return { status: 0, error: e.message };
    }
}

async function verify() {
    console.log("Starting Crawlability Verification for halofy.ai...\n");

    // 1. Check robots.txt
    await checkUrl('https://halofy.ai/robots.txt');

    // 2. Check llms.txt
    await checkUrl('https://halofy.ai/llms.txt');

    // 3. Check Homepage
    await checkUrl('https://halofy.ai/');
}

verify();
