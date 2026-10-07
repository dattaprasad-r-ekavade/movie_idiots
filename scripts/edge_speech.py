"""Opt-in online narration; save genuine word boundaries alongside audio."""
import asyncio
import json
import sys
import edge_tts

async def main():
    with open(sys.argv[1], encoding="utf-8-sig") as handle:
        config = json.load(handle)
    words = []
    voice = edge_tts.Communicate(config["text"], config.get("voice", "hi-IN-MadhurNeural"),
                                 rate=config.get("rate", "+8%"), pitch=config.get("pitch", "+0Hz"),
                                 volume=config.get("volume", "+0%"), boundary="WordBoundary")
    with open(config["output"], "wb") as audio:
        async for chunk in voice.stream():
            if chunk["type"] == "audio":
                audio.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                start = chunk["offset"] / 10_000_000
                words.append({"start": start, "end": start + chunk["duration"] / 10_000_000,
                              "text": chunk["text"]})
    with open(config["timing"], "w", encoding="utf-8") as timing:
        json.dump(words, timing, ensure_ascii=False)
    print(json.dumps({"voice": config.get("voice", "hi-IN-MadhurNeural"), "words": len(words)}))

asyncio.run(main())
