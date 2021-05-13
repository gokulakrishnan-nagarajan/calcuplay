import { useHistory } from "react-router-dom";

import './LandingPage.scss';

function LandingPage() {
  const history = useHistory();

  const routeTo = (operation) => {
    history.push('/game/' + operation);
  };

  return (
    <div className="container center-center">
      <div className="game-card-container flex-row flex-wrap center-center">
        <div className="game-card flex-column center-center" onClick={() => routeTo('addition')}><span>Addition</span><span className="operation-sign">(+)</span></div>
        <div className="game-card flex-column center-center" onClick={() => routeTo('subtraction')}><span>Subtraction</span><span className="operation-sign">(-)</span></div>
        <div className="game-card flex-column center-center" onClick={() => routeTo('multiplication')}><span>Multiplication</span><span className="operation-sign">(x)</span></div>
        {/* <div className="game-card flex-column center-center" onClick={() => routeTo('division')}><span>Division</span><span className="operation-sign">(&#247;)</span></div> */}
      </div>
    </div>
  );
}

export default LandingPage;
