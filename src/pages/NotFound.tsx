import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section className="not-found">
      <h1>Page not found</h1>
      <Link to="/">Back to clock</Link>
    </section>
  )
}
