import '../styles/header.css';

export default function Header() {
  return (
    <>
      <nav className="nav">
        <a className="font-noto-sans" href="/">HOME</a>
        <a className="font-noto-sans" href="/transfer">TRANSFER</a>
        <a className="font-noto-sans" href="/details">DETAILS</a>
        <a onClick={() => {localStorage.clear()}} className="font-noto-sans" href="/">LOGOUT</a>
      </nav>
    </>
  )
}