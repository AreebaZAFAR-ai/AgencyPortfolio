import { SplitText } from "gsap/SplitText";
import { gsap } from "./gsap";

// Kept out of lib/gsap so only components that split text pay for SplitText.
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

export { SplitText };
