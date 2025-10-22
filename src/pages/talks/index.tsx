import clsx from 'clsx';
import Layout from '@theme/Layout';
import React from 'react';
import type {ReactElement} from 'react';

import ExcalidrawPreview from '@site/src/components/Talks/ExcalidrawPreview';
import type {Talk, TalkResource} from '@site/src/data/talks';
import talks from '@site/src/data/talks';

import styles from './styles.module.css';

function YouTubeThumbnail({talk}: {talk: Talk}): ReactElement {
  if (!talk.youtubeId) {
    return (
      <div className={clsx(styles.thumbnail, styles.thumbnailPlaceholder)}>
        <p>Recording coming soon</p>
      </div>
    );
  }

  const url = talk.videoUrl ?? `https://www.youtube.com/watch?v=${talk.youtubeId}`;

  return (
    <a
      className={styles.thumbnail}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={`https://img.youtube.com/vi/${talk.youtubeId}/hqdefault.jpg`}
        alt={`Watch ${talk.title} on YouTube`}
        loading="lazy"
      />
    </a>
  );
}

function TalkResources({resources}: {resources: TalkResource[] | undefined}): ReactElement | null {
  if (!resources || resources.length === 0) {
    return null;
  }

  const previews = resources.filter((resource) => resource.preview);

  return (
    <div className={styles.resources}>
      <h3>Resources</h3>
      <ul className={styles.resourceLinks}>
        {resources.map((resource) => (
          <li key={resource.url}>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              {resource.label}
            </a>
          </li>
        ))}
      </ul>
      {previews.length > 0 && (
        <div className={styles.previewGrid}>
          {previews.map((resource) => {
            const preview = resource.preview!;

            if (preview.kind === 'pdf') {
              const src = preview.src ?? resource.url;
              return (
                <div key={`${resource.url}-pdf`} className={styles.previewItem}>
                  <iframe
                    className={styles.previewFrame}
                    src={src}
                    title={preview.title}
                    loading="lazy"
                  />
                </div>
              );
            }

            if (preview.kind === 'excalidraw') {
              const src = preview.src ?? resource.url;
              return (
                <div key={`${resource.url}-excalidraw`} className={styles.previewItem}>
                  <ExcalidrawPreview
                    filePath={src}
                    title={preview.title}
                    className={styles.excalidrawPreview}
                    fallbackClassName={styles.previewFallback}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
}

function TalkSection({talk}: {talk: Talk}): ReactElement {
  const details = [talk.event, talk.date, talk.location].filter(Boolean).join(' • ');

  return (
    <section id={talk.slug} className={styles.talkSection}>
      <div className={styles.sectionHeading}>
        <h2>{talk.title}</h2>
        {details && <p className={styles.meta}>{details}</p>}
      </div>
      <div className={styles.sectionBody}>
        <div className={styles.videoColumn}>
          <YouTubeThumbnail talk={talk} />
        </div>
        <div className={styles.detailsColumn}>
          {talk.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <TalkResources resources={talk.resources} />
        </div>
      </div>
    </section>
  );
}

export default function TalksPage(): ReactElement {
  return (
    <Layout title="Talks" description="Conference talks and presentations by Kam Lasater">
      <header className="hero hero--primary">
        <div className="container">
          <h1 className="hero__title">Talks</h1>
          <p className="hero__subtitle">
            Deep dives on engineering reliable systems, practical agent building, and learning from failure.
          </p>
        </div>
      </header>
      <main className={styles.page}>
        <div className="container">
          {talks.map((talk) => (
            <TalkSection key={talk.slug} talk={talk} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
