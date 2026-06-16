import asyncio
import os
import base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")
api_key = os.getenv("EMERGENT_LLM_KEY")

OUT = "/app/frontend/public/assets"
os.makedirs(OUT, exist_ok=True)

JOBS = {
    "hero-scene": (
        "Ultra high-end 3D product render of a sleek modern silver laptop displaying a premium "
        "dark-mode website interface, with a smartphone floating beside it also showing a dark "
        "elegant website UI. The devices float in a deep black void with cinematic studio lighting "
        "and intense electric blue (#0057FF) rim light glowing from below and behind. Glossy reflections, "
        "volumetric blue haze, subtle particles. Architectural visualization quality, 8k, photorealistic, "
        "luxury tech aesthetic, no text logos. Wide composition centered."
    ),
    "portfolio-dentaire": (
        "Premium website homepage design for a luxury dental clinic, shown perfectly fitted on a sleek "
        "modern laptop screen in a dark studio. Dark-mode elegant UI with refined typography, a clean hero "
        "section, soft electric blue accent buttons, and a sophisticated clinical interior photo. Cinematic "
        "lighting, deep black background, blue ambient glow, photorealistic 8k, luxury web design mockup."
    ),
    "portfolio-restaurant": (
        "Premium fine-dining restaurant website homepage shown on a sleek dark laptop screen in a moody "
        "black studio. Elegant dark-mode UI with a beautifully plated gourmet dish hero image, refined serif "
        "typography, warm gold and electric blue accents. Cinematic high-contrast lighting, blue ambient glow, "
        "photorealistic 8k, luxury web design mockup."
    ),
    "portfolio-beaute": (
        "Premium luxury beauty institute / spa website homepage displayed on a sleek dark laptop screen in a "
        "black studio. Minimalist elegant dark-mode UI, sophisticated typography, soft skincare and spa interior "
        "imagery, subtle electric blue accents. Cinematic lighting, deep black background, blue ambient glow, "
        "photorealistic 8k, luxury web design mockup."
    ),
    "portfolio-immobilier": (
        "Exclusive luxury real estate website homepage shown on a sleek modern laptop screen in a dark studio. "
        "Dark-mode premium UI displaying a modern black architectural villa at night with cinematic lighting, "
        "refined typography, electric blue accent buttons. Deep black background, blue ambient glow, "
        "photorealistic 8k, luxury web design mockup."
    ),
}


async def gen(name, prompt):
    chat = LlmChat(api_key=api_key, session_id=f"korix-{name}", system_message="You are a premium image generator.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=prompt)
    _, images = await chat.send_message_multimodal_response(msg)
    if images:
        data = base64.b64decode(images[0]["data"])
        path = os.path.join(OUT, f"{name}.png")
        with open(path, "wb") as f:
            f.write(data)
        print(f"OK {name} -> {path} ({len(data)} bytes)")
    else:
        print(f"FAIL {name} no image")


async def main():
    await asyncio.gather(*(gen(n, p) for n, p in JOBS.items()))


if __name__ == "__main__":
    asyncio.run(main())
