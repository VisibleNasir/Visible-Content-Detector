import { Cover } from "@/components/ui/cover";
import { TextShimmerWaveBasic } from "./textshimmer";

export function CoverDemo() {
    return (
        <div className="text-4xl md:text-4xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700">
                Spot the Harm and Stay Safe ! <br /><Cover> — Team Chaincare </Cover>
            </h1>
            <TextShimmerWaveBasic/>
        </div>
    );
}
