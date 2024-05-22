const Header = ({courseName} : {courseName:string}) : JSX.Element => {
  return (
    <header>
      <h1>{courseName}</h1>
    </header>
  );
}

export default Header;