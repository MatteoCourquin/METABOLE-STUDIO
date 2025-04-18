import { useLanguage } from '@/providers/language.provider';
import { postSubscribeNewsletter } from '@/services/newsletter.service';
import { COLORS, FORM_STATUS } from '@/types';
import { NewsletterSubscribeData } from '@/types/newsletter.type';
import { isEmail } from '@/utils/validation.utils';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import Hint from './Hint';
import { IconArrow, IconQuestionMark } from './Icons';
import Input, { AnimatedIputRef } from './Input';
import Typography from './Typography';

interface LeadFormProps {
  className?: string;
  isDark?: boolean;
  animate?: boolean;
}

const SUCCESS_MESSAGES = {
  fr: 'Inscription réussie',
  en: 'Subscription successful',
};

const LeadForm = ({ className, isDark }: LeadFormProps) => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef<AnimatedIputRef>(null);
  const arrowRef = useRef(null);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [formStatus, setFormStatus] = useState(FORM_STATUS.DEFAULT);

  const { isFrench } = useLanguage();

  const subscribeNewsletter = useMutation({
    mutationFn: ({ email, lang }: NewsletterSubscribeData) =>
      postSubscribeNewsletter({ email, lang }),
    onSuccess: (data) => {
      console.info('Inscription réussie', data);
      inputRef.current?.blur();
      setFormStatus(FORM_STATUS.SUCCESS);
      setEmail('');
      setTimeout(() => {
        setFormStatus(FORM_STATUS.DEFAULT);
      }, 3000);
    },
    onError: (error) => {
      setFormStatus(FORM_STATUS.ERROR);
      setError(isFrench ? "Erreur d'inscription" : 'Subscription error');
      console.error('ERROR : ', error);
    },
    onMutate: () => {
      setFormStatus(FORM_STATUS.PENDING);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email)
      return setError(isFrench ? 'Veuillez entrer votre email' : 'Please enter your email');
    if (!isEmail(email)) return setError(isFrench ? 'Email invalide' : 'Invalid email');

    setError('');

    subscribeNewsletter.mutate({
      email: email,
      lang: isFrench ? 'fr' : 'en',
    });
  };

  return (
    <div ref={wrapperRef} className={clsx(className, 'relative')}>
      <div className="flex items-center gap-5 pb-3">
        <Typography className={clsx('p3', isDark ? 'text-black' : 'text-white')} variant="h2">
          {isFrench ? 'Rejoignez notre newsletter ' : 'Join our newsletter '}
        </Typography>
        <button ref={containerRef} className="cursor-help">
          <IconQuestionMark color={COLORS.YELLOW} />
          <Hint container={containerRef} isLeft={true}>
            {isFrench ? (
              <p>
                On ne spamme pas : <strong>1 mail tous les 3 mois</strong>, avec des news et du
                contenu utile !
              </p>
            ) : (
              <p>
                We don’t spam: <strong>1 email every 3 months</strong>, with news and useful
                content!
              </p>
            )}
          </Hint>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <Input
            ref={inputRef}
            className={clsx('p3 w-full py-4 pr-5')}
            errorMessage={error}
            isDark={isDark}
            isLoading={formStatus === FORM_STATUS.PENDING}
            name="email"
            placeholder="johndoe@company.com"
            type="email"
            value={email}
            successMessage={
              formStatus === FORM_STATUS.SUCCESS ? SUCCESS_MESSAGES[isFrench ? 'fr' : 'en'] : ''
            }
            onBlur={() => {
              isEmail(email) ||
                setError(
                  isFrench ? 'Veuillez entrer un email valide' : 'Please enter a valid email',
                );
              !email &&
                setError(isFrench ? 'Veuillez entrer votre email' : 'Please enter your email');
            }}
            onChange={(e) => {
              isEmail(e.target.value) && setError('');
              setEmail(e.target.value);
            }}
          />
          <button
            ref={arrowRef}
            aria-label="Send"
            className="absolute right-0 ml-4 cursor-pointer disabled:opacity-50"
            disabled={formStatus === FORM_STATUS.PENDING || formStatus === FORM_STATUS.SUCCESS}
            type="submit"
          >
            <IconArrow className="rotate-45" color={isDark ? COLORS.BLACK : COLORS.WHITE} />
          </button>
        </div>
      </form>

      <p className="text-white-30 disclaimer w-full pt-6">
        {isFrench
          ? 'En vous inscrivant, vous consentez à recevoir notre newsletter. Désinscription possible à tout moment.'
          : 'By signing up, you consent to receive our newsletter. Unsubscribe at any time.'}
      </p>
    </div>
  );
};

export default LeadForm;
