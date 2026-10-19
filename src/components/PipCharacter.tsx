type PipCharacterProps = { waving: boolean };

/** Uses the approved front-view character reference so Pip stays on-model. */
export default function PipCharacter({ waving }: PipCharacterProps) {
  return (
    <img
      className={`pip-art${waving ? ' pip-art--waving' : ''}`}
      src="/assets/pip/pip-front-approved.png"
      alt="Pip, a baby skeleton in a cream star-patterned nightcap and pastel heart-print pajamas"
      draggable={false}
    />
  );
}
