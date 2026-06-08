type KeyboardVariant = 'numbers' | 'portrait';

const numberRows = [
  [
    ['1', ''],
    ['2', 'ABC'],
    ['3', 'DEF']
  ],
  [
    ['4', 'GHI'],
    ['5', 'JKL'],
    ['6', 'MNO']
  ],
  [
    ['7', 'PQRS'],
    ['8', 'TUV'],
    ['9', 'WXYZ']
  ]
];

const portraitRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export function IOSStatusBar() {
  return (
    <div className="zd-ios-status" data-node-id="550:7280">
      <span>9:41</span>
      <img src="/device-assets/status-container.svg" alt="" draggable={false} />
    </div>
  );
}

export function IOSHomeBar({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <div className={[
      'zd-ios-home-bar',
      light ? 'zd-ios-home-bar--light' : '',
      compact ? 'zd-ios-home-bar--compact' : ''
    ].filter(Boolean).join(' ')} data-node-id="550:7266">
      <span />
    </div>
  );
}

function NumberKey({ value, meta }: { value: string; meta?: string }) {
  return (
    <button className="zd-ios-number-key" type="button">
      <strong>{value}</strong>
      <span>{meta}</span>
    </button>
  );
}

function LetterKey({ value }: { value: string }) {
  return (
    <button className="zd-ios-letter-key" type="button">
      {value}
    </button>
  );
}

function IOSNumberKeyboard() {
  return (
    <div className="zd-ios-keyboard zd-ios-keyboard--numbers" data-node-id="557:14706">
      <div className="zd-ios-number-keys">
        {numberRows.map((row, rowIndex) => (
          <div className="zd-ios-number-row" key={rowIndex}>
            {row.map(([value, meta]) => (
              <NumberKey key={value} value={value} meta={meta} />
            ))}
          </div>
        ))}
        <div className="zd-ios-number-row">
          <span className="zd-ios-number-key-spacer" />
          <NumberKey value="0" />
          <span className="zd-ios-number-key-spacer" />
        </div>
      </div>
      <IOSHomeBar />
    </div>
  );
}

function IOSPortraitKeyboard() {
  return (
    <div className="zd-ios-keyboard zd-ios-keyboard--portrait" data-node-id="557:14782">
      <div className="zd-ios-alpha">
        {portraitRows.map((row, rowIndex) => (
          <div className={`zd-ios-alpha-row zd-ios-alpha-row--${rowIndex + 1}`} key={rowIndex}>
            {rowIndex === 2 && (
              <button className="zd-ios-letter-key zd-ios-letter-key--icon" type="button">
                <img src="/device-assets/keyboard-shift-on.svg" alt="" draggable={false} />
              </button>
            )}
            {row.map((letter) => (
              <LetterKey key={letter} value={letter} />
            ))}
            {rowIndex === 2 && (
              <button className="zd-ios-letter-key zd-ios-letter-key--icon zd-ios-letter-key--delete" type="button">
                <img src="/device-assets/keyboard-delete.svg" alt="" draggable={false} />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="zd-ios-keyboard-controller">
        <button type="button">123</button>
        <button type="button" className="zd-ios-keyboard-space">space</button>
        <button type="button" className="zd-ios-keyboard-return">return</button>
        <img className="zd-ios-keyboard-emojis" src="/device-assets/keyboard-emojis.svg" alt="" draggable={false} />
        <img className="zd-ios-keyboard-mic" src="/device-assets/keyboard-mic.svg" alt="" draggable={false} />
        <IOSHomeBar />
      </div>
    </div>
  );
}

export function IOSKeyboard({ variant = 'numbers' }: { variant?: KeyboardVariant }) {
  return variant === 'portrait' ? <IOSPortraitKeyboard /> : <IOSNumberKeyboard />;
}
