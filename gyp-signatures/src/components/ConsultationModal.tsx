'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { businessContact } from '@/data/business';

export interface ConsultationModalDetail {
  mode?: 'default' | 'offer';
  offer?: {
    badge?: string;
    discount?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    privilege?: string;
  };
}

export function openConsultationModal(detailOrEvent?: ConsultationModalDetail | unknown) {
  if (typeof window !== 'undefined') {
    const detail =
      detailOrEvent && typeof detailOrEvent === 'object' && 'mode' in (detailOrEvent as Record<string, unknown>)
        ? (detailOrEvent as ConsultationModalDetail)
        : undefined;
    window.dispatchEvent(new CustomEvent('open-consultation-modal', { detail }));
  }
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  projectType: string;
  budget: string;
  details: string;
  preferredContact: 'WhatsApp' | 'Phone Call' | 'Email';
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

const WEB3FORMS_ACCESS_KEY = '1f3ee7c5-1d93-4e5f-b86a-19cf20a39fb5';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

const PROJECT_TYPES = [
  'Signature Offer (50% Off)',
  'Interior Design',
  'Furniture',
  'Home Elements',
  'Custom Furniture',
  'Complete Home',
  'Commercial Space',
  'Other',
];

const BUDGET_RANGES = [
  '₹5L – ₹10L',
  '₹10L – ₹25L',
  '₹25L – ₹50L',
  '₹50L+',
  "I'd prefer to discuss",
];

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<'default' | 'offer'>('default');
  const [offerInfo, setOfferInfo] = useState<ConsultationModalDetail['offer'] | null>(null);

  // Honeypot spam trap
  const [botcheck, setBotcheck] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    projectType: 'Interior Design',
    budget: '',
    details: '',
    preferredContact: 'WhatsApp',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Global listener for triggers & #consultation anchor interception
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvt = e as CustomEvent<ConsultationModalDetail>;
      if (customEvt.detail?.mode === 'offer') {
        setModalMode('offer');
        setOfferInfo(customEvt.detail.offer || null);
        setFormData((prev) => ({
          ...prev,
          projectType: 'Signature Offer (50% Off)',
          details: prev.details || 'Requesting the 50% GYP Signature Studio Privilege.',
        }));
      } else {
        setModalMode('default');
        setOfferInfo(null);
      }
      setIsOpen(true);
      setIsSubmitted(false);
      setSubmitError(null);
    };

    window.addEventListener('open-consultation-modal', handleOpen);

    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href="#consultation"]');
      if (target) {
        e.preventDefault();
        setModalMode('default');
        setOfferInfo(null);
        setIsOpen(true);
        setIsSubmitted(false);
        setSubmitError(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      window.removeEventListener('open-consultation-modal', handleOpen);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  // Keyboard navigation (ESC + Tab trap)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }

      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isClosing]);

  // Modal GSAP Entry Animation & Body Scroll Lock
  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scroll and preserve scrollbar width to eliminate layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!backdrop || !panel) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out' }
      );

      tl.fromTo(
        panel,
        { opacity: 0, scale: 0.96, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );

      tl.fromTo(
        '.consult-reveal',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.04 },
        '-=0.4'
      );
    });

    // Auto focus first input after opening
    setTimeout(() => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      }
    }, 280);

    return () => {
      ctx.revert();
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  // Graceful GSAP Exit Animation
  const handleClose = () => {
    if (isClosing || !isOpen) return;
    setIsClosing(true);

    const backdrop = backdropRef.current;
    const panel = panelRef.current;

    if (backdrop && panel) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsOpen(false);
          setIsClosing(false);
          setIsSubmitted(false);
          setSubmitError(null);
          setErrors({});
        },
      });

      tl.to('.consult-reveal, .consult-success-reveal', {
        opacity: 0,
        y: 8,
        duration: 0.18,
        ease: 'power2.in',
      });

      tl.to(
        panel,
        {
          opacity: 0,
          scale: 0.97,
          y: 14,
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.08'
      );

      tl.to(
        backdrop,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.2'
      );
    } else {
      setIsOpen(false);
      setIsClosing(false);
      setIsSubmitted(false);
      setSubmitError(null);
      setErrors({});
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    const phoneClean = formData.phone.replace(/[^0-9+]/g, '');
    if (!phoneClean || phoneClean.length < 7) {
      newErrors.phone = 'Please provide a valid contact number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    // Validate fields locally
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    // Bot honeypot check
    if (botcheck) {
      setIsSubmitting(false);
      setIsSubmitted(true);
      return;
    }

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject:
        modalMode === 'offer'
          ? `Signature Offer (50% Off) Reservation — ${formData.fullName.trim()}`
          : `Private Consultation Request — ${formData.fullName.trim()}`,
      from_name: 'GYP SIGNATURES Website',
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      city: formData.location.trim() || 'Not specified',
      project_type: formData.projectType || 'General Consultation',
      budget: formData.budget || 'Not specified',
      message:
        formData.details.trim() ||
        (modalMode === 'offer' ? '50% Studio Privilege Request' : 'Consultation request from website'),
      preferred_contact: formData.preferredContact,
      botcheck: '',
    };

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success !== false) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setSubmitError(null);

        // Reset form data for future opens
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          location: '',
          projectType: 'Interior Design',
          budget: '',
          details: '',
          preferredContact: 'WhatsApp',
        });
        setErrors({});

        // Animate success reveal with GSAP
        setTimeout(() => {
          gsap.fromTo(
            '.consult-success-reveal',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
          );
        }, 50);
      } else {
        const errorMsg =
          data?.message ||
          "We couldn't send your request right now. Please try again or contact us directly.";
        setSubmitError(errorMsg);
        setIsSubmitting(false);
      }
    } catch {
      setSubmitError(
        "We couldn't send your request right now. Please try again or contact us directly."
      );
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalOverlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      {/* Cinematic Dark Translucent Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-charcoal/75 backdrop-blur-[6px] transition-opacity"
        aria-hidden="true"
      />

      {/* Editorial Modal Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-3xl my-auto bg-[#FAF8F5] border border-sand/80 shadow-2xl overflow-hidden"
        style={{ transformOrigin: 'center center' }}
      >
        {/* Subtle decorative top architectural border accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-bronze/60 to-transparent" />

        {/* Modal Inner Container */}
        <div className="p-5 sm:p-10 md:p-12 max-h-[90vh] overflow-y-auto custom-modal-scroll">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-5 sm:pb-6 mb-6 sm:mb-8 border-b border-sand/60">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/images/logo-dark.png"
                alt="GYP Signatures Logo"
                width={263}
                height={87}
                className="w-[110px] sm:w-[135px] h-auto object-contain"
              />
              <span className="hidden sm:inline-block h-4 w-[1px] bg-sand" />
              <span className="hidden sm:inline-block text-[0.65rem] tracking-[0.2em] text-stone font-light uppercase">
                Private Consultation
              </span>
            </div>

            {/* Minimal dual-line Close Button */}
            <button
              ref={closeBtnRef}
              onClick={handleClose}
              className="w-10 h-10 flex items-center justify-center text-charcoal/60 hover:text-bronze transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-bronze/40 rounded-sm group cursor-pointer"
              aria-label="Close consultation modal"
            >
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.25}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {!isSubmitted ? (
            /* Consultation Form View */
            <form onSubmit={handleSubmit} noValidate>
              {/* Invisible Honeypot Spam Trap */}
              <input
                type="checkbox"
                name="botcheck"
                checked={botcheck}
                onChange={(e) => setBotcheck(e.target.checked)}
                className="hidden"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Heading & Subtitle */}
              {modalMode === 'offer' ? (
                <div className="consult-reveal mb-6 sm:mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
                    <span className="text-overline text-bronze text-[0.65rem] tracking-[0.25em]">
                      {offerInfo?.badge || 'SIGNATURE OFFER'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                    <h2
                      id="consultation-modal-title"
                      className="heading-editorial text-3xl sm:text-4xl md:text-5xl text-charcoal leading-none font-normal"
                    >
                      {offerInfo?.discount || '50% OFF'}
                    </h2>
                    <span className="text-xs sm:text-sm tracking-[0.16em] uppercase text-bronze font-medium">
                      Limited Studio Privilege
                    </span>
                  </div>

                  <p className="font-serif italic text-sm sm:text-base text-charcoal/90 mb-4">
                    A limited Signature Offer from GYP SIGNATURES.
                  </p>

                  <div className="p-4 sm:p-5 bg-sand/20 border border-sand/70 rounded-[2px] mb-4">
                    <span className="text-[0.62rem] tracking-[0.22em] uppercase text-stone font-medium block mb-1">
                      Offer Privilege
                    </span>
                    <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed font-light">
                      {offerInfo?.privilege ||
                        '50% studio privilege on comprehensive spatial architecture, bespoke spatial blueprint, and curated interior furnishings.'}
                    </p>
                  </div>

                  <p className="font-sans text-xs text-stone font-light leading-relaxed">
                    Provide your contact details below to reserve this privilege with our senior design team.
                  </p>
                </div>
              ) : (
                <div className="consult-reveal mb-6 sm:mb-8">
                  <span className="text-overline text-bronze mb-2 block text-[0.65rem] tracking-[0.25em]">
                    Spatial Architecture & Furnishings
                  </span>
                  <h2
                    id="consultation-modal-title"
                    className="heading-editorial text-2xl sm:text-3xl md:text-4xl text-charcoal leading-[1.15] mb-2 sm:mb-3"
                  >
                    Let&apos;s create your space.
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-stone font-light leading-relaxed max-w-xl">
                    Tell us a little about what you&apos;re imagining. Our senior design studio will prepare a tailored consultation.
                  </p>
                </div>
              )}

              {/* Form Inputs Grid */}
              <div className="space-y-5 sm:space-y-6">
                {/* Row 1: Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Full Name */}
                  <div className="consult-reveal">
                    <label
                      htmlFor="modal-fullname"
                      className="block text-[0.65rem] tracking-[0.2em] uppercase font-sans text-stone mb-2 font-medium"
                    >
                      Name <span className="text-bronze">*</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      id="modal-fullname"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullname-error' : undefined}
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      placeholder="Your full name"
                      className={`w-full bg-cream/35 border ${
                        errors.fullName ? 'border-[#B54A34]' : 'border-sand/90'
                      } px-4 py-3 text-xs md:text-sm text-charcoal font-light placeholder:text-stone/40 focus:border-bronze focus:bg-ivory focus:outline-none transition-colors duration-300`}
                    />
                    {errors.fullName && (
                      <p id="fullname-error" className="text-[0.68rem] text-[#B54A34] font-light mt-1.5 tracking-wide">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="consult-reveal">
                    <label
                      htmlFor="modal-email"
                      className="block text-[0.65rem] tracking-[0.2em] uppercase font-sans text-stone mb-2 font-medium"
                    >
                      Email <span className="text-bronze">*</span>
                    </label>
                    <input
                      id="modal-email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="you@example.com"
                      className={`w-full bg-cream/35 border ${
                        errors.email ? 'border-[#B54A34]' : 'border-sand/90'
                      } px-4 py-3 text-xs md:text-sm text-charcoal font-light placeholder:text-stone/40 focus:border-bronze focus:bg-ivory focus:outline-none transition-colors duration-300`}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-[0.68rem] text-[#B54A34] font-light mt-1.5 tracking-wide">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone & Preferred Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Phone */}
                  <div className="consult-reveal">
                    <label
                      htmlFor="modal-phone"
                      className="block text-[0.65rem] tracking-[0.2em] uppercase font-sans text-stone mb-2 font-medium"
                    >
                      Mobile / Phone <span className="text-bronze">*</span>
                    </label>
                    <input
                      id="modal-phone"
                      name="phone"
                      type="tel"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="+91 93939 72660"
                      className={`w-full bg-cream/35 border ${
                        errors.phone ? 'border-[#B54A34]' : 'border-sand/90'
                      } px-4 py-3 text-xs md:text-sm text-charcoal font-light placeholder:text-stone/40 focus:border-bronze focus:bg-ivory focus:outline-none transition-colors duration-300`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-[0.68rem] text-[#B54A34] font-light mt-1.5 tracking-wide">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Preferred Contact Mode */}
                  <div className="consult-reveal">
                    <label
                      id="modal-prefcontact-label"
                      className="block text-[0.65rem] tracking-[0.2em] uppercase font-sans text-stone mb-2 font-medium"
                    >
                      Preferred Contact <span className="text-stone/60">(Optional)</span>
                    </label>
                    <div
                      role="radiogroup"
                      aria-labelledby="modal-prefcontact-label"
                      className="grid grid-cols-3 gap-2"
                    >
                      {(['WhatsApp', 'Phone Call', 'Email'] as const).map((mode) => {
                        const isSelected = formData.preferredContact === mode;
                        return (
                          <button
                            key={mode}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setFormData({ ...formData, preferredContact: mode })}
                            className={`py-3 px-2 text-center text-[0.68rem] sm:text-xs tracking-wider uppercase font-light transition-all duration-300 border cursor-pointer ${
                              isSelected
                                ? 'bg-charcoal text-ivory border-charcoal shadow-sm'
                                : 'bg-cream/35 text-charcoal/70 border-sand/90 hover:border-bronze hover:text-charcoal'
                            }`}
                          >
                            {mode}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Row 3: Project Type & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Project Type */}
                  <div className="consult-reveal">
                    <label
                      htmlFor="modal-projecttype"
                      className="block text-[0.65rem] tracking-[0.2em] uppercase font-sans text-stone mb-2 font-medium"
                    >
                      Project Type <span className="text-stone/60">(Optional)</span>
                    </label>
                    <div className="relative">
                      <select
                        id="modal-projecttype"
                        name="project_type"
                        value={formData.projectType}
                        onChange={(e) => {
                          setFormData({ ...formData, projectType: e.target.value });
                        }}
                        className="w-full bg-cream/35 border border-sand/90 px-4 py-3 text-xs md:text-sm text-charcoal font-light focus:border-bronze focus:bg-ivory focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-ivory text-stone/60">
                          Select project type...
                        </option>
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type} className="bg-ivory text-charcoal py-1">
                            {type}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Approximate Budget */}
                  <div className="consult-reveal">
                    <label
                      htmlFor="modal-budget"
                      className="block text-[0.65rem] tracking-[0.2em] uppercase font-sans text-stone mb-2 font-medium"
                    >
                      Approximate Budget <span className="text-stone/60">(Optional)</span>
                    </label>
                    <div className="relative">
                      <select
                        id="modal-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-cream/35 border border-sand/90 px-4 py-3 text-xs md:text-sm text-charcoal font-light focus:border-bronze focus:bg-ivory focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-ivory text-stone/60">
                          Select a budget range...
                        </option>
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b} className="bg-ivory text-charcoal py-1">
                            {b}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 4: Location / City */}
                <div className="consult-reveal">
                  <label
                    htmlFor="modal-location"
                    className="block text-[0.65rem] tracking-[0.2em] uppercase font-sans text-stone mb-2 font-medium"
                  >
                    City / Location <span className="text-stone/60">(Optional)</span>
                  </label>
                  <input
                    id="modal-location"
                    name="city"
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Srikalahasthi, Tirupati, Chennai, Bengaluru..."
                    className="w-full bg-cream/35 border border-sand/90 px-4 py-3 text-xs md:text-sm text-charcoal font-light placeholder:text-stone/40 focus:border-bronze focus:bg-ivory focus:outline-none transition-colors duration-300"
                  />
                </div>

                {/* Row 5: Tell us about your space / Message */}
                <div className="consult-reveal">
                  <label
                    htmlFor="modal-details"
                    className="block text-[0.65rem] tracking-[0.2em] uppercase font-sans text-stone mb-2 font-medium"
                  >
                    Tell us about your space <span className="text-stone/60">(Optional)</span>
                  </label>
                  <textarea
                    id="modal-details"
                    name="message"
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Tell us a little about what you're imagining..."
                    className="w-full bg-cream/35 border border-sand/90 px-4 py-3 text-xs md:text-sm text-charcoal font-light placeholder:text-stone/40 focus:border-bronze focus:bg-ivory focus:outline-none transition-colors duration-300 resize-none"
                  />
                </div>
              </div>

              {/* Error Notification Banner */}
              {submitError && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="consult-reveal mt-6 p-4 bg-[#FDF5F2] border border-[#C97B63]/40 rounded-[2px] text-charcoal space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B54A34]" aria-hidden="true" />
                    <span className="text-[0.68rem] tracking-[0.2em] uppercase font-medium text-[#B54A34]">
                      SOMETHING WENT WRONG
                    </span>
                  </div>
                  <p className="text-xs text-charcoal/80 font-light leading-relaxed">
                    We couldn&apos;t send your request right now. Please try again or contact our studio directly.
                  </p>
                  <div className="pt-1 flex flex-wrap items-center gap-3 text-xs">
                    <a
                      href={`tel:${businessContact.phoneTel}`}
                      className="inline-flex items-center gap-1.5 text-bronze hover:underline font-medium tracking-wider uppercase text-[0.68rem]"
                    >
                      <span>CALL {businessContact.phoneDisplay}</span>
                      <span>→</span>
                    </a>
                    <span className="text-stone/40">·</span>
                    <a
                      href={businessContact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-stone hover:text-charcoal transition-colors tracking-wider uppercase text-[0.68rem]"
                    >
                      <span>Chat on WhatsApp</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Action Footer */}
              <div className="consult-reveal mt-8 pt-6 border-t border-sand/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[0.7rem] text-stone/80 font-light tracking-wide text-center sm:text-left">
                  Your information is handled with confidentiality by our private studio.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-6 px-9 py-4 bg-charcoal text-ivory text-xs tracking-[0.2em] uppercase font-light hover:bg-bronze transition-colors duration-400 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-1 focus:ring-bronze/60"
                >
                  <span>
                    {isSubmitting
                      ? 'SENDING...'
                      : modalMode === 'offer'
                      ? 'Request This Offer'
                      : 'Submit'}
                  </span>
                  <span
                    className={`inline-block transform transition-transform duration-300 text-sm ${
                      isSubmitting ? 'opacity-40' : 'group-hover:translate-x-2'
                    }`}
                  >
                    {isSubmitting ? '···' : '→'}
                  </span>
                </button>
              </div>
            </form>
          ) : (
            /* Luxury Success Confirmation View */
            <div
              role="status"
              aria-live="polite"
              className="py-8 sm:py-12 text-center max-w-lg mx-auto"
            >
              {/* Minimalist Monogram Check */}
              <div className="consult-success-reveal w-16 h-16 mx-auto mb-6 relative flex items-center justify-center border border-bronze/50 rounded-full bg-cream/30">
                <svg
                  className="w-7 h-7 text-bronze"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>

              <span className="consult-success-reveal text-overline text-bronze mb-2 block text-[0.65rem] tracking-[0.25em]">
                {modalMode === 'offer' ? 'OFFER RESERVATION RECEIVED' : 'CONSULTATION REQUEST RECEIVED'}
              </span>

              <h3 className="consult-success-reveal heading-editorial text-2xl sm:text-3xl md:text-4xl text-charcoal mb-4">
                THANK YOU
              </h3>

              <p className="consult-success-reveal text-xs sm:text-sm text-stone font-light leading-relaxed mb-6">
                Your consultation request has been received.
                <br />
                The GYP SIGNATURES team will be in touch shortly.
              </p>

              {/* Direct channels prompt: CALL +91 93939 72660 or WHATSAPP */}
              <div className="consult-success-reveal flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-6 text-xs">
                <a
                  href={`tel:${businessContact.phoneTel}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-ivory border border-sand hover:border-bronze text-charcoal font-medium transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse" />
                  <span>CALL {businessContact.phoneDisplay}</span>
                </a>
                <span className="text-stone/50 font-light text-xs">or</span>
                <a
                  href={businessContact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-ivory border border-sand hover:border-bronze text-charcoal font-medium transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="consult-success-reveal pt-6 border-t border-sand/60 mb-8">
                <span className="heading-display text-xs text-charcoal/90 tracking-[0.2em]">
                  GYP SIGNATURES
                </span>
                <span className="block text-[0.65rem] text-stone tracking-widest mt-1 uppercase font-light">
                  Design · Furnish · Complete
                </span>
              </div>

              <div className="consult-success-reveal flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="group inline-flex items-center gap-4 px-9 py-3.5 bg-charcoal text-ivory text-xs tracking-[0.2em] uppercase font-light hover:bg-bronze transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-bronze/60"
                >
                  <span>CLOSE</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
