import React from 'react';

export default function Index() {
  return (
    <header class="rainbow">
    <nav class="menu">
        <ul class="menu-left">
        <li>
            <a href="/">Home</a>
        </li>
        <li>
            <a href="/blog">Blog</a>
        </li>
        </ul>
        <ul class="menu-right">
            <li>
                <a target="_blank" href="https://github.com/seekayel">
                <i class="fa-brands fa-github" title="Github link"></i>
                </a>
            </li><li>
                <a target="_blank" href="https://www.linkedin.com/in/kamlasater">
                <i class="fa-brands fa-linkedin" title="Linkedin link"></i>
                </a>
            </li><li>
                <a target="_blank" href="https://twitter.com/seekayel">
                <i class="fa-brands fa-twitter" title="Twitter link"></i>
                </a>
            </li>
        </ul>
    </nav>
    </header>
  );
};
