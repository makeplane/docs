import React from 'react';
import * as Icons from 'react-icons/fa';

export const Card =({ icon, svg, title, children, href })=> {
  const IconComponent = Icons[icon];

  // Wrapping the card content with an <a> tag if href is provided
  const CardContent = (
    <>
      <div className="card-icon">
        { svg ? svg : IconComponent ? <IconComponent size={25} className="icon-style" /> : null }
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{children}</p>
    </>
  );

  return href ? (
    <a href={href} className="card-link">
      {CardContent}
    </a>
  ) : (
    CardContent
  );
}
