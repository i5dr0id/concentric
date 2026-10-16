import './SystemGuides.css'

/** Outlines of where macOS draws its own lock screen UI, for checking fit. */
export default function SystemGuides() {
  return (
    <div className="system-guides" aria-hidden>
      <div className="guide guide-clock">macOS date &amp; time</div>
      <div className="guide guide-login">password · Touch ID</div>
      <div className="guide guide-notification">notifications</div>
      <div className="guide guide-status">status</div>
    </div>
  )
}
