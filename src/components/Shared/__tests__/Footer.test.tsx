import { render, screen } from '@/test/utils/test-utils';
import { describe, expect, it, vi } from 'vitest';
import Footer from '../Footer/Footer';

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Footer', () => {
  it('should render footer content', () => {
    render(<Footer />);

    expect(screen.getByText(/zendoc/i)).toBeInTheDocument();
    expect(
      screen.getByText(/providing quality healthcare/i)
    ).toBeInTheDocument();
  });

  it('should render contact information', () => {
    render(<Footer />);

    expect(screen.getByText(/\+880 1855-629170/)).toBeInTheDocument();
    expect(screen.getByText(/jehadhossain008@gmail.com/)).toBeInTheDocument();
  });

  it('should render service links', () => {
    render(<Footer />);

    expect(screen.getByText(/consultation/i)).toBeInTheDocument();
    expect(screen.getByText(/health plans/i)).toBeInTheDocument();
    expect(screen.getByText(/services/i)).toBeInTheDocument();
    expect(screen.getByText(/doctors/i)).toBeInTheDocument();
  });

  it('should render company links', () => {
    render(<Footer />);

    expect(screen.getByText(/about us/i)).toBeInTheDocument();
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
    expect(screen.getByText(/our history/i)).toBeInTheDocument();
  });

  it('should render social media links', () => {
    render(<Footer />);

    const linkedinLink = screen.getByLabelText(/linkedin/i);
    const githubLink = screen.getByLabelText(/github/i);

    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/jehad-hossain'
    );
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Zihad550');
  });

  it('should render newsletter subscription', () => {
    render(<Footer />);

    expect(screen.getByText(/stay updated/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/your email address/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/subscribe to our newsletter/i)
    ).toBeInTheDocument();
  });

  it('should render copyright information', () => {
    render(<Footer />);

    expect(screen.getByText(/© 2025 ZenDoc Healthcare/i)).toBeInTheDocument();
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });

  it('should render legal links', () => {
    render(<Footer />);

    const privacyLinks = screen.getAllByText(/privacy policy/i);
    const termsLink = screen.getByText(/terms & conditions/i);
    const sitemapLink = screen.getByText(/sitemap/i);

    expect(privacyLinks.length).toBeGreaterThan(0);
    expect(termsLink).toBeInTheDocument();
    expect(sitemapLink).toBeInTheDocument();
  });

  it('should have proper link attributes', () => {
    render(<Footer />);

    const consultationLink = screen.getByRole('link', {
      name: /consultation/i,
    });
    const aboutLink = screen.getByRole('link', { name: /about us/i });

    expect(consultationLink).toHaveAttribute('href', '/consultation');
    expect(aboutLink).toHaveAttribute('href', '/about-us');
  });

  it('should render email as clickable link', () => {
    render(<Footer />);

    const emailLink = screen.getByRole('link', {
      name: /jehadhossain008@gmail.com/i,
    });
    expect(emailLink).toHaveAttribute(
      'href',
      'mailto:jehadhossain008@gmail.com'
    );
  });

  it('should have responsive layout', () => {
    render(<Footer />);

    // Footer should render without layout issues
    const footer = screen.getByText(/zendoc/i).closest('div');
    expect(footer).toBeInTheDocument();
  });
});
