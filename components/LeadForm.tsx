import { useLanguage } from '@/providers/language.provider';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { IconArrow, IconQuestionMark } from './Icons';
import Typography, { AnimatedTypoRef } from './Typography';

interface LeadFormProps {
  className?: string;
  isDark?: boolean;
  animate?: boolean;
}

export interface AnimatedLeadFormRef {
  play: () => gsap.core.TimelineChild;
  reverse: () => gsap.core.TimelineChild;
}

const LeadForm = forwardRef<AnimatedLeadFormRef, LeadFormProps>(({ className, isDark }, ref) => {
  const typographyRef = useRef<AnimatedTypoRef>(null);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const lineRef = useRef(null);
  const arrowRef = useRef(null);

  const [email, setEmail] = useState('');

  const { contextSafe } = useGSAP();
  const { isFrench } = useLanguage();

  useGSAP(() => {
    if (!ref) return;
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left' });
    gsap.set(inputRef.current, { yPercent: 100 });
    gsap.set(arrowRef.current, { x: -50, y: 50 });
    gsap.set(wrapperRef.current, { opacity: 1 });
  }, []);

  const play = contextSafe(() => {
    if (!typographyRef.current) return gsap.timeline();

    gsap.killTweensOf([typographyRef.current, lineRef.current, inputRef.current, arrowRef.current]);

    return gsap
      .timeline()
      .set(lineRef.current, { scaleX: 0, transformOrigin: 'left' })
      .set(inputRef.current, { yPercent: 100 })
      .set(arrowRef.current, { x: -50, y: 50 })
      .set(wrapperRef.current, { opacity: 1 })
      .add(typographyRef.current.play())
      .to(
        lineRef.current,
        {
          transformOrigin: 'left',
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '<',
      )
      .to(
        inputRef.current,
        {
          yPercent: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '<',
      )
      .to(
        arrowRef.current,
        {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power2.in',
        },
        '<',
      );
  });

  const reverse = contextSafe(() => {
    if (!typographyRef.current) return gsap.timeline();

    gsap.killTweensOf([typographyRef.current, lineRef.current, inputRef.current, arrowRef.current]);

    return gsap
      .timeline()
      .add(typographyRef.current.reverse())
      .to(
        arrowRef.current,
        {
          x: 50,
          y: -50,
          duration: 0.4,
          ease: 'power2.in',
        },
        '<',
      )
      .to(
        lineRef.current,
        {
          scaleX: 0,
          transformOrigin: 'right',
          duration: 0.6,
          ease: 'power2.in',
        },
        '<',
      )
      .to(
        inputRef.current,
        {
          yPercent: 100,
          duration: 0.6,
          ease: 'power2.in',
        },
        '<',
      )
      .set(wrapperRef.current, { opacity: 0 });
  });

  useImperativeHandle(ref, () => ({
    play,
    reverse,
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log(email);
  };

  return (
    <div ref={wrapperRef} className={className}>
      <div className="flex items-center gap-5 pb-3">
        <Typography
          ref={ref ? typographyRef : null}
          className={clsx('p3', isDark ? 'text-black' : 'text-white')}
          variant="h3"
        >
          {isFrench ? 'Rejoignez notre newsletter ' : 'Join our newsletter '}
        </Typography>
        <IconQuestionMark color={COLORS.YELLOW} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center overflow-hidden">
          <input
            ref={inputRef}
            name="email"
            placeholder="johndoe@company.com"
            type="email"
            value={email}
            className={clsx(
              'p3 w-full py-4',
              isDark ? 'placeholder-black-30 text-black' : 'placeholder-white-30 text-white',
            )}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button ref={arrowRef} aria-label="Send" className="ml-4" type="submit">
            <IconArrow className="rotate-45" color={isDark ? COLORS.BLACK : COLORS.WHITE} />
          </button>
          <div
            ref={lineRef}
            className={clsx(
              'absolute bottom-0 left-0 h-px w-full origin-left',
              isDark ? 'bg-black' : 'bg-white',
            )}
          />
        </div>
      </form>
    </div>
  );
});

export default LeadForm;
