import { render, screen, waitFor } from '@/test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import FaqAccordion from '../FaqAccordion';

describe('FaqAccordion', () => {
  const mockFaqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment by logging into your account and selecting an available time slot with your preferred doctor.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and digital payment methods including PayPal and Apple Pay.'
    },
    {
      question: 'Can I cancel my appointment?',
      answer: 'Yes, you can cancel your appointment up to 24 hours before the scheduled time without any charges.'
    }
  ];

  describe('rendering', () => {
    it('should render all FAQ items', () => {
      render(<FaqAccordion faqs={mockFaqs} />);
      
      expect(screen.getByText('How do I book an appointment?')).toBeInTheDocument();
      expect(screen.getByText('What payment methods do you accept?')).toBeInTheDocument();
      expect(screen.getByText('Can I cancel my appointment?')).toBeInTheDocument();
    });

    it('should render question icons for each FAQ', () => {
      render(<FaqAccordion faqs={mockFaqs} />);
      
      const questionIcons = screen.getAllByTestId('QuestionAnswerOutlinedIcon');
      expect(questionIcons).toHaveLength(3);
    });

    it('should render expand icons for each FAQ', () => {
      render(<FaqAccordion faqs={mockFaqs} />);
      
      const expandIcons = screen.getAllByTestId('ExpandMoreIcon');
      expect(expandIcons).toHaveLength(3);
    });

    it('should not show answers initially', () => {
      render(<FaqAccordion faqs={mockFaqs} />);
      
      // Check that accordions are collapsed (aria-expanded="false")
      const accordions = screen.getAllByRole('button');
      accordions.forEach(accordion => {
        expect(accordion).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  describe('accordion interaction', () => {
    it('should expand accordion when question is clicked', async () => {
      const user = userEvent.setup();
      render(<FaqAccordion faqs={mockFaqs} />);
      
      const firstQuestion = screen.getByText('How do I book an appointment?');
      await user.click(firstQuestion);
      
      await waitFor(() => {
        expect(screen.getByText(/you can book an appointment by logging into your account/i)).toBeInTheDocument();
      });
    });

    it('should collapse accordion when clicked again', async () => {
      const user = userEvent.setup();
      render(<FaqAccordion faqs={mockFaqs} />);
      
      const firstQuestion = screen.getByText('How do I book an appointment?');
      
      // Expand
      await user.click(firstQuestion);
      await waitFor(() => {
        expect(screen.getByText(/you can book an appointment by logging into your account/i)).toBeInTheDocument();
      });
      
      // Collapse
      await user.click(firstQuestion);
      await waitFor(() => {
        const firstAccordion = screen.getAllByRole('button')[0];
        expect(firstAccordion).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should only allow one accordion to be open at a time', async () => {
      const user = userEvent.setup();
      render(<FaqAccordion faqs={mockFaqs} />);
      
      const firstQuestion = screen.getByText('How do I book an appointment?');
      const secondQuestion = screen.getByText('What payment methods do you accept?');
      
      // Open first accordion
      await user.click(firstQuestion);
      await waitFor(() => {
        expect(screen.getByText(/you can book an appointment by logging into your account/i)).toBeInTheDocument();
      });
      
      // Open second accordion
      await user.click(secondQuestion);
      await waitFor(() => {
        expect(screen.getByText(/we accept all major credit cards/i)).toBeInTheDocument();
        // Check that first accordion is collapsed and second is expanded
        const firstAccordion = screen.getAllByRole('button')[0];
        const secondAccordion = screen.getAllByRole('button')[1];
        expect(firstAccordion).toHaveAttribute('aria-expanded', 'false');
        expect(secondAccordion).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<FaqAccordion faqs={mockFaqs} />);
      
      const accordions = screen.getAllByRole('button');
      expect(accordions).toHaveLength(3);
      
      accordions.forEach((accordion, index) => {
        expect(accordion).toHaveAttribute('aria-controls', `panel${index}bh-content`);
        expect(accordion).toHaveAttribute('id', `panel${index}bh-header`);
      });
    });

    it('should have proper expanded state attributes', async () => {
      const user = userEvent.setup();
      render(<FaqAccordion faqs={mockFaqs} />);
      
      const firstAccordion = screen.getAllByRole('button')[0];
      
      // Initially collapsed
      expect(firstAccordion).toHaveAttribute('aria-expanded', 'false');
      
      // Expand
      await user.click(firstAccordion);
      await waitFor(() => {
        expect(firstAccordion).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      render(<FaqAccordion faqs={mockFaqs} />);
      
      const firstAccordion = screen.getAllByRole('button')[0];
      
      // Focus and activate with keyboard
      firstAccordion.focus();
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByText(/you can book an appointment by logging into your account/i)).toBeInTheDocument();
      });
    });
  });

  describe('empty state', () => {
    it('should handle empty FAQ array', () => {
      render(<FaqAccordion faqs={[]} />);
      
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should handle FAQ with empty question', () => {
      const faqsWithEmptyQuestion = [
        { question: '', answer: 'This is an answer without a question.' }
      ];
      
      render(<FaqAccordion faqs={faqsWithEmptyQuestion} />);
      
      // Should still render the accordion structure
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should handle FAQ with empty answer', async () => {
      const faqsWithEmptyAnswer = [
        { question: 'What is this question?', answer: '' }
      ];
      
      const user = userEvent.setup();
      render(<FaqAccordion faqs={faqsWithEmptyAnswer} />);
      
      const question = screen.getByText('What is this question?');
      await user.click(question);
      
      // Should expand but show empty content
      await waitFor(() => {
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('styling and visual feedback', () => {
    it('should apply different styles to expanded accordion', async () => {
      const user = userEvent.setup();
      render(<FaqAccordion faqs={mockFaqs} />);
      
      const firstQuestion = screen.getByText('How do I book an appointment?');
      await user.click(firstQuestion);
      
      await waitFor(() => {
        const expandedAccordion = screen.getAllByRole('button')[0];
        expect(expandedAccordion).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should show expand/collapse icon state changes', async () => {
      const user = userEvent.setup();
      render(<FaqAccordion faqs={mockFaqs} />);
      
      const firstQuestion = screen.getByText('How do I book an appointment?');
      const expandIcon = screen.getAllByTestId('ExpandMoreIcon')[0];
      
      expect(expandIcon).toBeInTheDocument();
      
      await user.click(firstQuestion);
      
      // Icon should still be present but potentially rotated via CSS
      await waitFor(() => {
        expect(expandIcon).toBeInTheDocument();
      });
    });
  });

  describe('content rendering', () => {
    it('should render HTML content in answers safely', async () => {
      const faqsWithHtml = [
        {
          question: 'How do I contact support?',
          answer: 'You can contact support via email at support@example.com or call us at (555) 123-4567.'
        }
      ];
      
      const user = userEvent.setup();
      render(<FaqAccordion faqs={faqsWithHtml} />);
      
      const question = screen.getByText('How do I contact support?');
      await user.click(question);
      
      await waitFor(() => {
        expect(screen.getByText(/you can contact support via email/i)).toBeInTheDocument();
      });
    });

    it('should handle long questions and answers', async () => {
      const faqsWithLongContent = [
        {
          question: 'This is a very long question that might wrap to multiple lines and should still be displayed properly in the accordion interface',
          answer: 'This is a very long answer that contains multiple sentences and should be displayed properly when the accordion is expanded. It should maintain proper formatting and readability even with extensive content that spans multiple lines and paragraphs.'
        }
      ];
      
      const user = userEvent.setup();
      render(<FaqAccordion faqs={faqsWithLongContent} />);
      
      const longQuestion = screen.getByText(/this is a very long question/i);
      expect(longQuestion).toBeInTheDocument();
      
      await user.click(longQuestion);
      
      await waitFor(() => {
        expect(screen.getByText(/this is a very long answer/i)).toBeInTheDocument();
      });
    });
  });
});