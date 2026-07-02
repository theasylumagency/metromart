import { LocaleProvider } from '@/lib/i18n';
import { ThemeProvider } from '@/lib/theme';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Understanding from '@/components/Understanding';
import Benchmark from '@/components/Benchmark';
import Showcase from '@/components/Showcase';
import Process from '@/components/Process';
import Risks from '@/components/Risks';
import Growth from '@/components/Growth';
import Decisions from '@/components/Decisions';
import NextStep from '@/components/NextStep';
import ThemeToast from '@/components/ThemeToast';
import VitalsWidget from '@/components/VitalsWidget';

export default function Page() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <Nav />
        <main>
          <Hero />
          <Understanding />
          <Benchmark />
          <Showcase />
          <Process />
          <Risks />
          <Growth />
          <Decisions />
          <NextStep />
        </main>
        <ThemeToast />
        <VitalsWidget />
      </LocaleProvider>
    </ThemeProvider>
  );
}
