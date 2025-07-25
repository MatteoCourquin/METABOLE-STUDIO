import AnimatedText from '@/components/shared/AnimatedText';
import Button from '@/components/ui/Button';
import { IconCross } from '@/components/ui/Icons';
import ScrollButton from '@/components/ui/ScrollButton';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { useLanguage } from '@/providers/language.provider';
import { usePerformance } from '@/providers/performance.provider';
import { BREAKPOINTS, COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const wrapperVideoRef = useRef(null);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const { isFrench, getInternalPath } = useLanguage();
  const { isAtLeast } = usePerformance();
  const { contextSafe } = useGSAP();
  const isMobile = useMatchMedia(BREAKPOINTS.MD);

  const scrollAnimation = contextSafe(() => {
    ScrollTrigger.getById('philosophy-scroll')?.kill();

    if (isMobile) {
      gsap.set(titleRef.current, { x: 0 });
      gsap.set(descriptionRef.current, { x: 0 });
      gsap.set(videoRef.current, { scale: 1 });
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        id: 'philosophy-scroll',
      },
    });

    if (isAtLeast(PERFORMANCE_LEVEL.HIGH)) {
      timeline
        .fromTo(
          videoRef.current,
          {
            scale: 1,
          },
          {
            scale: 0.8,
            duration: 1,
            ease: 'none',
          },
        )
        .fromTo(
          wrapperVideoRef.current,
          {
            scale: 0.7,
          },
          {
            scale: 1,
            duration: 1,
            ease: 'none',
          },
          '<',
        );
    } else {
      timeline.fromTo(
        wrapperVideoRef.current,
        {
          scale: 0.8,
        },
        {
          scale: 1,
          duration: 1,
          ease: 'none',
        },
      );
    }
    timeline
      .fromTo(
        titleRef.current,
        {
          x: -100,
        },
        {
          x: 100,
          duration: 2,
          ease: 'none',
        },
        '<',
      )
      .fromTo(
        descriptionRef.current,
        {
          x: 100,
        },
        {
          x: -100,
          duration: 2,
          ease: 'none',
        },
        '<',
      );
  });

  useGSAP(() => {
    scrollAnimation();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="px-x-default md:px-x-double-default gap-y-y-default md:gap-y-y-default-double pb-y-double-default relative flex flex-col items-center"
    >
      <ScrollButton />
      <div className="group/image relative aspect-video w-full">
        <IconCross
          className="ease-power4-in-out absolute -top-6 -left-6 hidden transition-transform duration-500 group-hover/image:-translate-4 md:block"
          color={COLORS.BLUE}
        />
        <IconCross
          className="ease-power4-in-out absolute -top-6 -right-6 hidden transition-transform duration-500 group-hover/image:translate-x-4 group-hover/image:-translate-y-4 md:block"
          color={COLORS.BLUE}
        />
        <IconCross
          className="ease-power4-in-out absolute -right-6 -bottom-6 hidden transition-transform duration-500 group-hover/image:translate-4 md:block"
          color={COLORS.BLUE}
        />
        <IconCross
          className="ease-power4-in-out absolute -bottom-6 -left-6 hidden transition-transform duration-500 group-hover/image:-translate-x-4 group-hover/image:translate-y-4 md:block"
          color={COLORS.BLUE}
        />
        <div ref={wrapperVideoRef} className="overflow-hidden rounded-3xl">
          <div ref={videoRef} className="relative">
            <video
              src="/videos/showreel.mp4"
              className={clsx(
                'h-full w-full rounded-3xl object-cover object-top',
                !isAtLeast(PERFORMANCE_LEVEL.HIGH) && 'scale-130',
              )}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
      <div className="relative">
        <IconCross
          className="absolute top-1/2 right-1/9 hidden -translate-y-1/2 md:block"
          color={COLORS.BLUE}
        />
        <AnimatedText
          ref={titleRef}
          className="h2 relative mr-auto w-full md:w-2/3"
          duration={1.2}
          stagger={0.02}
          variant="h2"
        >
          {isFrench ? (
            <>
              <span>Metabole est un </span>
              <span className="text-blue">studio créatif</span>
              <span> qui conçoit des </span>
              <span className="text-blue">expériences interactives</span>
              <span> et </span>
              <span className="text-blue">performantes</span>
              <span>.</span>
            </>
          ) : (
            <>
              <span>Metabole is a </span>
              <span className="text-blue">creative studio</span>
              <span> that designs </span>
              <span className="text-blue">interactive</span>
              <span> and </span>
              <span className="text-blue">high-performance</span>
              <span> experiences.</span>
            </>
          )}
        </AnimatedText>
      </div>
      <div className="relative">
        <IconCross
          className="absolute top-1/2 left-1/4 hidden -translate-y-1/2 md:block"
          color={COLORS.BLUE}
        />
        <AnimatedText
          ref={descriptionRef}
          className="p2 relative ml-auto w-3/4 text-right md:w-1/2 md:text-left"
          duration={0.8}
          stagger={0.005}
        >
          {isFrench ? (
            <>
              <span>En mettant l'accent sur l'</span>
              <span className="text-blue">esthétique</span>
              <span> et l'</span>
              <span className="text-blue">accessibilité</span>
              <span>, nous imaginons des interfaces </span>
              <span className="text-blue">fluides</span>
              <span> et </span>
              <span className="text-blue">innovantes</span>
              <span>, pensées pour </span>
              <span className="text-blue">évoluer</span>
              <span> avec les besoins de </span>
              <span className="text-blue">demain</span>
              <span>.</span>
            </>
          ) : (
            <>
              <span>By focusing on </span>
              <span className="text-blue">aesthetics</span>
              <span> and </span>
              <span className="text-blue">accessibility</span>
              <span>, we imagine fluid and innovative interfaces, thought to </span>
              <span className="text-blue">evolve</span>
              <span> with the needs of tomorrow.</span>
            </>
          )}
        </AnimatedText>
      </div>

      <Button color="secondary" href={getInternalPath('/services')} scroll={false}>
        {isFrench ? 'NOS SERVICES' : 'OUR SERVICES'}
      </Button>
    </section>
  );
};

export default Philosophy;
