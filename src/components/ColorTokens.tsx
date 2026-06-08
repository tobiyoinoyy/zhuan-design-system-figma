import { zhuanColorGroups } from '../tokens';

function readableValue(value: string) {
  return value.replace(/\s+/g, ' ');
}

export function ColorTokenGallery() {
  return (
    <div className="zd-color-gallery" data-node-id="color-foundations">
      {zhuanColorGroups.map((group) => (
        <section className="zd-color-group" key={group.group}>
          <h3>{group.label}</h3>
          <div className="zd-color-grid">
            {group.tokens.map((token) => (
              <article className="zd-color-card" key={token.name}>
                <span className="zd-color-card__swatch" style={{ background: token.value }} />
                <div className="zd-color-card__body">
                  <strong>{token.figmaName}</strong>
                  <code>{token.cssVar}</code>
                  <span>{readableValue(token.value)}</span>
                  <small>{token.usage}</small>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
