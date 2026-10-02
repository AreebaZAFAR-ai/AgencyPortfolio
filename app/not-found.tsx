import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70dvh] items-center">
      <Container>
        <div className="flex flex-col items-start gap-(--space-lg)">
          <span className="type-eyebrow text-text-muted">404</span>
          <h1 className="font-display text-h1 text-text-primary">Page not found.</h1>
          <p className="max-w-md text-body text-text-secondary">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
          </p>
          <Button href="/">Back to Home</Button>
        </div>
      </Container>
    </section>
  );
}
