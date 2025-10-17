import {useMemo, useState, type ReactElement} from 'react';
import Layout from '@theme/Layout';
import {tools as toolCatalog} from '../../data/tools';
import styles from './styles.module.css';

type TagState = Record<string, boolean>;

const ToolsPage = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<TagState>({});

  const allTags = useMemo(
    () =>
      Array.from(new Set(toolCatalog.flatMap((tool) => tool.tags))).sort((a, b) =>
        a.localeCompare(b),
      ),
    [],
  );

  const activeTags = useMemo(
    () => Object.keys(selectedTags).filter((tag) => selectedTags[tag]),
    [selectedTags],
  );

  const filteredTools = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return toolCatalog.filter((tool) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        [tool.name, tool.summary, tool.review, tool.tags.join(' ')].some((field) =>
          field.toLowerCase().includes(normalizedQuery),
        );

      const matchesTags =
        activeTags.length === 0 || activeTags.every((tag) => tool.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [activeTags, searchQuery]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => ({
      ...prev,
      [tag]: !prev[tag],
    }));
  };

  const clearTags = () => {
    setSelectedTags({});
  };

  return (
    <Layout
      title="Tools"
      description="Summaries, reviews, and filters for AI and developer productivity tools"
    >
      <main className={styles.main}>
        <header className={styles.hero}>
          <h1 className={styles.title}>Tools</h1>
          <p className={styles.subtitle}>
            Explore concise, 100-word rundowns, hands-on reviews, and quick filters for the AI
            and developer tools we rely on every day.
          </p>
        </header>

        <section className={styles.controls}>
          <label className={styles.searchLabel} htmlFor="tool-search">
            <span className={styles.srOnly}>Search tools</span>
            <input
              id="tool-search"
              type="search"
              placeholder="Search by name, summary, review, or tag"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
          <div className={styles.tagPanel}>
            <h2 className={styles.tagHeading}>Filter by tag</h2>
            <div className={styles.tagList}>
              {allTags.map((tag) => {
                const isActive = Boolean(selectedTags[tag]);
                return (
                  <button
                    key={tag}
                    type="button"
                    className={`${styles.tagButton} ${isActive ? styles.tagButtonActive : ''}`}
                    onClick={() => toggleTag(tag)}
                    aria-pressed={isActive}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            {activeTags.length > 0 ? (
              <button type="button" className={styles.clearTags} onClick={clearTags}>
                Clear filters
              </button>
            ) : null}
          </div>
          <p className={styles.resultMeta}>
            Showing <strong>{filteredTools.length}</strong> tool
            {filteredTools.length === 1 ? '' : 's'}
          </p>
        </section>

        <section className={styles.cardGrid}>
          {filteredTools.map((tool) => (
            <article key={tool.name} className={styles.card}>
              <header className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{tool.name}</h3>
                <span className={styles.rating} aria-label={`Rating ${tool.rating} out of 5`}>
                  {tool.rating.toFixed(1)} ★
                </span>
              </header>
              <p className={styles.summary}>{tool.summary}</p>
              <p className={styles.review}>
                <strong>Review:</strong> {tool.review}
              </p>
              <div className={styles.cardFooter}>
                <ul className={styles.tagPills}>
                  {tool.tags.map((tag) => (
                    <li key={tag} className={styles.tagPill}>
                      {tag}
                    </li>
                  ))}
                </ul>
                <a className={styles.link} href={tool.website} target="_blank" rel="noreferrer">
                  Visit site
                </a>
              </div>
            </article>
          ))}
        </section>

        {filteredTools.length === 0 ? (
          <p className={styles.emptyState}>
            No tools match your filters yet. Try clearing the search or selecting different
            tags.
          </p>
        ) : null}
      </main>
    </Layout>
  );
};

export default ToolsPage;
