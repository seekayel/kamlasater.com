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
      <!-- <li>
        <a href="mailto:ckl@seekayel.com" target="_blank">ckl@seekayel.com</a>
      </li>
      <li>
        <a href="/uses">Built With</a>
      </li> -->
      <!-- <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="/contact">Contact</a>
      </li> -->
    </ul>
  </nav>
</header>

<style>

  @keyframes changeBg {
    0%,100%  {
      background-image: linear-gradient(to bottom right, #00C0FF, #4218B8);
    }
    50% {
      background-image: linear-gradient(to bottom right, darkblue, darkblue);
    }
  }

  header {
      padding: 1rem;
      color: white;
      /* animation: changeBg 5s infinite;
      animation-timing-function: ease-in-out; */
  }


  @keyframes rainbow {
  0% {
    background-position: 1000% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.rainbow {
  background: linear-gradient( 60deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3, #ff2400);
  background-size: 1000% 1000%;
  animation-name: rainbow;
  animation-duration: 180s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}





  nav.menu{
    display: flex;
    justify-content: space-between;
  }
  nav.menu ul{
      margin: 0;
      padding: 0;
      list-style: none;
  }
  nav.menu ul li{
      display: inline-block;
      gap: 1rem;
      padding-left: 1em;
  }

  /* ul {
      margin: 0;
      list-style-type: none;
      display: flex;
  } */

  a {
      text-decoration: none;
      color: inherit;
  }
</style>
