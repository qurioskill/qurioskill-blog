import { Link } from "react-router-dom";
import { usePageMetadata } from "../hooks/usePageMetadata.js";

export default function PrivacyPage() {
  usePageMetadata(
    "Privacy Policy | QurioSkill",
    "Privacy practices for QurioSkill's Canadian skill training services, including data collection, usage, and your rights."
  );
  return (
    <div className="page policy-page">
      <p className="eyebrow">Policies</p>
      <h1>Privacy Policy</h1>
      <p>
        QurioSkill ("we," "our," or "us") is committed to protecting the privacy of our users. This Privacy Policy explains how
        we collect, use, disclose, and safeguard personal information when you engage with any of our e-learning services,
        regardless of which third-party platform powers the experience.
      </p>
      <p>
        Note: QurioSkill delivers courses through several external service providers (e.g., learning-management systems,
        video-conferencing tools, and payment processors). Each provider has its own privacy policy. We encourage you to review
        the policies of any platform you access through QurioSkill.
      </p>

      <ol className="policy-list">
        <li>
          <h2>1. Information We Collect</h2>
          <p>We collect personal information lawfully and transparently to provide and improve our services.</p>
          <ul className="policy-sublist">
            <li>
              <strong>1.1</strong> Personal Information:
              <ul className="policy-sublist nested">
                <li>Full name and email address.</li>
                <li>
                  Payment information (processed through secure third-party payment providers; we do not store credit card
                  details).
                </li>
              </ul>
            </li>
            <li>
              <strong>1.2</strong> Automatically Collected Data: Usage data such as IP address, browser type, device identifiers,
              and cookies may be collected automatically by the third-party platforms we employ. QurioSkill itself does not add
              additional cookies or trackers beyond those used by these providers.
            </li>
          </ul>
        </li>

        <li>
          <h2>2. How We Use Your Information</h2>
          <p>We use your personal information for the following purposes:</p>
          <ul className="policy-sublist">
            <li>
              <strong>Providing and personalizing services:</strong> Workshop access, recommendations, and progress tracking.
            </li>
            <li>
              <strong>Processing payments:</strong> Through secure third-party payment providers.
            </li>
            <li>
              <strong>Communicating with you:</strong> Platform updates, support, and marketing emails (you may opt out).
            </li>
            <li>
              <strong>Improving our platform:</strong> Analyzing user engagement to enhance content and user experience.
            </li>
            <li>
              <strong>Ensuring compliance and security:</strong> Preventing fraud, unauthorized access, or policy violations.
            </li>
            <li>
              <strong>Review/Feedback:</strong> By leaving a review or feedback, you consent to this data being displayed on the
              site and being used in any marketing material.
            </li>
          </ul>
        </li>

        <li>
          <h2>3. Disclosure of Information</h2>
          <ul className="policy-sublist">
            <li>
              <strong>Instructors and facilitators:</strong> To deliver the workshop you enrolled in.
            </li>
            <li>
              <strong>Service providers:</strong> Suppliers of hosting, video, email, analytics, or payment-processing
              functionality (all bound by contractual confidentiality and data-protection obligations).
            </li>
            <li>
              <strong>Legal authorities:</strong> When required by law or to protect rights and safety.
            </li>
            <li>
              <strong>Successors:</strong> In a business transfer (you will be notified if this happens).
            </li>
          </ul>
        </li>

        <li>
          <h2>4. Data Security &amp; Storage</h2>
          <p>
            All third-party service providers we use maintain industry-standard security measures to protect your data. Despite
            these safeguards, no online transmission or storage system is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </li>

        <li>
          <h2>5. Your Rights Under Canadian Privacy Laws</h2>
          <p>Under PIPEDA and applicable provincial laws, you have the right to:</p>
          <ul className="policy-sublist">
            <li>
              <strong>Access your personal data</strong> stored on our platform.
            </li>
            <li>
              <strong>Request corrections</strong> to inaccurate or incomplete information.
            </li>
            <li>
              <strong>Withdraw consent</strong> for data collection (may impact platform usage).
            </li>
            <li>
              <strong>Request account deletion</strong> (subject to legal retention requirements).
            </li>
            <li>
              <strong>File a complaint</strong> with the Office of the Privacy Commissioner of Canada (OPC) if you believe your
              privacy rights have been violated.
            </li>
          </ul>
          <p>
            To exercise these rights, contact us at <a href="mailto:hello@qurioskill.ca">hello@qurioskill.ca</a>.
          </p>
        </li>

        <li>
          <h2>6. Children&apos;s Privacy</h2>
          <p>
            Our platform is designed for adult learners (18+ years old). If we discover that we have collected personal data from
            a child under 18 without parental consent, we will delete it immediately.
          </p>
        </li>

        <li>
          <h2>7. Updates to This Privacy Policy</h2>
          <p>
            We may update this policy periodically to reflect legal changes or improvements to our services. If we make material
            changes, we will notify you via email or a notice on our platform. Please review this Privacy Policy for any updates
            periodically.
          </p>
          <p>
            By accessing or using our services, you acknowledge that you have read, understood, and agreed to the terms of this
            Privacy Policy.
          </p>
        </li>

        <li>
          <h2>8. Contact Us</h2>
          <p>
            For questions about this Privacy Policy, to request data access, or to file a complaint, contact us at{" "}
            <a href="mailto:hello@qurioskill.ca">hello@qurioskill.ca</a>.
          </p>
        </li>
      </ol>

      <div className="policy-links">
        <Link to="/terms">Terms and Conditions</Link>
        <Link to="/code-of-conduct">Community Code of Conduct</Link>
      </div>
    </div>
  );
}
