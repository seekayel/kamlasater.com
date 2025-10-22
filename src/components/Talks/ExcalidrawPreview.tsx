import BrowserOnly from '@docusaurus/BrowserOnly';
import React from 'react';
import type {ReactElement} from 'react';

type ExcalidrawPreviewProps = {
  filePath: string;
  title: string;
  className?: string;
  fallbackClassName?: string;
};

type ExcalidrawModule = typeof import('@excalidraw/excalidraw');

export default function ExcalidrawPreview({
  filePath,
  title,
  className,
  fallbackClassName,
}: ExcalidrawPreviewProps): ReactElement {
  const fallback: ReactElement = (
    <div className={className}>
      <div className={fallbackClassName}>Loading diagram preview…</div>
    </div>
  );

  return (
    <BrowserOnly fallback={fallback}>
      {() => {
        const ReactModule = require('react');
        const {useEffect, useState} = ReactModule as typeof React;
        const [initialData, setInitialData] = useState<unknown | null>(null);
        const [ExcalidrawComponent, setExcalidrawComponent] = useState<ExcalidrawModule['Excalidraw'] | null>(null);
        const [failed, setFailed] = useState(false);

        useEffect(() => {
          let cancelled = false;

          void import('@excalidraw/excalidraw/index.css');

          import('@excalidraw/excalidraw')
            .then((module: ExcalidrawModule) => {
              if (!cancelled) {
                setExcalidrawComponent(() => module.Excalidraw);
              }
            })
            .catch(() => {
              if (!cancelled) {
                setFailed(true);
              }
            });

          fetch(filePath)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Unable to fetch excalidraw scene');
              }
              return response.json();
            })
            .then((data) => {
              if (!cancelled) {
                setInitialData(data);
              }
            })
            .catch(() => {
              if (!cancelled) {
                setFailed(true);
              }
            });

          return () => {
            cancelled = true;
          };
        }, [filePath]);

        if (failed) {
          return (
            <div className={className}>
              <div className={fallbackClassName}>Diagram preview unavailable.</div>
            </div>
          );
        }

        if (!initialData || !ExcalidrawComponent) {
          return fallback;
        }

        return (
          <div className={className}>
            <ExcalidrawComponent
              initialData={initialData}
              viewModeEnabled
              zenModeEnabled
              UIOptions={{
                canvasActions: {
                  changeViewBackgroundColor: false,
                  clearCanvas: false,
                  export: false,
                  loadScene: false,
                  saveAsImage: false,
                  saveToActiveFile: false,
                  toggleTheme: false,
                },
                tools: {
                  image: false,
                },
              }}
              name={title}
            />
          </div>
        );
      }}
    </BrowserOnly>
  );
}
