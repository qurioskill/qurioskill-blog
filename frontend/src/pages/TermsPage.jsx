import { Link } from "react-router-dom";
import { usePageMetadata } from "../hooks/usePageMetadata.js";

export default function TermsPage() {
  usePageMetadata(
    "Terms and Conditions | QurioSkill",
    "Terms and conditions governing QurioSkill's Canadian skill training services for individuals and organizations."
  );
  return (
    <div className="page policy-page terms-page">
      <p className="eyebrow">Policies</p>
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to QurioSkill! By accessing and using our website and services, you agree to comply with and be bound by the
        following Terms and Conditions. Please read them carefully before using our services. This Agreement sets forth the
        legally binding terms and conditions for using our Website and the purchase and enrolment of our free and paid
        services. You agree to be bound by this Agreement by accessing or using the Website.
      </p>
      <p>
        You must also read and abide by the <Link to="/code-of-conduct">Community Code of Conduct</Link>.
      </p>

      <ol className="policy-list">
        <li>
          <h2>1. Definitions</h2>
          <ul className="policy-sublist">
            <li>
              <strong>1.1</strong> "Company" refers to QurioSkill, the operator of the website and provider of services.
            </li>
            <li>
              <strong>1.2</strong> "User" refers to any individual who accesses or uses the website or services provided by
              QurioSkill.
            </li>
            <li>
              <strong>1.3</strong> "Services" refers to paid and free online training, workshops, and related content provided
              by QurioSkill.
            </li>
          </ul>
        </li>

        <li>
          <h2>2. Eligibility</h2>
          <ul className="policy-sublist">
            <li>
              <strong>2.1</strong> Users must be at least 18 years of age or have parental/guardian consent to use our services.
            </li>
            <li>
              <strong>2.2</strong> By using our services, you confirm that you meet these eligibility requirements.
            </li>
          </ul>
        </li>

        <li>
          <h2>3. Intellectual Property</h2>
          <ul className="policy-sublist">
            <li>
              <strong>3.1</strong> Ownership: All workshop content, images and associated materials provided on our Website,
              including but not limited to workshop content, quizzes, assessments, text, graphics, logos, images, videos, and
              software, are the intellectual property of QurioSkill or its licensors and are protected by copyright and other
              intellectual property laws.
            </li>
            <li>
              <strong>3.2</strong> License: When you enroll in our free or paid training workshops, you are granted a limited,
              non-exclusive, and non-transferable license to access and use the workshop materials strictly for your personal
              educational purposes. Reproducing, distributing, modifying, or creating derivative works based on the workshop
              materials is prohibited without our prior written consent.
            </li>
          </ul>
        </li>

        <li>
          <h2>4. User Accounts</h2>
          <ul className="policy-sublist">
            <li>
              <strong>4.1</strong> Users may be required to create an account to access services. You are responsible for
              maintaining the confidentiality of your account and password.
            </li>
            <li>
              <strong>4.2</strong> You agree to provide accurate and complete information during registration.
            </li>
            <li>
              <strong>4.3</strong> Any activity under your account is your responsibility. Notify us immediately of unauthorized
              use.
            </li>
          </ul>
        </li>

        <li>
          <h2>5. Free and Paid Services</h2>
          <ul className="policy-sublist">
            <li>
              <strong>5.1</strong> Enrolment: To enroll for our paid services, you must complete the purchase process and
              provide accurate payment details. We reserve the right to decline or cancel any enrollment at our discretion.
              Enrollment for our free services does not require a purchase.
            </li>
            <li>
              <strong>5.2</strong> Pricing and Payment: The prices of our services are listed on our website and may change at
              any time without prior notice. You are responsible for paying the applicable fees for the services you choose to
              enroll in. All payments must be completed using the designated payment methods. To ensure the security of your
              payment information, we utilize third-party payment processors, and QurioSkill does not have access to your
              payment details.
            </li>
            <li>
              <strong>5.3</strong> Access and Delivery: Once your enrollment is complete, you will gain access to the
              corresponding materials and resources. The content will be provided through our online learning platform or other
              specified delivery methods as outlined on our website.
            </li>
          </ul>
        </li>

        <li>
          <h2>6. Refunds</h2>
          <ul className="policy-sublist">
            <li>
              <strong>6.1</strong> QurioSkill has no obligation to consider or grant refund requests.
            </li>
            <li>
              <strong>6.2</strong> Refunds for dissatisfaction with services are typically not offered. However, exceptions may
              be considered in the following cases:
              <ul className="policy-sublist nested">
                <li>
                  <strong>6.2.1</strong> Technical issues that prevent access to services and cannot be resolved within three
                  (3) calendar days of purchase.
                </li>
                <li>
                  <strong>6.2.2</strong> Services that significantly differ from the advertised description and objectives.
                </li>
                <li>
                  <strong>6.2.3</strong> Other reasons at our discretion, including unforeseen personal emergencies or
                  exceptional circumstances.
                </li>
              </ul>
            </li>
            <li>
              <strong>6.3</strong> All refund requests must be submitted in writing to hello@qurioskill.ca within three (3)
              calendar days from the date of purchase. Refund eligibility will be evaluated on a case-by-case basis.
            </li>
            <li>
              <strong>6.4</strong> Once a refund for a service is confirmed, you will lose all access to the enrolled service.
            </li>
            <li>
              <strong>6.5</strong> Refunds will not be issued to users who engage in fraudulent activities, violate these Terms
              (as determined at our sole discretion), or fail to adhere to the{" "}
              <Link to="/code-of-conduct">Community Code of Conduct</Link>, including those whose accounts have been
              deactivated for such reasons.
            </li>
          </ul>
        </li>

        <li>
          <h2>7. Prohibited Conduct</h2>
          <ul className="policy-sublist">
            <li>
              <strong>7.1</strong> Violate any applicable laws, regulations, or third-party rights.
            </li>
            <li>
              <strong>7.2</strong> Misuse the platform or engage in illegal activities.
            </li>
            <li>
              <strong>7.3</strong> Share login credentials or allow unauthorized access to their account.
            </li>
            <li>
              <strong>7.4</strong> Copy, distribute, or alter workshop materials without permission.
            </li>
            <li>
              <strong>7.5</strong> Interfere with or disrupt the security or integrity of the Website.
            </li>
            <li>
              <strong>7.6</strong> Impersonate any person or entity or falsely state or misrepresent your affiliation with a
              person or entity.
            </li>
            <li>
              <strong>7.7</strong> Breaching the <Link to="/code-of-conduct">Community Code of Conduct</Link>.
            </li>
          </ul>
        </li>

        <li>
          <h2>8. Disclaimers</h2>
          <ul className="policy-sublist">
            <li>
              <strong>8.1</strong> QurioSkill makes no guarantees or warranties, express or implied, regarding the outcomes,
              results, or benefits that may be achieved through our training workshops. Your success and performance depend on
              various factors, including your efforts, abilities, and circumstances.
            </li>
          </ul>
        </li>

        <li>
          <h2>9. Limitation of Liability</h2>
          <ul className="policy-sublist">
            <li>
              <strong>9.1</strong> To the maximum extent permitted by applicable law, QurioSkill and its affiliates, directors,
              officers, employees, agents, and contractors shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited to loss of profits, data, or reputation, arising out
              of or in connection with your use of the Website or participation in our training workshops.
            </li>
          </ul>
        </li>

        <li>
          <h2>10. Termination</h2>
          <ul className="policy-sublist">
            <li>
              <strong>10.1</strong> We reserve the right, at our sole discretion and without prior notice, to suspend or
              terminate your access to the Website and your enrollment in our training workshops if you violate any terms of
              this Agreement or engage in unauthorized or prohibited activities. You will receive notification of such
              termination via email within 48 hours of the action being taken.
            </li>
            <li>
              <strong>10.2</strong> Access will also be revoked for any free users identified as fraudulent accounts or those who
              have gained access without proper authorization.
            </li>
            <li>
              <strong>10.3</strong> Additionally, individuals exhibiting abusive, disrespectful, or disruptive behavior will have
              their access revoked.
            </li>
          </ul>
        </li>

        <li>
          <h2>11. Governing Law</h2>
          <ul className="policy-sublist">
            <li>
              <strong>11.1</strong> These Terms and Conditions are governed by the laws of Canada. Any disputes will be subject
              to the jurisdiction of the courts in Canada.
            </li>
            <li>
              <strong>11.2</strong> We sincerely hope such actions are never required and are committed to ensuring customer
              satisfaction and quick resolution of any issues.
            </li>
          </ul>
        </li>

        <li>
          <h2>12. Severability</h2>
          <ul className="policy-sublist">
            <li>
              <strong>12.1</strong> If any provision of this Agreement is invalid or unenforceable, the remaining provisions
              shall remain in full force and effect.
            </li>
          </ul>
        </li>

        <li>
          <h2>13. Changes to Terms</h2>
          <ul className="policy-sublist">
            <li>
              <strong>13.1</strong> QurioSkill reserves the right to update these Terms and Conditions at any time. Users will be
              notified of any significant changes via email or website announcements.
            </li>
          </ul>
        </li>

        <li>
          <h2>14. Contact Information</h2>
          <ul className="policy-sublist">
            <li>
              <strong>14.1</strong> If you have questions about these Terms and Conditions, please contact us at:{" "}
              <a href="mailto:hello@qurioskill.ca">hello@qurioskill.ca</a>
            </li>
          </ul>
        </li>

        <li>
          <h2>15. Entire Agreement</h2>
          <ul className="policy-sublist">
            <li>
              <strong>15.1</strong> This Agreement constitutes the complete understanding between you and QurioSkill regarding
              its subject matter, replacing all prior or current communications, agreements, and understandings, whether verbal
              or written.
            </li>
            <li>
              <strong>15.2</strong> By accessing or using our Website or enrolling in our free or paid training workshops, you
              confirm that you have read, understood, and agreed to the terms outlined in this Agreement. Please note that this
              Agreement may be updated at any time, and it is your responsibility to review it periodically for any changes.
            </li>
          </ul>
        </li>
      </ol>

      <div className="policy-links">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/code-of-conduct">Community Code of Conduct</Link>
      </div>
    </div>
  );
}
