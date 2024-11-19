export default function Resume() {
  return (
    <div style={{ height: "100vh" }}>
      <iframe
        src="/cv.pdf"
        style={{ width: "100%", height: "100%" }}
        title="PDF Viewer"
      ></iframe>
    </div>
  );
}
