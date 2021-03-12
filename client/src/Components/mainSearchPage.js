import React, { useState, useEffect } from 'react';

const MainSearchPage = (props) => {

  return (
    <div className="flex-container flex-column pos-rel">
      <input
        id="auto"
        placeholder="Type to search"
      />
        <div className="autoContainer">
        <div
          className="option"
          tabIndex="0"
        >
          <span>testing</span>
        </div>
        </div>
    </div>

   );
}

export default MainSearchPage