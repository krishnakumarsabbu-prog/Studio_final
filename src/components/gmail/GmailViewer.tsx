import React, { useRef, useEffect, useState } from 'react';

interface GmailViewerProps {
  emailHtml: string;
  zoom: number;
  viewMode: 'rendered' | 'raw';
}

const GmailViewer: React.FC<GmailViewerProps> = ({ emailHtml, zoom, viewMode }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(600);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          const h = doc.documentElement.scrollHeight || doc.body.scrollHeight;
          setIframeHeight(Math.max(400, h + 20));
        }
      } catch {
        // cross-origin fallback
      }
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [emailHtml]);

  if (viewMode === 'raw') {
    return (
      <pre
        className="rounded-lg overflow-auto text-xs leading-relaxed"
        style={{
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: '20px',
          fontFamily: "'Courier New', Courier, monospace",
          maxHeight: '70vh',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
        }}
      >
        {emailHtml}
      </pre>
    );
  }

  return (
    <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left', width: `${10000 / zoom}%` }}>
      <iframe
        ref={iframeRef}
        srcDoc={emailHtml}
        style={{
          width: '100%',
          height: `${iframeHeight}px`,
          border: 'none',
          display: 'block',
        }}
        sandbox="allow-same-origin allow-popups"
        title="Email Preview"
      />
    </div>
  );
};

export default GmailViewer;
