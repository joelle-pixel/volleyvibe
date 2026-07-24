import { useState } from "react";

export function Avatar({
  emoji,
  gradient,
  size = 44,
  photo,
  alt,
}: {
  emoji: string;
  gradient: string;
  size?: number;
  photo?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showPhoto = photo && !failed;

  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        background: gradient,
        fontSize: size * 0.45,
        overflow: "hidden",
      }}
    >
      {showPhoto ? (
        <img
          src={photo}
          alt={alt ?? ""}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          onError={() => setFailed(true)}
        />
      ) : (
        emoji
      )}
    </div>
  );
}
