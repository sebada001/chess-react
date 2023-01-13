import React, { useState } from "react";
import Game from "./components/Game";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center space-y-4 bg-[#282c34] text-center selection:bg-green-900 ">
      <header className="my-4 text-3xl text-white">Chess</header>
      <Game />
    </div>
  );
}

export default App;
