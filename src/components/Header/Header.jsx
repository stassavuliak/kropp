import './Header.scss';

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="container header__container">
          
          <div className="header__logo">
            KROPP
          </div>

          <nav className="header__nav">
            <ul className="header__menu">
              <li className="header__item"><a href="#" className="header__link">Home</a></li>
              <li className="header__item"><a href="#" className="header__link">Pages</a></li>
              <li className="header__item"><a href="#" className="header__link">Portfolio</a></li>
              <li className="header__item"><a href="#" className="header__link">Blog</a></li>
              <li className="header__item"><a href="#" className="header__link">Shop</a></li>
            </ul>
          </nav>

          <div className="header__actions">
            <a href="#" className="header__btn">Book now</a>
            <button className="header__burger" aria-label="Menu"></button>
          </div>

        </div>
      </header>

      <section className="hero">
        <div className="container hero__container">

          <div className="hero__content">

            <div className="hero__event">
              <span className="hero__event-text">
                New event <br />
                coming up / June 7 - 13
              </span>
            </div>

            <h1 className="hero__title">
              CROSSFIT
            </h1>

          </div>

          <div className="hero__pagination">
            <span className="hero__dot"></span>
            <span className="hero__dot"></span>
            <span className="hero__dot hero__dot--active"></span>
          </div>

        </div>
      </section>
    </>
  )
}

export default Header;