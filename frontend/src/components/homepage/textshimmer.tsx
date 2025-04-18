import { TextShimmerWave } from '@/components/ui/text-shimmer-wave';

export function TextShimmerWaveBasic() {
    return (
        <div>
            <TextShimmerWave className='font-mono text-sm' duration={1}>
                Scroll down to  detect harfull content 
            </TextShimmerWave>
        </div>
        
    );
}
