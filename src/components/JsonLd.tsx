// src/components/JsonLd.tsx
// Randează unul sau mai multe obiecte schema.org ca <script type="ld+json">.
export function JsonLd({data}: {data: object | object[]}) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(d)}}
        />
      ))}
    </>
  );
}
