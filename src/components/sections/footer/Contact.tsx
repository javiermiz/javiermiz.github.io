import React, {
  useRef,
  useState,
  useCallback,
  type FormEvent,
  type ChangeEvent,
} from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_eza42dt',
  TEMPLATE_ID: 'template_2am292h',
  PUBLIC_KEY: 'Qd_8bcOarGSz-Xyfp',
} as const;

interface FormData {
  name: string;
  email: string;
  message: string;
}

const INITIAL_FORM_STATE: FormData = {
  name: '',
  email: '',
  message: '',
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface StatusConfig {
  className: string;
  message: string;
  icon?: JSX.Element;
}

const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      if (form.current) {
        const result = await emailjs.sendForm(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          form.current,
          EMAILJS_CONFIG.PUBLIC_KEY
        );
        console.log(result.text);
        setStatus('success');
        setFormData(INITIAL_FORM_STATE);
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setStatus('error');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setFormData(INITIAL_FORM_STATE);
  };

  const renderStatusMessage = (): JSX.Element => {
    const statusConfig: Record<FormStatus, StatusConfig> = {
      idle: { className: '', message: '' },
      sending: {
        className: 'text-primary animate-pulse',
        message: 'Enviando mensaje...',
      },
      success: {
        className: 'text-green-600',
        message: '¡Mensaje enviado con éxito!',
        icon: (
          <svg
            className='w-16 h-16 text-green-500 mb-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 13l4 4L19 7'
            />
          </svg>
        ),
      },
      error: {
        className: 'text-red-600',
        message: 'Error al enviar. Inténtalo de nuevo.',
        icon: (
          <svg
            className='w-16 h-16 text-red-500 mb-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        ),
      },
    };

    const { className, message, icon } = statusConfig[status];

    return (
      <div className='flex flex-col items-center justify-center h-full'>
        {icon}
        <span className={`text-2xl font-medium ${className}`}>{message}</span>
        {status !== 'sending' && status !== 'idle' && (
          <button
            onClick={resetForm}
            className='mt-4 bg-secondary text-white font-bold py-2 px-4 rounded-full hover:bg-secondary-dark transition duration-300'
          >
            {status === 'success' ? 'Enviar otro mensaje' : 'Volver a intentar'}
          </button>
        )}
      </div>
    );
  };

  const renderForm = (): JSX.Element => (
    <form ref={form} onSubmit={handleSubmit} className='space-y-6'>
      <input
        type='text'
        name='name'
        placeholder='Tu nombre'
        value={formData.name}
        onChange={handleChange}
        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
        required
      />
      <input
        type='email'
        name='email'
        placeholder='Tu email'
        value={formData.email}
        onChange={handleChange}
        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
        required
      />
      <textarea
        name='message'
        placeholder='Cuéntame tu idea increíble'
        value={formData.message}
        onChange={handleChange}
        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
        rows={4}
        required
      ></textarea>
      <button
        type='submit'
        className='w-full bg-secondary text-white font-bold py-3 px-6 rounded-full hover:bg-secondary-dark transition duration-300'
      >
        Enviar Mensaje
      </button>
    </form>
  );

  return status !== 'idle' ? renderStatusMessage() : renderForm();
};

export default ContactForm;
