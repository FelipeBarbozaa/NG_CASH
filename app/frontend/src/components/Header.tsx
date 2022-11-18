import '../styles/header.css';

export default function Header() {
  return (
    <>
      <nav className="nav">
        <a className="font-noto-sans" href="/">HOME</a>
        <a className="font-noto-sans" href="/transfer">TRANSFER</a>
        <a className="font-noto-sans" href="/details">DETAILS</a>
        <a className="font-noto-sans" href="/">EXIT</a>
      </nav>
    </>
  )
}