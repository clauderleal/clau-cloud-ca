import React from 'react';
import styles from '../styles/styles.module.css' // Import the CSS file

function Header() {
  return (
    <div className={styles.headerArticle}>
      <h1>Articles NCI</h1>
      <h3>Developed by: Claudemar Boito Leal</h3>
    </div>
  );
}

export default Header;