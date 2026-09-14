import Icon from "../common/Icon";

function Header({ onGoHome }) {
  return (
    <header className="app-header">
      <div className="page-container">

        <div
          className="logo-group"
          onClick={onGoHome}
        >
          <div className="logo-icon-wrap">
            <Icon
              name="chefHat"
              size={20}
              color="#E8622C"
            />
          </div>

          <span className="logo-text">
            CookMe
          </span>
        </div>

      </div>
    </header>
  );
}

export default Header;