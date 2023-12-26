---
layout: page
# title: "안녕하세요 Yagsill 입니다."
permalink: /about/
---

<style>

.flow > * + * {
  margin-top: var(--flow-space, 1em);
}

 /* CARD COMPONENT */

.card {
  position : relative;
  display: grid;
  left : 26%;
  place-items: center;
  width: 80vw;
  max-width: 21.875rem;
  height: 28.125rem;
  overflow: hidden;
  border-radius: 0.625rem;
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
}

/* PC , 테블릿 가로 (해상도 768px ~ 1023px)*/ 
@media all and (min-width:768px) and (max-width:1023px) {
  .card {
    left : 26%;
  }
} 

/* 테블릿 세로 (해상도 768px ~ 1023px)*/ 
@media all and (min-width:768px) and (max-width:1023px) { 
} 

/* 모바일 가로, 테블릿 세로 (해상도 480px ~ 767px)*/ 
@media all and (min-width:480px) and (max-width:767px) {
} 

/* 모바일 가로, 테블릿 세로 (해상도 ~ 479px)*/ 
@media all and (max-width:479px) {
  .card {
    left : 7%;
  }
}

.card > * {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.card__background {
  object-fit: cover;
  max-width: 100%;
  height: 100%;
}

.card__content {
  --flow-space: 0.9375rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: flex-end;
  height: 55%;
  padding: 12% 1.25rem 1.875rem;
  background: linear-gradient(
    180deg,
    hsla(0, 0%, 0%, 0) 0%,
    hsla(0, 0%, 0%, 0.3) 10%,
    hsl(0, 0%, 0%) 100%
  );
}

.card__content--container {
  --flow-space: 1.25rem;
}

.card__title {
  color : white;
  position: relative;
  width: fit-content;
  width: -moz-fit-content; /* Prefijo necesario para Firefox  */
}
.card__description {
  color : white;
}

.card__title::after {
  content: "";
  position: absolute;
  height: 0.3125rem;
  width: calc(100% + 1.25rem);
  bottom: calc((1.25rem - 0.5rem) * -1);
  left: -1.25rem;
  background-color: var(--brand-color);
}

.card__button {
  padding: 0.75em 1.6em;
  width: fit-content;
  width: -moz-fit-content; /* Prefijo necesario para Firefox  */
  font-variant: small-caps;
  font-weight: bold;
  border-radius: 0.45em;
  border: none ;
  background-color: yellow;
  font-family: var(--font-title);
  font-size: 1.125rem;
  color : black;
}

.card__button:focus {
  outline: 2px solid black;
  outline-offset: -5px;
}

@media (any-hover: hover) and (any-pointer: fine) {
  .card__content {
    transform: translateY(62%);
    transition: transform 500ms ease-out;
    transition-delay: 500ms;
  }

  .card__title::after {
    opacity: 0;
    transform: scaleX(0);
    transition: opacity 1000ms ease-in, transform 500ms ease-out;
    transition-delay: 500ms;
    transform-origin: right;
  }

  .card__background {
    transition: transform 500ms ease-in;
  }

  .card__content--container > :not(.card__title),
  .card__button {
    opacity: 0;
    transition: transform 500ms ease-out, opacity 500ms ease-out;
  }

  .card:hover,
  .card:focus-within {
    transform: scale(1.05);
    transition: transform 500ms ease-in;
  }

  .card:hover .card__content,
  .card:focus-within .card__content {
    transform: translateY(0);
    transition: transform 500ms ease-in;
  }

  .card:focus-within .card__content {
    transition-duration: 0ms;
  }

  .card:hover .card__background,
  .card:focus-within .card__background {
    transform: scale(1.3);
  }

  .card:hover .card__content--container > :not(.card__title),
  .card:hover .card__button,
  .card:focus-within .card__content--container > :not(.card__title),
  .card:focus-within .card__button {
    opacity: 1;
    transition: opacity 500ms ease-in;
    transition-delay: 1000ms;
  }

  .card:hover .card__title::after,
  .card:focus-within .card__title::after {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: left;
    transition: opacity 500ms ease-in, transform 500ms ease-in;
    transition-delay: 500ms;
  }
}
</style>

<script>
function target() {
  location.href = "http://127.0.0.1:4000/whiteglass/"
}
</script>

<article class="card">
  <img
    class="card__background"
    src="../assets/YagsillLogo.png"
    alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
    width="1920"
    height="2193"
  />
  <div class="card__content | flow">
    <div class="card__content--container | flow">
      <h3 class="card__title">Swift & Node.js Developer!</h3>
      <p class="card__description">
        안녕하세요<br>Swift와 Node.js를 기반으로 개발하고 있는 Yagsill입니다.
      </p>
    </div>
    <button class="card__button" onclick="target()">Read more</button>
  </div>
</article>
