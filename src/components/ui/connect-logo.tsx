import * as React from 'react';

export default function ConnectLogo() {
  const logoSize = 52;
  return (
    <>
      <div
        className="logo-container"
        style={{
          width: logoSize,
          height: logoSize,
        }}
      >
        <img
          src="/logo.svg"
          alt="Connect Four Logo"
          className="logo"
          width={logoSize}
          height={logoSize} />

      </div>
    </>
  );
}
